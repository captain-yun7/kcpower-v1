import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { put } from '@vercel/blob';

// POST /api/admin/upload - 이미지 업로드 (관리자)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: '관리자 권한이 필요합니다' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: '파일이 제공되지 않았습니다' },
        { status: 400 }
      );
    }

    const type = formData.get('type') as string || 'image';

    // 파일 타입 검증
    const imageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    const docTypes = ['application/pdf', 'application/zip', 'application/x-zip-compressed'];
    const allowedTypes = type === 'document' ? [...imageTypes, ...docTypes] : imageTypes;

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: '지원하지 않는 파일 형식입니다' },
        { status: 400 }
      );
    }

    // 파일 크기 검증 (이미지 10MB, 문서 50MB)
    const maxSize = type === 'document' ? 50 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: `파일 크기는 ${maxSize / 1024 / 1024}MB 이하여야 합니다` },
        { status: 400 }
      );
    }

    // Vercel Blob에 업로드
    const blob = await put(file.name, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return NextResponse.json({
      success: true,
      url: blob.url,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('이미지 업로드 에러:', error);
    return NextResponse.json(
      { error: '이미지 업로드에 실패했습니다' },
      { status: 500 }
    );
  }
}
