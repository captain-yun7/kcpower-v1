import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { deleteFile } from '@/lib/storage';

// DELETE /api/admin/files/[id] - 강의 자료 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 관리자 권한 확인
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    const fileId = params.id;

    // 파일 정보 조회
    const file = await prisma.courseFile.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return NextResponse.json({ error: '파일을 찾을 수 없습니다' }, { status: 404 });
    }

    // Vercel Blob에서 파일 삭제
    await deleteFile(file.fileUrl);

    // DB에서 파일 정보 삭제
    await prisma.courseFile.delete({
      where: { id: fileId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting file:', error);
    return NextResponse.json(
      { error: '파일 삭제 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
