'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
  required?: boolean;
}

export default function ImageUpload({
  value,
  onChange,
  label,
  required,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value || '');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 미리보기
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // 업로드
    try {
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onChange(data.url);
      } else {
        alert('이미지 업로드에 실패했습니다');
        setPreview(value || '');
      }
    } catch (error) {
      console.error('이미지 업로드 에러:', error);
      alert('이미지 업로드에 실패했습니다');
      setPreview(value || '');
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="space-y-4">
        {preview ? (
          <div className="relative inline-block">
            <div className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-gray-200">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
            >
              ×
            </button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-secondary transition-colors bg-gray-50">
            <div className="flex flex-col items-center justify-center py-8">
              <svg
                className="w-12 h-12 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <p className="text-sm text-gray-600 font-medium">
                클릭하여 이미지 업로드
              </p>
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG, WEBP, GIF (최대 10MB)
              </p>
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </label>
        )}

        {uploading && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-secondary"></div>
            <span>업로드 중...</span>
          </div>
        )}
      </div>
    </div>
  );
}
