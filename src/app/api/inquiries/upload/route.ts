import { NextResponse } from 'next/server';
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import {
  hasAllowedExtension,
  INQUIRY_ATTACHMENT_FOLDER,
  INQUIRY_ATTACHMENT_MAX_BYTES,
} from '@/lib/inquiry-attachment';

// POST /api/inquiries/upload - 견적 문의 첨부파일 업로드 토큰 발급 (브라우저 → Blob 직접 업로드)
export async function POST(request: Request) {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        if (!pathname.startsWith(`${INQUIRY_ATTACHMENT_FOLDER}/`) || !hasAllowedExtension(pathname)) {
          throw new Error('허용되지 않는 파일 형식입니다');
        }

        return {
          maximumSizeInBytes: INQUIRY_ATTACHMENT_MAX_BYTES,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
