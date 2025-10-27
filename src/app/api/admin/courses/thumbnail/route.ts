import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadFile, COURSE_THUMBNAILS_FOLDER } from '@/lib/storage';

// POST /api/admin/courses/thumbnail - 썸네일 이미지 업로드
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    // 관리자 권한 확인
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다.' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다.' },
        { status: 400 }
      );
    }

    // 이미지 파일 확인
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '이미지 파일만 업로드 가능합니다. (jpg, png, webp, gif)' },
        { status: 400 }
      );
    }

    // 파일 크기 제한 (10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: '파일 크기는 10MB를 초과할 수 없습니다.' },
        { status: 400 }
      );
    }

    // Vercel Blob에 업로드
    const fileUrl = await uploadFile(file, COURSE_THUMBNAILS_FOLDER);

    return NextResponse.json({
      success: true,
      fileName: file.name,
      fileUrl,
    });
  } catch (error) {
    console.error('썸네일 업로드 오류:', error);
    return NextResponse.json(
      { error: '썸네일 업로드에 실패했습니다.' },
      { status: 500 }
    );
  }
}
