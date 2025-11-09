'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
  id: string;
  name: string;
  order: number;
}

export default function NewDownloadPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    categoryId: '',
    title: '',
    description: '',
    fileName: '',
    fileUrl: '',
    fileSize: 0,
    fileType: '',
    version: '',
    requireAuth: false,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/admin/download-categories');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories || []);
      }
    } catch (error) {
      console.error('카테고리 로딩 실패:', error);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'document');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          fileName: data.filename,
          fileUrl: data.url,
          fileSize: data.size,
          fileType: data.type,
        }));
      } else {
        alert('파일 업로드에 실패했습니다');
      }
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.categoryId) {
      alert('카테고리를 선택해주세요');
      return;
    }

    if (!formData.title) {
      alert('제목을 입력해주세요');
      return;
    }

    if (!formData.fileUrl) {
      alert('파일을 업로드해주세요');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('/api/admin/downloads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('다운로드 자료가 등록되었습니다');
        router.push('/admin/downloads');
      } else {
        const data = await response.json();
        alert(data.error || '등록에 실패했습니다');
      }
    } catch (error) {
      console.error('등록 실패:', error);
      alert('등록에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link href="/admin/downloads" className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block">
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">새 자료 등록</h1>
        <p className="text-gray-600 mt-2">카탈로그 및 다운로드 자료를 등록합니다</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">기본 정보</h2>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              required
            >
              <option value="">카테고리 선택</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="제품 카탈로그 2024"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              설명
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="자료에 대한 설명을 입력하세요"
            />
          </div>

          {/* Version */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              버전
            </label>
            <input
              type="text"
              value={formData.version}
              onChange={(e) => setFormData({ ...formData, version: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="v1.0, 2024년 3월 등"
            />
          </div>
        </div>

        {/* File Upload */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">파일 업로드</h2>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              파일 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-4">
              <input
                type="file"
                onChange={handleFileUpload}
                accept=".pdf,.zip,.jpg,.jpeg,.png"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                disabled={uploading}
              />
              <p className="text-sm text-gray-500">
                PDF, ZIP 파일 (최대 50MB) 또는 이미지 파일 (최대 10MB)
              </p>

              {uploading && (
                <div className="flex items-center gap-2 text-blue-600">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                  <span className="text-sm">업로드 중...</span>
                </div>
              )}

              {formData.fileUrl && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-green-800">파일 업로드 완료</p>
                      <p className="text-xs text-green-600 mt-1">{formData.fileName}</p>
                      <p className="text-xs text-green-600">
                        {(formData.fileSize / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        fileName: '',
                        fileUrl: '',
                        fileSize: 0,
                        fileType: '',
                      })}
                      className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      제거
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900">옵션</h2>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="requireAuth"
              checked={formData.requireAuth}
              onChange={(e) => setFormData({ ...formData, requireAuth: e.target.checked })}
              className="w-5 h-5 text-secondary border-gray-300 rounded focus:ring-secondary"
            />
            <label htmlFor="requireAuth" className="text-sm font-medium text-gray-700">
              로그인 필요
              <span className="text-gray-500 ml-2 font-normal">
                (체크 시 회원만 다운로드 가능)
              </span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || uploading}
            className="flex-1 px-6 py-4 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '등록 중...' : '등록하기'}
          </button>
          <Link
            href="/admin/downloads"
            className="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-colors font-semibold text-center"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
