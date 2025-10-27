import { put, del } from '@vercel/blob';

// 파일 업로드
export async function uploadFile(file: File, folder: string): Promise<string> {
  const timestamp = Date.now();
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9가-힣.\-_]/g, '_');
  const fileName = `${folder}/${timestamp}_${sanitizedFileName}`;

  const blob = await put(fileName, file, {
    access: 'public',
  });

  return blob.url;
}

// 파일 삭제
export async function deleteFile(url: string): Promise<void> {
  try {
    await del(url);
  } catch (error) {
    console.error('파일 삭제 오류:', error);
    // 삭제 실패해도 계속 진행
  }
}

// 폴더 이름
export const COURSE_FILES_FOLDER = 'course-files';
export const COURSE_THUMBNAILS_FOLDER = 'course-thumbnails';
