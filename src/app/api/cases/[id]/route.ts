import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/cases/[id] - 시공사례 상세 조회
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // 조회수 증가
    await prisma.caseStudy.update({
      where: { id: params.id },
      data: { views: { increment: 1 } },
    });

    const caseStudy = await prisma.caseStudy.findUnique({
      where: {
        id: params.id,
        isPublished: true,
      },
      include: {
        products: {
          include: {
            product: {
              select: {
                id: true,
                name: true,
                model: true,
                category: true,
                tags: true,
                thumbnailUrl: true,
                shortDesc: true,
              },
            },
          },
        },
      },
    });

    if (!caseStudy) {
      return NextResponse.json(
        { error: '시공사례를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 관련 사례 조회
    const relatedCases = await prisma.caseStudy.findMany({
      where: {
        isPublished: true,
        id: { not: params.id },
        OR: [
          { projectType: caseStudy.projectType },
          { client: caseStudy.client },
          {
            tags: {
              hasSome: caseStudy.tags,
            },
          },
        ],
      },
      take: 3,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        client: true,
        location: true,
        year: true,
        thumbnailUrl: true,
        tags: true,
      },
    });

    return NextResponse.json({
      case: {
        ...caseStudy,
        products: caseStudy.products.map((cp) => cp.product),
      },
      relatedCases,
    });
  } catch (error) {
    console.error('시공사례 상세 조회 오류:', error);
    return NextResponse.json(
      { error: '시공사례 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
