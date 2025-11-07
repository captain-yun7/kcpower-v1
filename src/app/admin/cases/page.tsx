'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Case {
  id: string;
  title: string;
  client: string;
  location: string;
  isPinned: boolean;
  createdAt: string;
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/cases');
      if (response.ok) {
        const data = await response.json();
        setCases(data);
      }
    } catch (error) {
      console.error('시공사례 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/cases/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCases();
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  const handleTogglePin = async (id: string, isPinned: boolean) => {
    try {
      const response = await fetch(`/api/admin/cases/${id}/pin`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPinned: !isPinned }),
      });

      if (response.ok) {
        fetchCases();
      }
    } catch (error) {
      console.error('고정 설정 실패:', error);
    }
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
          <h1 className="text-3xl font-bold text-gray-900">시공사례 관리</h1>
          <p className="text-gray-600 mt-2">시공사례를 관리합니다</p>
        </div>
        <Link
          href="/admin/cases/new"
          className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors font-medium"
        >
          + 새 사례 등록
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">전체 사례</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{cases.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">주요 사례</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {cases.filter((c) => c.isPinned).length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">이번 달 등록</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {
              cases.filter(
                (c) =>
                  new Date(c.createdAt).getMonth() === new Date().getMonth() &&
                  new Date(c.createdAt).getFullYear() === new Date().getFullYear()
              ).length
            }
          </p>
        </div>
      </div>

      {/* Cases List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                제목
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                고객사
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                위치
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                상태
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
            {cases.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                  등록된 시공사례가 없습니다
                </td>
              </tr>
            ) : (
              cases.map((caseItem) => (
                <tr key={caseItem.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {caseItem.isPinned && (
                        <svg
                          className="w-4 h-4 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      )}
                      <p className="font-medium text-gray-900">{caseItem.title}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{caseItem.client}</td>
                  <td className="px-6 py-4 text-gray-600">{caseItem.location}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleTogglePin(caseItem.id, caseItem.isPinned)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        caseItem.isPinned
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {caseItem.isPinned ? '주요사례' : '일반'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(caseItem.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/cases/${caseItem.id}/edit`}
                        className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(caseItem.id)}
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
