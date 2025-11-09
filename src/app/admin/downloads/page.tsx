'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Download {
  id: string;
  title: string;
  category: { name: string };
  fileName: string;
  fileSize: number;
  downloads: number;
  requireAuth: boolean;
  createdAt: string;
}

export default function DownloadsPage() {
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDownloads();
  }, []);

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/downloads');
      if (response.ok) {
        const data = await response.json();
        setDownloads(data.downloads || []);
      }
    } catch (error) {
      console.error('다운로드 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/downloads/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchDownloads();
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">다운로드 관리</h1>
          <p className="text-gray-600 mt-2">카탈로그 및 자료를 관리합니다</p>
        </div>
        <Link
          href="/admin/downloads/new"
          className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors font-medium"
        >
          + 새 자료 등록
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">전체 파일</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{downloads.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">총 다운로드 수</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {downloads.reduce((sum, d) => sum + d.downloads, 0).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">총 파일 크기</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {formatFileSize(downloads.reduce((sum, d) => sum + d.fileSize, 0))}
          </p>
        </div>
      </div>

      {/* Downloads List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                제목
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                카테고리
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                파일명
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                파일 크기
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                다운로드 수
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                등록일
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {downloads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                  등록된 다운로드 파일이 없습니다
                </td>
              </tr>
            ) : (
              downloads.map((download) => (
                <tr key={download.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{download.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {download.category.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{download.fileName}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {formatFileSize(download.fileSize)}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {download.downloads.toLocaleString()}회
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(download.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          // 다운로드 기능
                          window.open(`/api/downloads/${download.id}`, '_blank');
                        }}
                        className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        다운로드
                      </button>
                      <Link
                        href={`/admin/downloads/${download.id}/edit`}
                        className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(download.id)}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
