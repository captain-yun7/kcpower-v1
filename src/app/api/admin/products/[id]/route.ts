import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// 제품 수정 스키마
const updateProductSchema = z.object({
  name: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().min(1).optional(),
  shortDesc: z.string().optional(),
  capacity: z.string().optional(),
  voltage: z.string().optional(),
  dimensions: z.string().optional(),
  weight: z.string().optional(),
  material: z.string().optional(),
  protection: z.string().optional(),
  specs: z.any().optional(),
  features: z.any().optional(),
  applications: z.any().optional(),
  imageUrl: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  images: z.array(z.string()).optional(),
  brochureUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  order: z.number().optional(),
  isPublished: z.boolean().optional(),
});

// GET /api/admin/products/[id] - 제품 상세 조회 (관리자)
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

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return NextResponse.json(
        { error: '제품을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('제품 조회 에러:', error);
    return NextResponse.json(
      { error: '제품 조회에 실패했습니다' },
      { status: 500 }
    );
  }
}

// PATCH /api/admin/products/[id] - 제품 수정 (관리자)
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
    const data = updateProductSchema.parse(body);

    // 모델명 변경 시 중복 체크
    if (data.model) {
      const existing = await prisma.product.findFirst({
        where: {
          model: data.model,
          NOT: { id },
        },
      });

      if (existing) {
        return NextResponse.json(
          { error: '이미 존재하는 모델명입니다' },
          { status: 400 }
        );
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('제품 수정 에러:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '제품 수정에 실패했습니다' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/products/[id] - 제품 삭제 (관리자)
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

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: '제품이 삭제되었습니다',
    });
  } catch (error) {
    console.error('제품 삭제 에러:', error);
    return NextResponse.json(
      { error: '제품 삭제에 실패했습니다' },
      { status: 500 }
    );
  }
}
