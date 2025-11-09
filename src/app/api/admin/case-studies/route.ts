import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// 시공사례 생성/수정 스키마
const caseStudySchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  client: z.string().optional(),
  location: z.string().optional(),
  projectType: z.string().optional(),
  year: z.number().optional(),
  description: z.string().min(1, '설명을 입력해주세요'),
  content: z.string().min(1, '내용을 입력해주세요'),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  imageUrl: z.string().optional(),
  images: z.array(z.string()).default([]),
  videoUrl: z.string().optional(),
  tags: z.array(z.string()).default([]),
  isPinned: z.boolean().default(false),
  order: z.number().default(0),
  isPublished: z.boolean().default(false),
  productIds: z.array(z.string()).default([]), // 연결할 제품 ID 목록
});

// GET /api/admin/case-studies - 시공사례 목록 조회 (관리자)
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
    const projectType = searchParams.get('projectType');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    // 필터 조건
    const where: any = {};
    if (projectType) {
      where.projectType = projectType;
    }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { client: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [caseStudies, total] = await Promise.all([
      prisma.caseStudy.findMany({
        where,
        orderBy: [
          { isPinned: 'desc' },
          { order: 'asc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          client: true,
          projectType: true,
          year: true,
          thumbnailUrl: true,
          isPinned: true,
          isPublished: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              products: true,
            },
          },
        },
      }),
      prisma.caseStudy.count({ where }),
    ]);

    return NextResponse.json({
      caseStudies,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('시공사례 목록 조회 에러:', error);
    return NextResponse.json(
      { error: '시공사례 목록을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}

// POST /api/admin/case-studies - 시공사례 생성 (관리자)
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
    const { productIds, ...data } = caseStudySchema.parse(body);

    const caseStudy = await prisma.caseStudy.create({
      data: {
        ...data,
        products: {
          create: productIds.map((productId) => ({
            product: {
              connect: { id: productId },
            },
          })),
        },
      },
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
    console.error('시공사례 생성 에러:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '잘못된 요청 데이터입니다', details: error.issues },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: '시공사례 생성에 실패했습니다' },
      { status: 500 }
    );
  }
}
