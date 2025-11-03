import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/cases - 시공사례 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const client = searchParams.get('client');
    const projectType = searchParams.get('projectType');
    const tag = searchParams.get('tag');
    const year = searchParams.get('year');
    const sort = searchParams.get('sort') || 'latest';

    // 검색 및 필터 조건
    const where: any = {
      isPublished: true,
    };

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { client: { contains: search, mode: 'insensitive' } },
        { location: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (client) {
      where.client = { contains: client, mode: 'insensitive' };
    }

    if (projectType) {
      where.projectType = projectType;
    }

    if (tag) {
      where.tags = {
        has: tag,
      };
    }

    if (year) {
      where.year = parseInt(year);
    }

    // 정렬 조건
    const orderBy: any = [];
    switch (sort) {
      case 'latest':
        orderBy.push({ createdAt: 'desc' });
        break;
      case 'oldest':
        orderBy.push({ createdAt: 'asc' });
        break;
      case 'year-desc':
        orderBy.push({ year: 'desc' });
        break;
      case 'year-asc':
        orderBy.push({ year: 'asc' });
        break;
      case 'popular':
        orderBy.push({ views: 'desc' });
        break;
      default:
        orderBy.push({ isPinned: 'desc' });
        orderBy.push({ createdAt: 'desc' });
    }

    const cases = await prisma.caseStudy.findMany({
      where,
      orderBy,
      select: {
        id: true,
        title: true,
        client: true,
        location: true,
        projectType: true,
        year: true,
        description: true,
        thumbnailUrl: true,
        tags: true,
        isPinned: true,
        views: true,
        createdAt: true,
      },
    });

    // 필터용 데이터 수집
    const allCases = await prisma.caseStudy.findMany({
      where: { isPublished: true },
      select: {
        tags: true,
        projectType: true,
        client: true,
        year: true,
      },
    });

    const uniqueTags = Array.from(
      new Set(allCases.flatMap((c) => c.tags))
    ).sort();

    const uniqueProjectTypes = Array.from(
      new Set(allCases.map((c) => c.projectType).filter(Boolean))
    ).sort();

    const uniqueClients = Array.from(
      new Set(allCases.map((c) => c.client).filter(Boolean))
    ).sort();

    const uniqueYears = Array.from(
      new Set(allCases.map((c) => c.year).filter(Boolean))
    ).sort((a, b) => (b as number) - (a as number));

    return NextResponse.json({
      cases,
      total: cases.length,
      filters: {
        tags: uniqueTags,
        projectTypes: uniqueProjectTypes,
        clients: uniqueClients,
        years: uniqueYears,
      },
    });
  } catch (error) {
    console.error('시공사례 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '시공사례 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
