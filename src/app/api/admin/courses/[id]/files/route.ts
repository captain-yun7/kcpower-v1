import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';
import { uploadFile, COURSE_FILES_FOLDER } from '@/lib/storage';

// POST /api/admin/courses/[id]/files - 강의 자료 업로드
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // 관리자 권한 확인
    const session = await auth();
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    const courseId = params.id;

    // 강의 존재 확인
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      return NextResponse.json({ error: '강의를 찾을 수 없습니다' }, { status: 404 });
    }

    // FormData에서 파일 추출
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: '파일이 필요합니다' }, { status: 400 });
    }

    // 파일 크기 제한 (100MB)
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: '파일 크기는 100MB를 초과할 수 없습니다' }, { status: 400 });
    }

    // Vercel Blob에 파일 업로드
    const fileUrl = await uploadFile(file, `${COURSE_FILES_FOLDER}/${courseId}`);

    // DB에 파일 정보 저장
    const courseFile = await prisma.courseFile.create({
      data: {
        courseId,
        fileName: file.name,
        fileUrl,
        fileSize: file.size,
      },
    });

    return NextResponse.json({
      success: true,
      file: courseFile,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: '파일 업로드 중 오류가 발생했습니다' },
      { status: 500 }
    );
  }
}
