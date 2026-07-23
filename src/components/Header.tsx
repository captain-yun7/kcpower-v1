'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

// GNB 메뉴 구조: 회사소개 / 사업영역 / 고객지원 / 소통공간
const navMenus = [
  {
    key: 'company',
    title: '회사소개',
    href: '/about',
    links: [
      { title: '개요', href: '/about#overview' },
      { title: '이념', href: '/about#values' },
      { title: '연혁', href: '/about#history' },
      { title: '오시는길', href: '/about/contact' },
    ],
  },
  {
    key: 'business',
    title: '사업영역',
    href: '/business/technology',
    links: [
      { title: 'KCP 기술', href: '/business/technology' },
      { title: '시공사례', href: '/cases' },
      { title: '인증서', href: '/business/certifications' },
    ],
  },
  {
    key: 'support',
    title: '고객지원',
    href: '/quote',
    links: [
      { title: '견적문의', href: '/quote' },
      { title: '자료다운로드', href: '/downloads' },
    ],
  },
  {
    key: 'community',
    title: '소통공간',
    href: '/notices',
    links: [
      { title: '뉴스&공지', href: '/notices' },
      { title: '홍보영상', href: '/media' },
    ],
  },
];

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
        <nav className="flex items-center h-[90px]">
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

          {/* Center: Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            {/* Desktop Navigation */}
            <ul className="flex items-center gap-20">
              {navMenus.map((menu) => (
                <li
                  key={menu.key}
                  className="relative group"
                  onMouseEnter={() => setActiveMenu(menu.key)}
                >
                  <Link href={menu.href} className="text-white text-[17px] hover:text-secondary transition-colors font-medium cursor-pointer">
                    {menu.title}
                  </Link>
                  {activeMenu === menu.key && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50">
                      <div className="bg-[#f8f9fa] shadow-xl rounded-lg border border-gray-200 min-w-[180px] py-3">
                        <ul>
                          {menu.links.map((link, linkIndex) => (
                            <li key={linkIndex}>
                              <Link
                                href={link.href}
                                className="block px-6 py-2.5 text-[15px] text-gray-700 hover:text-secondary hover:bg-gray-100 transition-colors whitespace-nowrap"
                                onClick={() => setActiveMenu(null)}
                              >
                                {link.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Actions */}
          <div className="hidden lg:flex items-center gap-2">
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

      {/* Mobile Menu Container */}
      <div className="max-w-[1600px] mx-auto px-8">
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-white/20 mt-2 pt-4">
            <ul className="flex flex-col gap-2">
              {navMenus.map((menu) => (
                <li key={menu.key}>
                  <Link
                    href={menu.href}
                    className="block px-4 py-2 text-white font-semibold hover:bg-white/10 hover:text-secondary rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {menu.title}
                  </Link>
                  <ul className="pl-4">
                    {menu.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          href={link.href}
                          className="block px-4 py-1.5 text-white/70 text-sm hover:bg-white/10 hover:text-secondary rounded-lg transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="pt-3 border-t border-white/20 mt-2">
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
