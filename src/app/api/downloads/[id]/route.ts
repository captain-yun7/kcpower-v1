import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// GET /api/downloads/[id] - 파일 다운로드
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params;

    // 다운로드 정보 조회
    const download = await prisma.download.findUnique({
      where: { id },
    });

    if (!download) {
      return NextResponse.json(
        { error: '다운로드 파일을 찾을 수 없습니다' },
        { status: 404 }
      );
    }

    // 인증 필요 여부 확인
    if (download.requireAuth) {
      const session = await auth();
      if (!session?.user) {
        return NextResponse.json(
          { error: '로그인이 필요합니다' },
          { status: 401 }
        );
      }
    }

    // 다운로드 수 증가
    await prisma.download.update({
      where: { id },
      data: { downloads: { increment: 1 } },
    });

    // 파일 URL로 리다이렉트
    return NextResponse.redirect(download.fileUrl);
  } catch (error) {
    console.error('다운로드 에러:', error);
    return NextResponse.json(
      { error: '다운로드에 실패했습니다' },
      { status: 500 }
    );
  }
}
