import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

// POST /api/admin/payments/bank-transfers/[id]/reject - 무통장입금 거절
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    // 관리자 권한 확인
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { reason } = body;

    if (!reason) {
      return NextResponse.json(
        { error: '거절 사유를 입력해주세요.' },
        { status: 400 }
      );
    }

    // BankTransfer 조회
    const bankTransfer = await prisma.bankTransfer.findUnique({
      where: { id },
      include: {
        payment: {
          include: {
            purchase: {
              include: {
                user: true,
                course: true,
              },
            },
          },
        },
      },
    });

    if (!bankTransfer) {
      return NextResponse.json(
        { error: '무통장입금 내역을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 승인되었는지 확인
    if (bankTransfer.status === 'APPROVED') {
      return NextResponse.json(
        { error: '이미 승인된 입금은 거절할 수 없습니다.' },
        { status: 400 }
      );
    }

    // 이미 거절되었는지 확인
    if (bankTransfer.status === 'REJECTED') {
      return NextResponse.json(
        { error: '이미 거절된 입금입니다.' },
        { status: 400 }
      );
    }

    const { payment } = bankTransfer;
    const { purchase } = payment;

    // 트랜잭션으로 거절 처리
    await prisma.$transaction(async (tx) => {
      // 1. BankTransfer 상태 업데이트
      await tx.bankTransfer.update({
        where: { id },
        data: {
          status: 'REJECTED',
          rejectedAt: new Date(),
          rejectedBy: session.user.id,
          rejectionReason: reason,
        },
      });

      // 2. Payment 상태 업데이트
      await tx.payment.update({
        where: { id: payment.id },
        data: {
          status: 'CANCELED',
        },
      });

      // 3. Purchase 상태 업데이트
      await tx.purchase.update({
        where: { id: purchase.id },
        data: {
          status: 'CANCELED',
        },
      });
    });

    // TODO: 이메일 알림 발송 (optional)
    // await sendEmail({
    //   to: purchase.user.email,
    //   subject: '입금이 거절되었습니다',
    //   body: `${purchase.course.title} 강의의 무통장입금 요청이 거절되었습니다.\n사유: ${reason}`,
    // });

    return NextResponse.json({
      success: true,
      message: '거절되었습니다.',
    });
  } catch (error) {
    console.error('무통장입금 거절 오류:', error);
    return NextResponse.json(
      { error: '거절 처리에 실패했습니다.' },
      { status: 500 }
    );
  }
}
