'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// 메가 메뉴 데이터 구조
const megaMenuData = {
  products: {
    sections: [
      {
        title: '헤리티지',
        links: [
          { title: 'Why Doosan Cobot', href: '/why-doosan' },
        ],
      },
      {
        title: '제품',
        links: [
          { title: '제품 라인업', href: '/products' },
          { title: '제품 비교하기', href: '/products/compare' },
          { title: 'P-SERIES', href: '/products/p-series' },
          { title: 'H-SERIES', href: '/products/h-series' },
          { title: 'M-SERIES', href: '/products/m-series' },
          { title: 'A-SERIES', href: '/products/a-series' },
          { title: 'E-SERIES', href: '/products/e-series' },
        ],
      },
      {
        title: '솔루션',
        links: [
          { title: '단기 솔루션', href: '/solutions' },
          { title: '로봇 렌탈 프로모션', href: '/solutions/rental' },
          { title: '공정별', href: '/solutions/process' },
          { title: '산업군별', href: '/solutions/industry' },
        ],
      },
      {
        title: '소프트웨어',
        links: [
          { title: 'Dart-Suite →', href: '/dart-suite' },
        ],
      },
    ],
  },
  education: {
    sections: [
      {
        title: '교육',
        links: [
          { title: '두산 로봇 교육', href: '/training' },
        ],
      },
      {
        title: '다운로드 센터',
        links: [
          { title: '카탈로그', href: '/downloads/catalog' },
          { title: '매뉴얼 →', href: '/downloads/manual' },
          { title: '소프트웨어 →', href: '/downloads/software' },
        ],
      },
      {
        title: '서비스 센터',
        links: [
          { title: 'A/S 신청', href: '/contact' },
          { title: '파트너 서비스 →', href: '/partner' },
        ],
      },
    ],
  },
  investment: {
    sections: [
      {
        title: '투자정보',
        links: [
          { title: '재무정보', href: '/investor/financial' },
          { title: '주가정보', href: '/investor/stock' },
          { title: '공시정보', href: '/investor/disclosure' },
        ],
      },
    ],
  },
  company: {
    sections: [
      {
        title: '기업정보',
        links: [
          { title: '개요', href: '/about' },
          { title: 'CI', href: '/about/ci' },
          { title: '오시는 길', href: '/about/location' },
          { title: '인재채용 →', href: '/about/careers' },
        ],
      },
      {
        title: '지속가능경영',
        links: [
          { title: '윤리경영', href: '/sustainability/ethics' },
          { title: 'EHS', href: '/sustainability/ehs' },
        ],
      },
      {
        title: '뉴스 & 이벤트',
        links: [
          { title: '뉴스', href: '/news' },
          { title: '이벤트 & 프로모션', href: '/events' },
          { title: '블로그', href: '/blog' },
        ],
      },
      {
        title: 'Contact Us',
        links: [
          { title: '고객문의', href: '/contact' },
          { title: '가까운 대리점 찾기', href: '/locations' },
        ],
      },
    ],
  },
};

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const { data: session } = useSession();

  return (
    <header
      className="fixed top-0 left-0 right-0 bg-[#0a0e1a] z-50 border-b border-gray-800"
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="max-w-[1600px] mx-auto px-8">
        <nav className="flex items-center justify-between h-[90px]">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-white text-[36px] font-bold tracking-wide">DOOSAN</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden lg:flex items-center gap-12">
            <li
              className="relative"
              onMouseEnter={() => setActiveMenu('products')}
            >
              <button className="text-white text-[17px] hover:text-red-500 transition-colors font-medium">
                제품 & 솔루션
              </button>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setActiveMenu('education')}
            >
              <button className="text-white text-[17px] hover:text-red-500 transition-colors font-medium">
                교육 & 서비스
              </button>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setActiveMenu('investment')}
            >
              <button className="text-white text-[17px] hover:text-red-500 transition-colors font-medium">
                투자정보
              </button>
            </li>
            <li
              className="relative"
              onMouseEnter={() => setActiveMenu('company')}
            >
              <button className="text-white text-[17px] hover:text-red-500 transition-colors font-medium">
                회사소개
              </button>
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
      </div>

      {/* Mega Menu Dropdown */}
      {activeMenu && (
        <div className="absolute top-[90px] left-0 right-0 bg-white shadow-2xl border-t border-gray-200">
          <div className="max-w-[1600px] mx-auto px-8 py-14">
            {(() => {
              const sections = megaMenuData[activeMenu as keyof typeof megaMenuData]?.sections || [];
              const gridCols = sections.length === 4 ? 'grid-cols-4' : sections.length === 3 ? 'grid-cols-3' : sections.length === 2 ? 'grid-cols-2' : 'grid-cols-1';

              return (
                <div className={`grid ${gridCols} gap-16`}>
                  {sections.map((section, index) => (
                    <div key={index}>
                      <h3 className="text-[16px] font-semibold text-gray-400 mb-7 tracking-wide uppercase">
                        {section.title}
                      </h3>
                      <ul className="space-y-4">
                        {section.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            <Link
                              href={link.href}
                              className="text-[17px] text-gray-700 hover:text-red-700 transition-colors block font-normal"
                              onClick={() => setActiveMenu(null)}
                            >
                              {link.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* Mobile Menu Container */}
      <div className="max-w-[1600px] mx-auto px-8">
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
