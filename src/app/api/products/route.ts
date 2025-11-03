import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/products - 제품 목록 조회
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const sort = searchParams.get('sort') || 'order';

    // 검색 및 필터 조건
    const where: any = {
      isPublished: true, // 공개된 제품만
    };

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = category;
    }

    if (tag) {
      where.tags = {
        has: tag,
      };
    }

    // 정렬 조건
    const orderBy: any = [];
    switch (sort) {
      case 'order':
        orderBy.push({ order: 'asc' });
        orderBy.push({ createdAt: 'desc' });
        break;
      case 'latest':
        orderBy.push({ createdAt: 'desc' });
        break;
      case 'name':
        orderBy.push({ name: 'asc' });
        break;
      default:
        orderBy.push({ order: 'asc' });
        orderBy.push({ createdAt: 'desc' });
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      select: {
        id: true,
        name: true,
        model: true,
        category: true,
        tags: true,
        description: true,
        shortDesc: true,
        capacity: true,
        voltage: true,
        dimensions: true,
        weight: true,
        material: true,
        protection: true,
        thumbnailUrl: true,
        imageUrl: true,
        order: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    // 모든 고유한 태그 가져오기 (필터링용)
    const allProducts = await prisma.product.findMany({
      where: { isPublished: true },
      select: { tags: true, category: true },
    });

    const uniqueTags = Array.from(
      new Set(allProducts.flatMap((p) => p.tags))
    ).sort();

    const uniqueCategories = Array.from(
      new Set(allProducts.map((p) => p.category))
    ).sort();

    return NextResponse.json({
      products,
      total: products.length,
      filters: {
        tags: uniqueTags,
        categories: uniqueCategories,
      },
    });
  } catch (error) {
    console.error('제품 목록 조회 오류:', error);
    return NextResponse.json(
      { error: '제품 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    );
  }
}
