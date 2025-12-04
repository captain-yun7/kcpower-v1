import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const bannerSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  description: z.string().optional(),
  imageUrl: z.string().min(1, '이미지를 업로드해주세요'),
  mobileImageUrl: z.string().optional(),
  linkUrl: z.string().optional(),
  linkText: z.string().optional(),
  position: z.enum(['HOME_MAIN', 'HOME_SECONDARY', 'PRODUCTS', 'SOLUTIONS']).default('HOME_MAIN'),
  order: z.number().int().default(0),
  isActive: z.boolean().default(true),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

// GET: 배너 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');
    const activeOnly = searchParams.get('activeOnly') === 'true';

    const where: Record<string, unknown> = {};
    if (position) {
      where.position = position;
    }
    if (activeOnly) {
      where.isActive = true;
      where.OR = [
        { startDate: null },
        { startDate: { lte: new Date() } },
      ];
      where.AND = [
        {
          OR: [
            { endDate: null },
            { endDate: { gte: new Date() } },
          ],
        },
      ];
    }

    const banners = await prisma.banner.findMany({
      where,
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    });

    return NextResponse.json({ banners });
  } catch (error) {
    console.error('배너 조회 에러:', error);
    return NextResponse.json({ error: '배너 조회에 실패했습니다' }, { status: 500 });
  }
}

// POST: 배너 생성
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    const body = await request.json();
    const validatedData = bannerSchema.parse(body);

    const banner = await prisma.banner.create({
      data: {
        title: validatedData.title,
        description: validatedData.description || null,
        imageUrl: validatedData.imageUrl,
        mobileImageUrl: validatedData.mobileImageUrl || null,
        linkUrl: validatedData.linkUrl || null,
        linkText: validatedData.linkText || null,
        position: validatedData.position,
        order: validatedData.order,
        isActive: validatedData.isActive,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
      },
    });

    return NextResponse.json({ banner }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다', details: error.errors },
        { status: 400 }
      );
    }
    console.error('배너 생성 에러:', error);
    return NextResponse.json({ error: '배너 생성에 실패했습니다' }, { status: 500 });
  }
}
