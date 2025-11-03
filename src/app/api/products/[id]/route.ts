import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products/[id] - 제품 상세 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: params.id,
        isPublished: true,
      },
      include: {
        solutions: {
          include: {
            solution: {
              select: {
                id: true,
                title: true,
                category: true,
                thumbnailUrl: true,
              },
            },
          },
        },
        cases: {
          include: {
            case: {
              select: {
                id: true,
                title: true,
                client: true,
                location: true,
                year: true,
                thumbnailUrl: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: '제품을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 관련 제품 조회 (같은 태그를 가진 제품)
    const relatedProducts = await prisma.product.findMany({
      where: {
        isPublished: true,
        id: { not: params.id },
        OR: [
          { category: product.category },
          {
            tags: {
              hasSome: product.tags,
            },
          },
        ],
      },
      take: 4,
      orderBy: { order: 'asc' },
      select: {
        id: true,
        name: true,
        model: true,
        category: true,
        tags: true,
        shortDesc: true,
        thumbnailUrl: true,
      },
    });

    return NextResponse.json({
      product: {
        ...product,
        solutions: product.solutions.map((sp) => sp.solution),
        cases: product.cases.map((cp) => cp.case),
      },
      relatedProducts,
    });
  } catch (error) {
    console.error('제품 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '제품 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
