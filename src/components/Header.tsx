'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="fixed top-0 left-0 right-0 bg-[#0a0e1a] z-50 border-b border-gray-800">
      <div className="max-w-[1600px] mx-auto px-8">
        <nav className="flex items-center justify-between h-[90px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-white text-[36px] font-bold tracking-wide">DOOSAN</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-12">
            <li>
              <Link href="/products" className="text-white text-[17px] hover:text-gray-300 transition-colors font-medium">
                제품 & 솔루션
              </Link>
            </li>
            <li>
              <Link href="/training" className="text-white text-[17px] hover:text-gray-300 transition-colors font-medium">
                교육 & 서비스
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-white text-[17px] hover:text-gray-300 transition-colors font-medium">
                투자정보
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-white text-[17px] hover:text-gray-300 transition-colors font-medium">
                회사소개
              </Link>
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-2.5 border border-white/30 text-white text-[15px] rounded hover:bg-white/10 transition-colors font-medium"
            >
              A/S 신청
            </Link>
            <Link
              href="/partner"
              className="px-6 py-2.5 border border-white text-white text-[15px] rounded hover:bg-white/10 transition-colors font-medium"
            >
              파트너 센터 →
            </Link>
            <button className="px-4 py-2 text-white text-[15px] hover:text-gray-300 transition-colors flex items-center gap-1">
              🌐 ▼
            </button>
            <Link href="/" className="text-white text-[15px] hover:text-gray-300 transition-colors font-medium">
              두산로보틱스
            </Link>
            {session?.user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-4 py-2 text-white hover:text-gray-300 transition-colors text-[14px]"
              >
                관리자
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-gray-700"
            aria-label="메뉴"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 mt-2 pt-4">
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/products"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  제품 라인업
                </Link>
              </li>
              <li>
                <Link
                  href="/solutions"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  솔루션
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  교육 프로그램
                </Link>
              </li>
              <li>
                <Link
                  href="/downloads"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  다운로드
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  뉴스
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  회사소개
                </Link>
              </li>
              <li className="pt-3 border-t border-gray-200 mt-2">
                <Link
                  href="/contact"
                  className="block px-4 py-2.5 text-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  구매 문의
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
