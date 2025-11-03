'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Notice {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotices(1);
  }, []);

  const fetchNotices = async (page: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/notices?page=${page}&limit=10`);
      const data = await response.json();

      if (response.ok) {
        setNotices(data.notices || []);
        setPagination(data.pagination || { total: 0, page: 1, limit: 10, totalPages: 0 });
      }
    } catch (error) {
      console.error('공지사항 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  const handlePageChange = (newPage: number) => {
    fetchNotices(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
        <div className="max-w-[1400px] mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Notices</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            공지사항
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            케이씨파워의 소식과 중요한 알림사항을 안내합니다
          </p>
        </div>
      </section>

      {/* Notice List */}
      <section className="py-20 px-4">
        <div className="max-w-[1000px] mx-auto">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary" />
            </div>
          ) : notices.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">등록된 공지사항이 없습니다</h3>
              <p className="text-gray-600">새로운 소식이 있으면 이곳에 표시됩니다</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {notices.map((notice) => (
                  <Link
                    key={notice.id}
                    href={`/notices/${notice.id}`}
                    className="block bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-secondary/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon or Badge */}
                      <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                        notice.isPinned
                          ? 'bg-red-500 text-white'
                          : 'bg-secondary/10 text-secondary'
                      }`}>
                        {notice.isPinned ? (
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          {notice.isPinned && (
                            <span className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
                              필독
                            </span>
                          )}
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors line-clamp-1">
                            {notice.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(notice.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {notice.views}
                          </span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-secondary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  {[...Array(pagination.totalPages)].map((_, idx) => {
                    const pageNum = idx + 1;
                    // 현재 페이지 기준으로 앞뒤 2개씩만 표시
                    if (
                      pageNum === 1 ||
                      pageNum === pagination.totalPages ||
                      (pageNum >= pagination.page - 2 && pageNum <= pagination.page + 2)
                    ) {
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            pagination.page === pageNum
                              ? 'bg-secondary text-white'
                              : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    } else if (
                      pageNum === pagination.page - 3 ||
                      pageNum === pagination.page + 3
                    ) {
                      return <span key={pageNum} className="px-2">...</span>;
                    }
                    return null;
                  })}

                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
