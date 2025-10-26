import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0a0e1a] to-[#1a1e2a] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img
              src="/logo.png"
              alt="케이씨파워 로고"
              className="h-24 w-auto object-contain"
            />
          </div>
        </div>

        {/* 404 Number with Animation */}
        <div className="mb-8">
          <h1 className="text-[120px] lg:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 leading-none animate-pulse">
            404
          </h1>
        </div>

        {/* Message */}
        <div className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            죄송합니다. 요청하신 페이지가 존재하지 않습니다.
          </p>
          <div className="inline-block px-6 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <p className="text-blue-400 font-semibold">
              🚧 현재 케이씨파워 웹사이트를 구축 중입니다
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/"
            className="group px-8 py-4 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl hover:shadow-secondary/50 inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            홈으로 돌아가기
          </Link>

          <Link
            href="/quote"
            className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            견적 문의하기
          </Link>
        </div>

        {/* Additional Info */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-gray-500 text-sm mb-4">
            30년 전통의 전기설비 전문기업
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <a
              href="tel:032-816-8034"
              className="hover:text-secondary transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              032-816-8034
            </a>
            <a
              href="mailto:peskorea@naver.com"
              className="hover:text-secondary transition-colors inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              peskorea@naver.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
