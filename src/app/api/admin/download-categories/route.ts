import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1, '카테고리명을 입력해주세요'),
  order: z.number().default(0),
});

// GET /api/admin/download-categories - 카테고리 목록
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    const categories = await prisma.downloadCategory.findMany({
      orderBy: { order: 'asc' },
      include: { _count: { select: { downloads: true } } },
    });

    return NextResponse.json({ categories });
  } catch (error) {
    console.error('카테고리 목록 조회 에러:', error);
    return NextResponse.json({ error: '카테고리 목록을 불러오는데 실패했습니다' }, { status: 500 });
  }
}

// POST /api/admin/download-categories - 카테고리 생성
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    const body = await request.json();
    const data = categorySchema.parse(body);

    const category = await prisma.downloadCategory.create({ data });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('카테고리 생성 에러:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: '잘못된 요청 데이터입니다', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: '카테고리 생성에 실패했습니다' }, { status: 500 });
  }
}
