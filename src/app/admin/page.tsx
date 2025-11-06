'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  products: {
    total: number;
    published: number;
    draft: number;
  };
  cases: {
    total: number;
    pinned: number;
    thisMonth: number;
  };
  news: {
    total: number;
    pinned: number;
    thisWeek: number;
  };
  inquiries: {
    total: number;
    pending: number;
    responded: number;
  };
  users: {
    total: number;
    thisMonth: number;
  };
  downloads: {
    total: number;
    thisWeek: number;
  };
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('대시보드 데이터 로딩 실패:', error);
    } finally {
      setLoading(false);
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
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-600 mt-2">케이씨파워 관리 시스템에 오신 것을 환영합니다</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 제품 통계 */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">전체 제품</p>
              <p className="text-4xl font-bold mt-2">{stats?.products.total || 0}</p>
              <p className="text-blue-100 text-xs mt-2">
                게시: {stats?.products.published || 0} / 임시: {stats?.products.draft || 0}
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
          </div>
        </div>

        {/* 시공사례 통계 */}
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-emerald-100 text-sm font-medium">시공사례</p>
              <p className="text-4xl font-bold mt-2">{stats?.cases.total || 0}</p>
              <p className="text-emerald-100 text-xs mt-2">
                주요 사례: {stats?.cases.pinned || 0} / 이번 달: +{stats?.cases.thisMonth || 0}
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
        </div>

        {/* 뉴스/공지사항 통계 */}
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">뉴스/공지</p>
              <p className="text-4xl font-bold mt-2">{stats?.news.total || 0}</p>
              <p className="text-purple-100 text-xs mt-2">
                고정: {stats?.news.pinned || 0} / 이번 주: +{stats?.news.thisWeek || 0}
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* 문의 통계 */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-100 text-sm font-medium">문의 사항</p>
              <p className="text-4xl font-bold mt-2">{stats?.inquiries.total || 0}</p>
              <p className="text-amber-100 text-xs mt-2">
                대기: {stats?.inquiries.pending || 0} / 답변: {stats?.inquiries.responded || 0}
              </p>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 회원 통계 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">회원 현황</h3>
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">전체 회원</span>
              <span className="text-2xl font-bold text-gray-900">{stats?.users.total || 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">이번 달 신규</span>
              <span className="text-green-600 font-semibold">+{stats?.users.thisMonth || 0}</span>
            </div>
          </div>
        </div>

        {/* 다운로드 통계 */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">다운로드 현황</h3>
            <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">전체 다운로드</span>
              <span className="text-2xl font-bold text-gray-900">{stats?.downloads.total || 0}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-500">이번 주</span>
              <span className="text-blue-600 font-semibold">+{stats?.downloads.thisWeek || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">빠른 작업</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 rounded-xl transition-all group"
          >
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">신규 제품</p>
              <p className="text-sm text-gray-600">제품 등록</p>
            </div>
          </Link>

          <Link
            href="/admin/cases/new"
            className="flex items-center gap-4 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 hover:from-emerald-100 hover:to-emerald-200 rounded-xl transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">시공사례</p>
              <p className="text-sm text-gray-600">사례 등록</p>
            </div>
          </Link>

          <Link
            href="/admin/news/new"
            className="flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 rounded-xl transition-all group"
          >
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">뉴스/공지</p>
              <p className="text-sm text-gray-600">작성하기</p>
            </div>
          </Link>

          <Link
            href="/admin/inquiries"
            className="flex items-center gap-4 p-4 bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 rounded-xl transition-all group"
          >
            <div className="w-12 h-12 bg-amber-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-gray-900">문의 관리</p>
              <p className="text-sm text-gray-600">답변하기</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Inquiries */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">미처리 문의</h3>
            <Link href="/admin/inquiries" className="text-sm text-secondary hover:text-secondary-dark font-medium">
              전체보기 →
            </Link>
          </div>
          <div className="space-y-3">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-gray-600">답변 대기 중인 문의</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{stats?.inquiries.pending || 0}건</p>
            </div>
            <p className="text-sm text-gray-500 text-center py-4">
              대기 중인 문의가 {stats?.inquiries.pending || 0}건 있습니다
            </p>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">시스템 상태</h3>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
              정상 작동
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">데이터베이스</span>
              <span className="text-sm font-semibold text-green-600">●  정상</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">파일 시스템</span>
              <span className="text-sm font-semibold text-green-600">● 정상</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-sm text-gray-600">서버 상태</span>
              <span className="text-sm font-semibold text-green-600">● 정상</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
