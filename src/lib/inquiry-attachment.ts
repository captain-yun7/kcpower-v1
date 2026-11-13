export const INQUIRY_ATTACHMENT_FOLDER = 'inquiries';
export const INQUIRY_ATTACHMENT_MAX_BYTES = 20 * 1024 * 1024;
export const INQUIRY_ATTACHMENT_EXTENSIONS = [
  'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'hwp', 'hwpx',
  'dwg', 'dxf', 'jpg', 'jpeg', 'png', 'zip',
];

export function hasAllowedExtension(fileName: string): boolean {
  const extension = fileName.split('.').pop()?.toLowerCase() ?? '';
  return fileName.includes('.') && INQUIRY_ATTACHMENT_EXTENSIONS.includes(extension);
}

export function isInquiryAttachmentUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      url.hostname.endsWith('.public.blob.vercel-storage.com') &&
      url.pathname.startsWith(`/${INQUIRY_ATTACHMENT_FOLDER}/`)
    );
  } catch {
    return false;
  }
}
