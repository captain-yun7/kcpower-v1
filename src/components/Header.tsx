'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// 메가 메뉴 데이터 구조 (실제 페이지와 매칭)
const megaMenuData = {
  productsServices: {
    sections: [
      {
        title: '제품 라인업',
        links: [
          { title: '전체 제품 보기', href: '/products' },
          { title: '밀폐형 외함', href: '/products?tag=밀폐형' },
          { title: '소음저감형 외함', href: '/products?tag=소음저감형' },
          { title: '터널용 외함', href: '/products?tag=터널용' },
          { title: '수배전반', href: '/products?tag=수배전반' },
          { title: '기타 제품', href: '/products?category=기타' },
        ],
      },
      {
        title: '기술 서비스',
        links: [
          { title: 'A/S 신청', href: '/services' },
          { title: '출장 서비스', href: '/services#onsite' },
          { title: '긴급 공사', href: '/services#emergency' },
          { title: '유지보수', href: '/services#maintenance' },
        ],
      },
      {
        title: '다운로드',
        links: [
          { title: '제품 카탈로그', href: '/downloads' },
          { title: '기술 사양서', href: '/downloads#specs' },
          { title: '인증서', href: '/downloads#certificates' },
          { title: 'CAD 도면', href: '/downloads#cad' },
        ],
      },
    ],
  },
  cases: {
    sections: [
      {
        title: '시공사례',
        links: [
          { title: '전체 사례 보기', href: '/cases' },
          { title: '발전/변전소 프로젝트', href: '/cases?type=발전변전' },
          { title: '철도 전기설비', href: '/cases?type=철도' },
          { title: '산업단지 프로젝트', href: '/cases?type=산업' },
          { title: '터널 전기설비', href: '/cases?type=터널' },
        ],
      },
      {
        title: '주요 고객사',
        links: [
          { title: '한국전력공사', href: '/cases?client=한전' },
          { title: 'LS일렉트릭', href: '/cases?client=LS' },
          { title: '현대일렉트릭', href: '/cases?client=현대' },
          { title: '산일전기', href: '/cases?client=산일' },
        ],
      },
    ],
  },
  community: {
    sections: [
      {
        title: '고객 지원',
        links: [
          { title: '공지사항', href: '/notices' },
          { title: '견적 문의', href: '/quote' },
          { title: 'A/S 신청', href: '/services' },
          { title: '자료 다운로드', href: '/downloads' },
        ],
      },
    ],
  },
  company: {
    sections: [
      {
        title: '회사 소개',
        links: [
          { title: '회사 개요', href: '/about' },
          { title: '경영 이념', href: '/about#values' },
          { title: '회사 연혁', href: '/about#history' },
          { title: '사업장 정보', href: '/about#company-info' },
        ],
      },
      {
        title: '오시는 길',
        links: [
          { title: '찾아오시는 길', href: '/about/contact' },
          { title: '본사/1공장', href: '/about/contact#factory1' },
          { title: '2공장', href: '/about/contact#factory2' },
          { title: '3공장', href: '/about/contact#factory3' },
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
          <Link href="/" className="flex items-center gap-4 group">
            <img
              src="/logo.png"
              alt="케이씨파워 로고"
              className="h-[40px] w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col justify-center">
              <span className="text-white text-[24px] font-bold tracking-wide leading-none">
                케이씨파워
              </span>
            </div>
          </Link>

          {/* Right Side: Navigation + Actions */}
          <div className="hidden lg:flex items-center gap-20">
            {/* Desktop Navigation */}
            <ul className="flex items-center gap-14">
              <li
                className="relative"
                onMouseEnter={() => setActiveMenu('productsServices')}
              >
                <button className="text-white text-[17px] hover:text-secondary transition-colors font-medium">
                  제품 & 서비스
                </button>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setActiveMenu('cases')}
              >
                <button className="text-white text-[17px] hover:text-secondary transition-colors font-medium">
                  시공사례
                </button>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setActiveMenu('community')}
              >
                <button className="text-white text-[17px] hover:text-secondary transition-colors font-medium">
                  소통공간
                </button>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setActiveMenu('company')}
              >
                <button className="text-white text-[17px] hover:text-secondary transition-colors font-medium">
                  회사소개
                </button>
              </li>
            </ul>

            {/* Desktop Actions */}
            <div className="flex items-center gap-2 pl-6 border-l border-white/20">
            <Link
              href="/services"
              className="px-6 py-2.5 border border-white/30 text-white text-[15px] rounded hover:bg-white/10 transition-colors font-medium"
            >
              A/S 신청
            </Link>
            <Link
              href="/quote"
              className="px-6 py-2.5 border border-secondary text-secondary text-[15px] rounded hover:bg-secondary/10 transition-colors font-medium"
            >
              견적 문의
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
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white"
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
                              className="text-[17px] text-gray-700 hover:text-primary transition-colors block font-normal"
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
          <div className="lg:hidden pb-4 border-t border-white/20 mt-2 pt-4">
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/products"
                  className="block px-4 py-2 text-white hover:bg-white/10 hover:text-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  제품 & 서비스
                </Link>
              </li>
              <li>
                <Link
                  href="/cases"
                  className="block px-4 py-2 text-white hover:bg-white/10 hover:text-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  시공사례
                </Link>
              </li>
              <li>
                <Link
                  href="/notices"
                  className="block px-4 py-2 text-white hover:bg-white/10 hover:text-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  소통공간
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-white hover:bg-white/10 hover:text-secondary rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  회사소개
                </Link>
              </li>
              <li className="pt-3 border-t border-white/20 mt-2">
                <Link
                  href="/services"
                  className="block px-4 py-2.5 text-center bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  A/S 신청
                </Link>
              </li>
              <li>
                <Link
                  href="/quote"
                  className="block px-4 py-2.5 text-center border border-secondary text-secondary rounded-lg hover:bg-secondary/10 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  견적 문의
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
