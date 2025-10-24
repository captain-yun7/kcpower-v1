'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// 메가 메뉴 데이터 구조
const megaMenuData = {
  productsServices: {
    sections: [
      {
        title: '제품 라인업',
        links: [
          { title: 'P-SERIES', href: '/products/p-series' },
          { title: 'H-SERIES', href: '/products/h-series' },
          { title: 'M-SERIES', href: '/products/m-series' },
          { title: 'A-SERIES', href: '/products/a-series' },
          { title: 'E-SERIES', href: '/products/e-series' },
          { title: '제품 비교하기', href: '/products/compare' },
        ],
      },
      {
        title: '기술 서비스',
        links: [
          { title: 'A/S 신청', href: '/service/as' },
          { title: '기술 지원', href: '/service/support' },
          { title: '원격 서비스', href: '/service/remote' },
          { title: '유지보수', href: '/service/maintenance' },
        ],
      },
      {
        title: '교육 프로그램',
        links: [
          { title: '기본 교육', href: '/training/basic' },
          { title: '고급 교육', href: '/training/advanced' },
          { title: '온라인 교육', href: '/training/online' },
          { title: '교육 일정', href: '/training/schedule' },
        ],
      },
      {
        title: '다운로드',
        links: [
          { title: '제품 카탈로그', href: '/downloads/catalog' },
          { title: '사용 매뉴얼', href: '/downloads/manual' },
          { title: '소프트웨어', href: '/downloads/software' },
          { title: 'CAD 도면', href: '/downloads/cad' },
        ],
      },
    ],
  },
  cases: {
    sections: [
      {
        title: '산업별 사례',
        links: [
          { title: '제조/생산', href: '/cases/manufacturing' },
          { title: '물류/유통', href: '/cases/logistics' },
          { title: '식음료', href: '/cases/food' },
          { title: '전자/반도체', href: '/cases/electronics' },
          { title: '자동차', href: '/cases/automotive' },
        ],
      },
      {
        title: '공정별 사례',
        links: [
          { title: '팔레타이징', href: '/cases/palletizing' },
          { title: '머신텐딩', href: '/cases/machine-tending' },
          { title: '용접/접합', href: '/cases/welding' },
          { title: '조립', href: '/cases/assembly' },
          { title: '검사', href: '/cases/inspection' },
        ],
      },
      {
        title: '성공 스토리',
        links: [
          { title: '국내 도입사례', href: '/cases/domestic' },
          { title: '해외 도입사례', href: '/cases/global' },
          { title: '고객 인터뷰', href: '/cases/interviews' },
          { title: 'ROI 분석', href: '/cases/roi' },
        ],
      },
    ],
  },
  community: {
    sections: [
      {
        title: '소식',
        links: [
          { title: '공지사항', href: '/community/notice' },
          { title: '뉴스', href: '/community/news' },
          { title: '보도자료', href: '/community/press' },
          { title: '이벤트', href: '/community/events' },
        ],
      },
      {
        title: '콘텐츠',
        links: [
          { title: '블로그', href: '/community/blog' },
          { title: '기술 아티클', href: '/community/articles' },
          { title: '비디오', href: '/community/videos' },
          { title: '웨비나', href: '/community/webinar' },
        ],
      },
      {
        title: '고객 지원',
        links: [
          { title: '문의하기', href: '/contact' },
          { title: 'FAQ', href: '/community/faq' },
          { title: '자료실', href: '/community/resources' },
          { title: '파트너 찾기', href: '/partner/find' },
        ],
      },
    ],
  },
  company: {
    sections: [
      {
        title: '회사 소개',
        links: [
          { title: '기업 개요', href: '/about' },
          { title: '비전 & 미션', href: '/about/vision' },
          { title: '연혁', href: '/about/history' },
          { title: 'CI 소개', href: '/about/ci' },
        ],
      },
      {
        title: '사업 영역',
        links: [
          { title: '협동로봇', href: '/business/cobot' },
          { title: '산업 솔루션', href: '/business/solution' },
          { title: '글로벌 네트워크', href: '/business/global' },
        ],
      },
      {
        title: '채용 & ESG',
        links: [
          { title: '인재 채용', href: '/careers' },
          { title: '복리후생', href: '/careers/benefits' },
          { title: 'ESG 경영', href: '/sustainability' },
          { title: '윤리경영', href: '/sustainability/ethics' },
        ],
      },
      {
        title: '오시는 길',
        links: [
          { title: '본사', href: '/location/hq' },
          { title: '지사/영업소', href: '/location/branch' },
          { title: '해외 지사', href: '/location/global' },
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

          {/* Right Side: Navigation + Actions */}
          <div className="hidden lg:flex items-center gap-20">
            {/* Desktop Navigation */}
            <ul className="flex items-center gap-14">
              <li
                className="relative"
                onMouseEnter={() => setActiveMenu('productsServices')}
              >
                <button className="text-white text-[17px] hover:text-red-500 transition-colors font-medium">
                  제품 & 서비스
                </button>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setActiveMenu('cases')}
              >
                <button className="text-white text-[17px] hover:text-red-500 transition-colors font-medium">
                  시공사례
                </button>
              </li>
              <li
                className="relative"
                onMouseEnter={() => setActiveMenu('community')}
              >
                <button className="text-white text-[17px] hover:text-red-500 transition-colors font-medium">
                  소통공간
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
            <div className="flex items-center gap-2 pl-6 border-l border-white/20">
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
          <div className="lg:hidden pb-4 border-t border-white/20 mt-2 pt-4">
            <ul className="flex flex-col gap-2">
              <li>
                <Link
                  href="/products"
                  className="block px-4 py-2 text-white hover:bg-white/10 hover:text-red-400 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  제품 & 서비스
                </Link>
              </li>
              <li>
                <Link
                  href="/cases"
                  className="block px-4 py-2 text-white hover:bg-white/10 hover:text-red-400 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  시공사례
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="block px-4 py-2 text-white hover:bg-white/10 hover:text-red-400 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  소통공간
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-white hover:bg-white/10 hover:text-red-400 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  회사소개
                </Link>
              </li>
              <li className="pt-3 border-t border-white/20 mt-2">
                <Link
                  href="/contact"
                  className="block px-4 py-2.5 text-center bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  A/S 신청
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
