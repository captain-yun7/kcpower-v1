import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 bg-gradient-to-br from-blue-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="pt-12">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Innovation in<br />
                every motion,<br />
                <span className="text-blue-600">revolutionizing</span><br />
                the way we work
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                협동로봇의 새로운 기준, 두산로보틱스<br />
                안전하고 편리한 협업 로봇으로 작업 환경을 혁신합니다
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-lg shadow-blue-600/30"
                >
                  제품 둘러보기
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors font-semibold"
                >
                  구매 문의하기
                </Link>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl flex items-center justify-center">
                <div className="text-center">
                  <svg className="w-32 h-32 mx-auto text-blue-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                  <p className="text-blue-600 font-semibold">협동로봇 이미지</p>
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50 blur-2xl"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-300 rounded-full opacity-30 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Series Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">제품 라인업</h2>
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
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">산업별 솔루션</h2>
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
      <section className="py-20 px-4 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            두산로보틱스의 협동로봇으로 작업 환경을 혁신하고<br />
            생산성을 극대화하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold shadow-lg"
            >
              구매 문의하기
            </Link>
            <Link
              href="/training"
              className="px-8 py-4 bg-blue-700 text-white border-2 border-white rounded-lg hover:bg-blue-800 transition-colors font-semibold"
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
