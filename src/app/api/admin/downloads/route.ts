import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const downloadSchema = z.object({
  categoryId: z.string(),
  title: z.string().min(1, '제목을 입력해주세요'),
  description: z.string().optional(),
  fileName: z.string(),
  fileUrl: z.string(),
  fileSize: z.number(),
  fileType: z.string(),
  version: z.string().optional(),
  requireAuth: z.boolean().default(false),
});

// GET /api/admin/downloads - 자료 목록
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const categoryId = searchParams.get('categoryId');
    const skip = (page - 1) * limit;

    const where: any = {};
    if (categoryId) where.categoryId = categoryId;

    const [downloads, total] = await Promise.all([
      prisma.download.findMany({
        where,
        include: { category: { select: { name: true } } },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.download.count({ where }),
    ]);

    return NextResponse.json({
      downloads,
      pagination: { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    console.error('자료 목록 조회 에러:', error);
    return NextResponse.json({ error: '자료 목록을 불러오는데 실패했습니다' }, { status: 500 });
  }
}

// POST /api/admin/downloads - 자료 생성
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    const body = await request.json();
    const data = downloadSchema.parse(body);

    const download = await prisma.download.create({ data });

    return NextResponse.json({ success: true, download });
  } catch (error) {
    console.error('자료 생성 에러:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: '잘못된 요청 데이터입니다', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: '자료 생성에 실패했습니다' }, { status: 500 });
  }
}
