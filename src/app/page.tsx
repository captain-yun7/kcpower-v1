import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureSection from '@/components/FeatureSection';
import UseCasesSection from '@/components/UseCasesSection';

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
                <div className="absolute inset-0 bg-gradient-radial from-red-600/20 via-transparent to-transparent blur-3xl"></div>
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
            30년 신뢰,<br />
            최고의 전기설비 솔루션
          </h1>
          <p className="text-[20px] text-white/80 mb-12 font-light tracking-wide">
            1993년부터 쌓아온 기술력과 신뢰로 대한민국 전력 인프라를 책임집니다
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-3 px-8 py-4 bg-secondary backdrop-blur-sm border border-secondary-light text-white text-[16px] rounded-lg hover:bg-secondary-dark transition-all duration-300"
          >
            KC파워 제품 둘러보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Floating Action Buttons - Right Side */}
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-0 bg-[#1e2847] rounded-l-lg overflow-hidden shadow-2xl">
          <Link
            href="/quote"
            className="group flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2a3555] transition-all duration-300 border-b border-white/10"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-primary rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <span className="text-[14px] font-medium">견적 문의</span>
          </Link>
          <Link
            href="/about/contact"
            className="group flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2a3555] transition-all duration-300 border-b border-white/10"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <span className="text-[14px] font-medium">오시는 길</span>
          </Link>
          <Link
            href="/downloads"
            className="group flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2a3555] transition-all duration-300 border-b border-white/10"
          >
            <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-[14px] font-medium">자료 다운로드</span>
          </Link>
          <Link
            href="/quote"
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

      {/* Company Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              대한민국 전기설비의 신뢰할 수 있는 파트너
            </h2>
            <p className="text-xl text-gray-600">
              30년간 쌓아온 기술력과 노하우로 안전하고 효율적인 전기설비 솔루션을 제공합니다
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-primary mb-2">30+</div>
              <div className="text-gray-600 font-medium">년 역사</div>
              <div className="text-sm text-gray-500 mt-1">1993년 설립</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-secondary mb-2">3</div>
              <div className="text-gray-600 font-medium">개 공장</div>
              <div className="text-sm text-gray-500 mt-1">인천 남동구</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-primary mb-2">10K+</div>
              <div className="text-gray-600 font-medium">누적 납품</div>
              <div className="text-sm text-gray-500 mt-1">변압기 외함</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-secondary mb-2">4+</div>
              <div className="text-gray-600 font-medium">주요 고객사</div>
              <div className="text-sm text-gray-500 mt-1">한전, LS, 현대일렉트릭</div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">안전</h3>
              <p className="text-gray-600 text-sm">
                모든 제품과 서비스에서 안전을 최우선으로 합니다
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">신뢰</h3>
              <p className="text-gray-600 text-sm">
                30년간 쌓아온 기술력과 실적으로 신뢰를 증명합니다
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">혁신</h3>
              <p className="text-gray-600 text-sm">
                끊임없는 R&D로 업계 최초의 혁신 제품을 개발합니다
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <UseCasesSection />

      {/* Feature Sections */}
      {/* 1. SUPER FLEXIBLE */}
      <FeatureSection
        label="SUPER FLEXIBLE"
        subtitle="두산 로봇만의 탁월한 유연성으로"
        title="로봇 자동화를 더욱 유연하게"
        description="미국, 유럽 아시아 등 세계 45개국 글로벌 선도 기업들이 신뢰하는 두산로보틱스. 제조부터 물류, 에너지, 의료 및 식음료까지 고객에게 최고의 솔루션을 제공합니다."
        features={[
          {
            title: "업계 최대의 로봇 솔루션 보유",
            description: "미국, 유럽 아시아 등 세계 45개국 글로벌 선도 기업들이 신뢰하는 두산로보틱스. 제조부터 물류, 에너지, 의료 및 식음료까지 고객에게 최고의 솔루션을 제공합니다."
          },
          {
            title: "다양한 파트너사 제품과의 호환성 확보",
            description: "그리퍼부터 전동툴, 머신, 센서, 소프트웨어까지 다양한 글로벌 파트너사 제품과의 사전 호환성이 확보되어 고객의 니즈에 맞는 최적의 로봇 솔루션 구현이 가능합니다."
          }
        ]}
        linkText="산업군별 솔루션 및 고객사 보러가기"
        linkHref="/solutions"
        imageUrl="/images/flexible-robot.jpg"
        videoUrl="#"
        imagePosition="right"
        backgroundColor="bg-white"
      />

      {/* 2. SUPER SAFE */}
      <FeatureSection
        label="SUPER SAFE"
        subtitle="Super Safety System으로"
        title="로봇 작업을 보다 안전하게"
        description="두산 로봇은 TÜV SÜD 기술인증 평가에서 업계 최고 수준인 PLe, Cat4를 획득해 높은 안전성을 인정받았으며, 6개의 각축에 고성능 토크센서가 탑재되어 업계 최고 수준의 힘 감지력 및 충돌 민감도를 자랑합니다."
        features={[
          {
            title: "업계 최고의 안전성을 자랑하는 두산 로봇",
            description: "두산 로봇은 TÜV SÜD 기술인증 평가에서 업계 최고 수준인 PLe, Cat4를 획득해 높은 안전성을 인정받았으며, 6개의 각축에 고성능 토크센서가 탑재되어 업계 최고 수준의 힘 감지력 및 충돌 민감도를 자랑합니다."
          },
          {
            title: "작업자를 빈틈없이 보호하는 구역설정",
            description: "협동작업구역, 중출입감시구간소구역, 통합항전관공지재반 등 현장 용용에 맞춰 다양한 구역설정모드, 효율성 방식은 물론 작업자의 안전까지 보장합니다."
          }
        ]}
        linkText="안전 인증 및 고객사 보러가기"
        linkHref="/safety"
        imageUrl="/images/safe-robot.jpg"
        videoUrl="#"
        imagePosition="left"
        backgroundColor="bg-gray-50"
      />

      {/* 3. SUPER EASY */}
      <FeatureSection
        label="SUPER EASY"
        subtitle="직관적인 사용성으로"
        title="로봇 티칭을 쉽고 빠르게"
        description="스마트폰을 쓰듯, 앱으로 로봇을 쉽고 간편하게 티칭"
        features={[
          {
            title: "스마트폰을 쓰듯, 앱으로 로봇을 쉽고 간편하게 티칭",
            description: "스마트폰과 유사한 사용 환경을 제공하는 다트 스위트(Dart-Suite)를 활용하여 사용자부터 개발자까지 모두가 협동로봇을 손쉽게 사용할 수 있습니다."
          },
          {
            title: "다트 스튜디오에서 앱을 다운 받아 쉽고 빠른 로봇 운용도 물론, 드래그앤 드롭 방식으로 간편 사간을 최대 80%까지 확기적으로 단축할 수 있습니다.",
            description: "다트 스튜디오에서 앱을 다운 받아 쉽고 빠른 로봇 운용도 물론, 드래그앤 드롭 방식으로 간편 사간을 최대 80%까지 확기적으로 단축할 수 있습니다."
          }
        ]}
        linkText="다트 스위트에 대해 자세히 알아보기"
        linkHref="/dart-suite"
        imageUrl="/images/easy-robot.jpg"
        videoUrl="#"
        imagePosition="right"
        backgroundColor="bg-[#0a0e1a]"
      />

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
                <span className="text-6xl font-bold text-red-700">P</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">P-SERIES</h3>
              <p className="text-gray-600 mb-4">고성능 정밀 작업용 로봇</p>
              <Link
                href="/products"
                className="text-red-700 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
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
                <span className="text-6xl font-bold text-red-700">H</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">H-SERIES</h3>
              <p className="text-gray-600 mb-4">중량물 핸들링 전문 로봇</p>
              <Link
                href="/products"
                className="text-red-700 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
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
                <span className="text-6xl font-bold text-red-700">M</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">M-SERIES</h3>
              <p className="text-gray-600 mb-4">범용 협동로봇의 표준</p>
              <Link
                href="/products"
                className="text-red-700 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
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
                <span className="text-6xl font-bold text-red-700">A</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">A-SERIES</h3>
              <p className="text-gray-600 mb-4">산업용 고속 작업 로봇</p>
              <Link
                href="/products"
                className="text-red-700 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
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
                <span className="text-6xl font-bold text-red-700">E</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">E-SERIES</h3>
              <p className="text-gray-600 mb-4">경제적이고 효율적인 로봇</p>
              <Link
                href="/products"
                className="text-red-700 font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all"
              >
                자세히 보기
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* View All Card */}
            <div className="group bg-red-700 rounded-2xl p-8 hover:bg-red-800 transition-all cursor-pointer flex items-center justify-center">
              <Link href="/products" className="text-center">
                <div className="text-white mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">모든 제품 보기</h3>
                <p className="text-red-100">전체 라인업 살펴보기</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-4 bg-[#0a0e1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-700/10 to-red-900/10"></div>
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
