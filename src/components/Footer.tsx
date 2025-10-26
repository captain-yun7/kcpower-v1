import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <h3 className="text-white text-2xl font-bold mb-4 hover:text-secondary transition-colors">
                케이씨파워
              </h3>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              30년 신뢰, 최고의 전기설비 솔루션
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-gray-400">대표자:</span>{' '}
                <span className="text-gray-300">이영수</span>
              </p>
              <p>
                <span className="text-gray-400">설립:</span>{' '}
                <span className="text-gray-300">1993년</span>
              </p>
            </div>
          </div>

          {/* Quick Links 1 */}
          <div>
            <h4 className="text-white font-semibold mb-4">제품 & 서비스</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-secondary transition-colors">
                  변압기 외함
                </Link>
              </li>
              <li>
                <Link href="/products/solutions" className="hover:text-secondary transition-colors">
                  통합 솔루션
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-secondary transition-colors">
                  기술 서비스
                </Link>
              </li>
              <li>
                <Link href="/downloads" className="hover:text-secondary transition-colors">
                  다운로드
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-white font-semibold mb-4">고객 지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cases" className="hover:text-secondary transition-colors">
                  시공사례
                </Link>
              </li>
              <li>
                <Link href="/quote" className="hover:text-secondary transition-colors">
                  견적 문의
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-secondary transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-secondary transition-colors">
                  소식
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-gray-400 mb-1">전화</p>
                <a
                  href="tel:032-816-8034"
                  className="text-gray-300 hover:text-secondary transition-colors"
                >
                  032-816-8034
                </a>
              </div>
              <div>
                <p className="text-gray-400 mb-1">이메일</p>
                <a
                  href="mailto:peskorea@naver.com"
                  className="text-gray-300 hover:text-secondary transition-colors break-all"
                >
                  peskorea@naver.com
                </a>
              </div>
              <div>
                <p className="text-gray-400 mb-1">영업시간</p>
                <p className="text-gray-300">평일 09:00 - 18:00</p>
                <p className="text-gray-300 text-xs">(주말, 공휴일 휴무)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Factory Locations */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <h4 className="text-white font-semibold mb-4">공장 위치</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-secondary font-semibold mb-2">본사 1공장</p>
              <p className="text-gray-300">인천광역시 남동구</p>
              <p className="text-gray-300">능허대로 633</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-secondary font-semibold mb-2">2공장</p>
              <p className="text-gray-300">인천광역시 남동구</p>
              <p className="text-gray-300">능허대로 649번길 83</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-secondary font-semibold mb-2">3공장</p>
              <p className="text-gray-300">인천광역시 남동구</p>
              <p className="text-gray-300">청능대로 267</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400 text-center md:text-left">
              <p>&copy; {currentYear} 케이씨파워. All rights reserved.</p>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-secondary transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-secondary transition-colors">
                이용약관
              </Link>
              <Link href="/about/contact" className="text-gray-400 hover:text-secondary transition-colors">
                오시는 길
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
