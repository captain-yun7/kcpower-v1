import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET: 활성화된 배너 목록 조회 (공개 API)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position') || 'HOME_MAIN';

    const now = new Date();

    const banners = await prisma.banner.findMany({
      where: {
        position: position as 'HOME_MAIN' | 'HOME_SECONDARY' | 'PRODUCTS' | 'SOLUTIONS',
        isActive: true,
        OR: [
          { startDate: null },
          { startDate: { lte: now } },
        ],
        AND: [
          {
            OR: [
              { endDate: null },
              { endDate: { gte: now } },
            ],
          },
        ],
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        mobileImageUrl: true,
        linkUrl: true,
        linkText: true,
      },
    });

    return NextResponse.json({ banners });
  } catch (error) {
    console.error('배너 조회 에러:', error);
    return NextResponse.json({ error: '배너 조회에 실패했습니다' }, { status: 500 });
  }
}
