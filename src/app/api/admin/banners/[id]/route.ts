import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const bannerUpdateSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요').optional(),
  description: z.string().optional().nullable(),
  imageUrl: z.string().min(1, '이미지를 업로드해주세요').optional(),
  mobileImageUrl: z.string().optional().nullable(),
  linkUrl: z.string().optional().nullable(),
  linkText: z.string().optional().nullable(),
  position: z.enum(['HOME_MAIN', 'HOME_SECONDARY', 'PRODUCTS', 'SOLUTIONS']).optional(),
  order: z.number().int().optional(),
  isActive: z.boolean().optional(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

// GET: 배너 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    const { id } = await params;
    const banner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!banner) {
      return NextResponse.json({ error: '배너를 찾을 수 없습니다' }, { status: 404 });
    }

    return NextResponse.json({ banner });
  } catch (error) {
    console.error('배너 조회 에러:', error);
    return NextResponse.json({ error: '배너 조회에 실패했습니다' }, { status: 500 });
  }
}

// PUT: 배너 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    const validatedData = bannerUpdateSchema.parse(body);

    const existingBanner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      return NextResponse.json({ error: '배너를 찾을 수 없습니다' }, { status: 404 });
    }

    const banner = await prisma.banner.update({
      where: { id },
      data: {
        ...(validatedData.title !== undefined && { title: validatedData.title }),
        ...(validatedData.description !== undefined && { description: validatedData.description }),
        ...(validatedData.imageUrl !== undefined && { imageUrl: validatedData.imageUrl }),
        ...(validatedData.mobileImageUrl !== undefined && { mobileImageUrl: validatedData.mobileImageUrl }),
        ...(validatedData.linkUrl !== undefined && { linkUrl: validatedData.linkUrl }),
        ...(validatedData.linkText !== undefined && { linkText: validatedData.linkText }),
        ...(validatedData.position !== undefined && { position: validatedData.position }),
        ...(validatedData.order !== undefined && { order: validatedData.order }),
        ...(validatedData.isActive !== undefined && { isActive: validatedData.isActive }),
        ...(validatedData.startDate !== undefined && {
          startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        }),
        ...(validatedData.endDate !== undefined && {
          endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        }),
      },
    });

    return NextResponse.json({ banner });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: '입력값이 올바르지 않습니다', details: error.errors },
        { status: 400 }
      );
    }
    console.error('배너 수정 에러:', error);
    return NextResponse.json({ error: '배너 수정에 실패했습니다' }, { status: 500 });
  }
}

// DELETE: 배너 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    const { id } = await params;
    const existingBanner = await prisma.banner.findUnique({
      where: { id },
    });

    if (!existingBanner) {
      return NextResponse.json({ error: '배너를 찾을 수 없습니다' }, { status: 404 });
    }

    await prisma.banner.delete({
      where: { id },
    });

    return NextResponse.json({ message: '배너가 삭제되었습니다' });
  } catch (error) {
    console.error('배너 삭제 에러:', error);
    return NextResponse.json({ error: '배너 삭제에 실패했습니다' }, { status: 500 });
  }
}
