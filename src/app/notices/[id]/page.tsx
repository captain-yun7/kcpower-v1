'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export default function NoticeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchNotice(params.id as string);
    }
  }, [params.id]);

  const fetchNotice = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/notices/${id}`);
      const data = await response.json();

      if (response.ok) {
        setNotice(data.notice);
      } else {
        alert(data.error || '공지사항을 불러오는데 실패했습니다');
        router.push('/notices');
      }
    } catch (error) {
      console.error('공지사항 로딩 실패:', error);
      alert('공지사항을 불러오는데 실패했습니다');
      router.push('/notices');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a] pt-[90px]">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1600x600/0e7490/white?text=Notice')] bg-cover bg-center opacity-10" />
        </section>
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!notice) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a] pt-[90px]">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1600x600/0e7490/white?text=Notice')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto">
          {notice.isPinned && (
            <div className="inline-block px-4 py-2 bg-red-500/20 border border-red-500/50 rounded-full mb-6">
              <p className="text-red-300 font-bold uppercase tracking-wide flex items-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                중요 공지
              </p>
            </div>
          )}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {notice.title}
          </h1>
          <div className="flex items-center justify-center gap-6 text-white/70">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(notice.createdAt)}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              조회 {notice.views}
            </span>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          {/* Back Button */}
          <Link
            href="/notices"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-secondary transition-colors mb-8 group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">목록으로</span>
          </Link>

          {/* Content Card */}
          <article className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            {/* Article Header */}
            <div className="px-8 lg:px-16 py-8 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                {notice.isPinned && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500 text-white text-sm font-bold rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                    중요 공지
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary/10 text-secondary text-sm font-semibold rounded-full">
                  공지사항
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                {notice.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">작성일</p>
                    <p className="text-sm font-semibold text-gray-900">{formatDate(notice.createdAt)}</p>
                  </div>
                </div>

                <div className="w-px h-8 bg-gray-300" />

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">조회수</p>
                    <p className="text-sm font-semibold text-gray-900">{notice.views.toLocaleString()}</p>
                  </div>
                </div>

                {notice.updatedAt !== notice.createdAt && (
                  <>
                    <div className="w-px h-8 bg-gray-300" />
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">수정일</p>
                        <p className="text-sm font-semibold text-gray-900">{formatDate(notice.updatedAt)}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="px-8 lg:px-16 py-12 lg:py-16">
              <div
                className="prose prose-lg prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-secondary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-img:rounded-xl prose-img:shadow-md max-w-none"
                dangerouslySetInnerHTML={{ __html: notice.content }}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200" />

            {/* Footer Actions */}
            <div className="px-8 lg:px-16 py-8 bg-gradient-to-r from-gray-50 to-white">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                {/* Info Section */}
                <div className="text-sm text-gray-500">
                  <p>이 공지사항이 도움이 되셨나요?</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-6 py-2.5 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:border-secondary hover:text-secondary transition-all duration-300 font-semibold inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    인쇄
                  </button>
                  <Link
                    href="/notices"
                    className="px-6 py-2.5 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    목록으로
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </div>
  );
}
