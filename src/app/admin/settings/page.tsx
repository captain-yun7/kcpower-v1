'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';

export default function SettingsPage() {
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'account' | 'security'>('general');

  const handleSave = async () => {
    setSaving(true);
    // 설정 저장 로직
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    alert('설정이 저장되었습니다');
  };

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      signOut({ callbackUrl: '/login' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">설정</h1>
        <p className="text-gray-600 mt-2">관리자 설정을 관리합니다</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-1">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === 'general'
                  ? 'bg-secondary text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              일반 설정
            </button>
            <button
              onClick={() => setActiveTab('account')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === 'account'
                  ? 'bg-secondary text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              계정 정보
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                activeTab === 'security'
                  ? 'bg-secondary text-white font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              보안 설정
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            {activeTab === 'general' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">일반 설정</h2>
                  <p className="text-gray-600 mb-6">사이트의 기본 정보를 설정합니다</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    사이트 이름
                  </label>
                  <input
                    type="text"
                    defaultValue="케이씨파워"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    관리자 이메일
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@kcpower.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    defaultValue="031-123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    주소
                  </label>
                  <textarea
                    rows={3}
                    defaultValue="경기도 용인시 처인구"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors font-medium disabled:opacity-50"
                  >
                    {saving ? '저장 중...' : '저장'}
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">계정 정보</h2>
                  <p className="text-gray-600 mb-6">관리자 계정 정보를 관리합니다</p>
                </div>

                <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">사용자명</p>
                      <p className="text-lg font-semibold text-gray-900">관리자</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">이메일</p>
                      <p className="text-lg font-semibold text-gray-900">admin@kcpower.com</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">권한</p>
                      <p className="text-lg font-semibold text-gray-900">관리자</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-4">보안 설정</h2>
                  <p className="text-gray-600 mb-6">비밀번호 및 보안 설정을 관리합니다</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    현재 비밀번호
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    새 비밀번호
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    새 비밀번호 확인
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <svg
                      className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <p className="text-sm font-semibold text-yellow-800">비밀번호 보안 정책</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        비밀번호는 최소 8자 이상, 영문/숫자/특수문자를 포함해야 합니다
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors font-medium disabled:opacity-50"
                  >
                    {saving ? '저장 중...' : '비밀번호 변경'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
