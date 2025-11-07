'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Quote {
  id: string;
  company: string;
  name: string;
  phone: string;
  email: string;
  product: string;
  message: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
  createdAt: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'IN_PROGRESS' | 'COMPLETED'>('ALL');

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/quotes');
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (error) {
      console.error('견적 문의 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    if (filter === 'ALL') return true;
    return quote.status === filter;
  });

  const handleStatusChange = async (id: string, status: Quote['status']) => {
    try {
      const response = await fetch(`/api/admin/quotes/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchQuotes();
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/quotes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchQuotes();
      }
    } catch (error) {
      console.error('삭제 실패:', error);
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
      <div>
        <h1 className="text-3xl font-bold text-gray-900">견적 문의 관리</h1>
        <p className="text-gray-600 mt-2">고객의 견적 문의를 관리합니다</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">전체 문의</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{quotes.length}</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">대기 중</p>
          <p className="text-3xl font-bold text-red-600 mt-2">
            {quotes.filter((q) => q.status === 'PENDING').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">처리 중</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {quotes.filter((q) => q.status === 'IN_PROGRESS').length}
          </p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">완료</p>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {quotes.filter((q) => q.status === 'COMPLETED').length}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-2 inline-flex gap-2 shadow-sm border border-gray-200">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-6 py-2 rounded-lg transition-all font-medium ${
            filter === 'ALL'
              ? 'bg-secondary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          전체
        </button>
        <button
          onClick={() => setFilter('PENDING')}
          className={`px-6 py-2 rounded-lg transition-all font-medium ${
            filter === 'PENDING'
              ? 'bg-secondary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          대기 중
        </button>
        <button
          onClick={() => setFilter('IN_PROGRESS')}
          className={`px-6 py-2 rounded-lg transition-all font-medium ${
            filter === 'IN_PROGRESS'
              ? 'bg-secondary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          처리 중
        </button>
        <button
          onClick={() => setFilter('COMPLETED')}
          className={`px-6 py-2 rounded-lg transition-all font-medium ${
            filter === 'COMPLETED'
              ? 'bg-secondary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          완료
        </button>
      </div>

      {/* Quotes List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  고객 정보
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  문의 제품
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  문의 내용
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  상태
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  문의일
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  관리
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    견적 문의가 없습니다
                  </td>
                </tr>
              ) : (
                filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{quote.name}</p>
                        <p className="text-sm text-gray-600">{quote.company}</p>
                        <p className="text-sm text-gray-500">{quote.phone}</p>
                        <p className="text-sm text-gray-500">{quote.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-900">{quote.product}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 line-clamp-2 max-w-xs">
                        {quote.message}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={quote.status}
                        onChange={(e) =>
                          handleStatusChange(quote.id, e.target.value as Quote['status'])
                        }
                        className={`px-3 py-1 rounded-lg text-xs font-semibold border-0 cursor-pointer ${
                          quote.status === 'PENDING'
                            ? 'bg-red-100 text-red-700'
                            : quote.status === 'IN_PROGRESS'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        <option value="PENDING">대기 중</option>
                        <option value="IN_PROGRESS">처리 중</option>
                        <option value="COMPLETED">완료</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(quote.createdAt).toLocaleDateString('ko-KR')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/quotes/${quote.id}`}
                          className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          상세
                        </Link>
                        <button
                          onClick={() => handleDelete(quote.id)}
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
    </div>
  );
}
