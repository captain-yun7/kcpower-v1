import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// 제품 생성/수정 스키마
const productSchema = z.object({
  name: z.string().min(1, '제품명을 입력해주세요'),
  model: z.string().min(1, '모델명을 입력해주세요'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  tags: z.array(z.string()).default([]),
  description: z.string().min(1, '설명을 입력해주세요'),
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
  images: z.array(z.string()).default([]),
  brochureUrl: z.string().optional(),
  videoUrl: z.string().optional(),
  order: z.number().default(0),
  isPublished: z.boolean().default(false),
});

// GET /api/admin/products - 제품 목록 조회 (관리자)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    // 필터 조건
    const where: any = {};
    if (category) {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { model: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
        select: {
          id: true,
          name: true,
          model: true,
          category: true,
          thumbnailUrl: true,
          isPublished: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('제품 목록 조회 에러:', error);
    return NextResponse.json(
      { error: '제품 목록을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// POST /api/admin/products - 제품 생성 (관리자)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const data = productSchema.parse(body);

    // 모델명 중복 체크
    const existing = await prisma.product.findUnique({
      where: { model: data.model },
    });

    if (existing) {
      return NextResponse.json(
        { error: '이미 존재하는 모델명입니다' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data,
    });

    return NextResponse.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('제품 생성 에러:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '제품 생성에 실패했습니다' },
      { status: 500 }
    );
  }
}
