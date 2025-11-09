import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateInquirySchema = z.object({
  status: z.enum(['PENDING', 'ANSWERED', 'CLOSED']).optional(),
  adminNote: z.string().optional(),
  respondedAt: z.string().optional(),
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    const inquiry = await prisma.inquiry.findUnique({
      where: { id: params.id },
      include: { user: { select: { name: true, email: true } } },
    });

    if (!inquiry) {
      return NextResponse.json({ error: '문의를 찾을 수 없습니다' }, { status: 404 });
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('문의 조회 에러:', error);
    return NextResponse.json({ error: '문의 조회에 실패했습니다' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user?.id || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    const body = await request.json();
    const data = updateInquirySchema.parse(body);

    const inquiry = await prisma.inquiry.update({
      where: { id: params.id },
      data: {
        ...data,
        respondedAt: data.respondedAt ? new Date(data.respondedAt) : undefined,
      },
    });

    return NextResponse.json({ success: true, inquiry });
  } catch (error) {
    console.error('문의 수정 에러:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: '잘못된 요청 데이터입니다', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: '문의 수정에 실패했습니다' }, { status: 500 });
  }
}
