'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            Doosan Robotics
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-8">
            <li className="relative group">
              <button
                onMouseEnter={() => setProductsMenuOpen(true)}
                onMouseLeave={() => setProductsMenuOpen(false)}
                className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                제품 & 솔루션
              </button>
              {productsMenuOpen && (
                <div
                  onMouseEnter={() => setProductsMenuOpen(true)}
                  onMouseLeave={() => setProductsMenuOpen(false)}
                  className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  <Link href="/products" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    제품 라인업
                  </Link>
                  <Link href="/solutions" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    솔루션
                  </Link>
                  <Link href="/downloads" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    다운로드
                  </Link>
                </div>
              )}
            </li>
            <li>
              <Link href="/training" className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
                교육 프로그램
              </Link>
            </li>
            <li>
              <Link href="/news" className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium">
                뉴스
              </Link>
            </li>
            <li className="relative group">
              <button
                onMouseEnter={() => setCompanyMenuOpen(true)}
                onMouseLeave={() => setCompanyMenuOpen(false)}
                className="text-base text-gray-700 hover:text-blue-600 transition-colors font-medium py-2"
              >
                회사소개
              </button>
              {companyMenuOpen && (
                <div
                  onMouseEnter={() => setCompanyMenuOpen(true)}
                  onMouseLeave={() => setCompanyMenuOpen(false)}
                  className="absolute left-0 mt-0 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                >
                  <Link href="/about" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    회사 개요
                  </Link>
                  <Link href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                    문의하기
                  </Link>
                </div>
              )}
            </li>
          </ul>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              구매 문의
            </Link>
            {session?.user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-4 py-2.5 text-gray-700 hover:text-blue-600 transition-colors font-medium"
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
