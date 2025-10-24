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
          { title: '밀폐형 외함', href: '/products/sealed' },
          { title: '소음저감형 외함', href: '/products/soundproof' },
          { title: '터널용 외함', href: '/products/tunnel' },
          { title: '침수형 외함', href: '/products/waterproof' },
          { title: '수배전반', href: '/products/switchboard' },
          { title: '접속함', href: '/products/junction-box' },
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
        title: '통합 솔루션',
        links: [
          { title: '혁신제품 (외함+변압기)', href: '/products/solutions' },
          { title: '한전 프로젝트', href: '/products/solutions#kepco' },
          { title: '철도 전기설비', href: '/products/solutions#railway' },
          { title: '맞춤 제작', href: '/products/custom' },
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
        title: '고객사별 프로젝트',
        links: [
          { title: '한국전력공사 (한전)', href: '/cases/kepco' },
          { title: 'LS일렉트릭', href: '/cases/ls' },
          { title: '현대일렉트릭', href: '/cases/hyundai' },
          { title: '산일전기', href: '/cases/sanil' },
          { title: '기타 협력사', href: '/cases/others' },
        ],
      },
      {
        title: '사업 분야별',
        links: [
          { title: '발전/변전소', href: '/cases/substation' },
          { title: '철도 전기설비', href: '/cases/railway' },
          { title: '신도시 인프라', href: '/cases/newtown' },
          { title: '산업단지', href: '/cases/industrial' },
          { title: '터널 전기설비', href: '/cases/tunnel' },
        ],
      },
      {
        title: '제품별 적용사례',
        links: [
          { title: '밀폐형 외함 프로젝트', href: '/cases/sealed' },
          { title: '소음저감형 설치 사례', href: '/cases/soundproof' },
          { title: '터널용 특수 외함', href: '/cases/tunnel-special' },
          { title: '침수형 외함 적용', href: '/cases/waterproof' },
        ],
      },
    ],
  },
  community: {
    sections: [
      {
        title: '소식',
        links: [
          { title: '공지사항', href: '/news' },
          { title: '납품 소식', href: '/news#delivery' },
          { title: '신제품 출시', href: '/news#new-product' },
          { title: '전시회/행사', href: '/news#events' },
        ],
      },
      {
        title: '기술 정보',
        links: [
          { title: '기술 아티클', href: '/tech' },
          { title: '제품 사용 가이드', href: '/tech#guide' },
          { title: '설치 노하우', href: '/tech#installation' },
          { title: '품질관리 기준', href: '/tech#quality' },
        ],
      },
      {
        title: '고객 지원',
        links: [
          { title: '온라인 문의', href: '/quote' },
          { title: 'FAQ', href: '/faq' },
          { title: '견적 요청', href: '/quote' },
          { title: 'A/S 신청', href: '/services' },
        ],
      },
    ],
  },
  company: {
    sections: [
      {
        title: '기업 소개',
        links: [
          { title: 'CEO 인사말', href: '/about' },
          { title: '회사 개요', href: '/about#overview' },
          { title: '비전 & 미션', href: '/about/vision' },
          { title: '핵심 가치', href: '/about/vision#values' },
          { title: '30년 역사', href: '/about/history' },
        ],
      },
      {
        title: '사업장 안내',
        links: [
          { title: '본사 1공장', href: '/about/locations' },
          { title: '2공장', href: '/about/locations#factory2' },
          { title: '3공장', href: '/about/locations#factory3' },
          { title: '생산 시설 현황', href: '/about/locations#facilities' },
        ],
      },
      {
        title: '인증 & 수상',
        links: [
          { title: '품질 인증', href: '/about/certifications' },
          { title: '특허 보유 현황', href: '/about/certifications#patents' },
          { title: '수상 내역', href: '/about/certifications#awards' },
          { title: '협력사 인증서', href: '/about/certifications#partners' },
        ],
      },
      {
        title: '오시는 길',
        links: [
          { title: '찾아오시는 길', href: '/about/contact' },
          { title: '대중교통 안내', href: '/about/contact#transport' },
          { title: '주차 안내', href: '/about/contact#parking' },
          { title: '연락처', href: '/about/contact#info' },
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
          <Link href="/" className="flex items-center group">
            <div className="flex flex-col">
              <span className="text-white text-[32px] font-bold tracking-tight leading-none">KC파워</span>
              <span className="text-secondary text-[11px] font-medium tracking-widest">KCPOWER</span>
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
              KC파워
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
                  href="/community"
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
                  href="/contact"
                  className="block px-4 py-2.5 text-center bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors font-medium"
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
