import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e1a]">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-[#0a0e1a] overflow-hidden">
        {/* Background with robot image effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1f3a]/50 to-[#0a0e1a]">
          <div className="absolute inset-0 opacity-30">
            {/* Robot silhouette placeholder - 실제로는 이미지나 비디오 */}
            <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-[500px] h-[500px]">
              <div className="relative w-full h-full">
                <div className="absolute inset-0 bg-gradient-radial from-blue-500/20 via-transparent to-transparent blur-3xl"></div>
                <svg className="w-full h-full text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-32 text-center">
          <h1 className="text-[56px] lg:text-[72px] font-bold text-white mb-6 leading-tight tracking-tight">
            AI-Powered Robot Solutions<br />
            for a Better Life
          </h1>
          <p className="text-[20px] text-white/80 mb-12 font-light tracking-wide">
            Innovation in every motion, revolutionizing the way we work
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/30 text-white text-[16px] rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            두산 로봇과 함께 상상을 실현해 보세요
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Floating Action Buttons - Right Side */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-0 bg-[#1e2847] rounded-l-lg overflow-hidden shadow-2xl">
          <Link
            href="/contact"
            className="group flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2a3555] transition-all duration-300 border-b border-white/10"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-[14px] font-medium">구매 문의</span>
          </Link>
          <Link
            href="/locations"
            className="group flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2a3555] transition-all duration-300 border-b border-white/10"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-[14px] font-medium">가까운 대리점 찾기</span>
          </Link>
          <Link
            href="/training"
            className="group flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2a3555] transition-all duration-300 border-b border-white/10"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <span className="text-[14px] font-medium">두산 로봇 교육</span>
          </Link>
          <Link
            href="/support"
            className="group flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2a3555] transition-all duration-300"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-[14px] font-medium">A/S 신청</span>
          </Link>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Product Series Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">제품 라인업</h2>
            <p className="text-xl text-gray-600">다양한 산업 환경에 최적화된 협동로봇 시리즈</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* P-Series Card */}
            <div className="group bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-xl mb-6 flex items-center justify-center">
                <span className="text-6xl font-bold text-blue-600">P</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">P-SERIES</h3>
              <p className="text-gray-600 mb-4">고성능 정밀 작업용 로봇</p>
              <Link
                href="/products"
                className="text-blue-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                자세히 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* H-Series Card */}
            <div className="group bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-xl mb-6 flex items-center justify-center">
                <span className="text-6xl font-bold text-blue-600">H</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">H-SERIES</h3>
              <p className="text-gray-600 mb-4">중량물 핸들링 전문 로봇</p>
              <Link
                href="/products"
                className="text-blue-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                자세히 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* M-Series Card */}
            <div className="group bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-xl mb-6 flex items-center justify-center">
                <span className="text-6xl font-bold text-blue-600">M</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">M-SERIES</h3>
              <p className="text-gray-600 mb-4">범용 협동로봇의 표준</p>
              <Link
                href="/products"
                className="text-blue-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                자세히 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* A-Series Card */}
            <div className="group bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-xl mb-6 flex items-center justify-center">
                <span className="text-6xl font-bold text-blue-600">A</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">A-SERIES</h3>
              <p className="text-gray-600 mb-4">산업용 고속 작업 로봇</p>
              <Link
                href="/products"
                className="text-blue-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                자세히 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* E-Series Card */}
            <div className="group bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all cursor-pointer">
              <div className="aspect-square bg-white rounded-xl mb-6 flex items-center justify-center">
                <span className="text-6xl font-bold text-blue-600">E</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">E-SERIES</h3>
              <p className="text-gray-600 mb-4">경제적이고 효율적인 로봇</p>
              <Link
                href="/products"
                className="text-blue-600 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                자세히 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* View All Card */}
            <div className="group bg-blue-600 rounded-2xl p-8 hover:bg-blue-700 transition-all cursor-pointer flex items-center justify-center">
              <Link href="/products" className="text-center">
                <div className="text-white mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">모든 제품 보기</h3>
                <p className="text-blue-100">전체 라인업 살펴보기</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 px-4 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">산업별 솔루션</h2>
            <p className="text-xl text-gray-600">다양한 산업 분야에서 검증된 협동로봇 솔루션</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">제조</h3>
              <p className="text-gray-600 text-sm">조립, 검사, 포장 등 제조 공정 자동화</p>
            </div>

            <div className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">물류</h3>
              <p className="text-gray-600 text-sm">피킹, 패킹, 팔레타이징 자동화</p>
            </div>

            <div className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">연구개발</h3>
              <p className="text-gray-600 text-sm">실험 자동화 및 정밀 작업 지원</p>
            </div>

            <div className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">서비스</h3>
              <p className="text-gray-600 text-sm">카페, 식음료 서비스 자동화</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold"
            >
              모든 솔루션 보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-[#0a0e1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-white/70 mb-12 font-light">
            두산로보틱스의 협동로봇으로 작업 환경을 혁신하고<br />
            생산성을 극대화하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-10 py-4 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-all duration-300 font-semibold shadow-xl"
            >
              구매 문의하기
            </Link>
            <Link
              href="/training"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold"
            >
              교육 프로그램 신청
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
