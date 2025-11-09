import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const updateSchema = z.object({
  categoryId: z.string().optional(),
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  fileName: z.string().optional(),
  fileUrl: z.string().optional(),
  fileSize: z.number().optional(),
  fileType: z.string().optional(),
  version: z.string().optional(),
  requireAuth: z.boolean().optional(),
});

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    const download = await prisma.download.findUnique({
      where: { id: params.id },
      include: { category: true },
    });

    if (!download) {
      return NextResponse.json({ error: '자료를 찾을 수 없습니다' }, { status: 404 });
    }

    return NextResponse.json(download);
  } catch (error) {
    console.error('자료 조회 에러:', error);
    return NextResponse.json({ error: '자료 조회에 실패했습니다' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    const body = await request.json();
    const data = updateSchema.parse(body);

    const download = await prisma.download.update({
      where: { id: params.id },
      data,
    });

    return NextResponse.json({ success: true, download });
  } catch (error) {
    console.error('자료 수정 에러:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: '잘못된 요청 데이터입니다', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: '자료 수정에 실패했습니다' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '관리자 권한이 필요합니다' }, { status: 403 });
    }

    await prisma.download.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true, message: '자료가 삭제되었습니다' });
  } catch (error) {
    console.error('자료 삭제 에러:', error);
    return NextResponse.json({ error: '자료 삭제에 실패했습니다' }, { status: 500 });
  }
}
