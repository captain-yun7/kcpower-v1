import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/downloads - 다운로드 자료 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const search = searchParams.get('search');

    // 카테고리 목록 조회
    const categories = await prisma.downloadCategory.findMany({
      orderBy: { order: 'asc' },
    });

    // 검색 및 필터 조건
    const where: any = {};

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const downloads = await prisma.download.findMany({
      where,
      include: {
        category: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      downloads,
      categories,
      total: downloads.length,
    });
  } catch (error) {
    console.error('다운로드 자료 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '다운로드 자료 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
