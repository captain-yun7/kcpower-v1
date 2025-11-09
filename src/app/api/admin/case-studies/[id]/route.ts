import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// 시공사례 수정 스키마
const updateCaseStudySchema = z.object({
  title: z.string().min(1).optional(),
  client: z.string().optional(),
  location: z.string().optional(),
  projectType: z.string().optional(),
  year: z.number().optional(),
  description: z.string().min(1).optional(),
  content: z.string().min(1).optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  images: z.array(z.string()).optional(),
  videoUrl: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPinned: z.boolean().optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
  productIds: z.array(z.string()).optional(),
});

// GET /api/admin/case-studies/[id] - 시공사례 상세 조회 (관리자)
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다' },
        { status: 403 }
      );
    }

    const { id } = params;

    const caseStudy = await prisma.caseStudy.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                model: true,
                category: true,
                thumbnailUrl: true,
              },
            },
          },
        },
      },
    });

    if (!caseStudy) {
      return NextResponse.json(
        { error: '시공사례를 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(caseStudy);
  } catch (error) {
    console.error('시공사례 조회 에러:', error);
    return NextResponse.json(
      { error: '시공사례 조회에 실패했습니다' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/case-studies/[id] - 시공사례 수정 (관리자)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다' },
        { status: 403 }
      );
    }

    const { id } = params;
    const body = await request.json();
    const { productIds, ...data } = updateCaseStudySchema.parse(body);

    // 제품 연결 업데이트
    if (productIds !== undefined) {
      // 기존 제품 연결 삭제
      await prisma.caseProduct.deleteMany({
        where: { caseId: id },
      });

      // 새로운 제품 연결 생성
      if (productIds.length > 0) {
        await prisma.caseProduct.createMany({
          data: productIds.map((productId) => ({
            caseId: id,
            productId,
          })),
        });
      }
    }

    const caseStudy = await prisma.caseStudy.update({
      where: { id },
      data,
      include: {
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                model: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      caseStudy,
    });
  } catch (error) {
    console.error('시공사례 수정 에러:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '시공사례 수정에 실패했습니다' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/case-studies/[id] - 시공사례 삭제 (관리자)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다' },
        { status: 403 }
      );
    }

    const { id } = params;

    await prisma.caseStudy.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '시공사례가 삭제되었습니다',
    });
  } catch (error) {
    console.error('시공사례 삭제 에러:', error);
    return NextResponse.json(
      { error: '시공사례 삭제에 실패했습니다' },
      { status: 500 }
    );
  }
}
