import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeatureSection from '@/components/FeatureSection';
import UseCasesSection from '@/components/UseCasesSection';
import HeroSection from '@/components/HeroSection';
import ClientsCarousel from '@/components/ClientsCarousel';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e1a]">
      <Header />

      {/* Hero Section with Auto-Slide */}
      <HeroSection />

      {/* Floating Action Buttons - Right Side */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-0 bg-[#1e2847] rounded-l-lg overflow-hidden shadow-2xl">
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
      {/* 1. 품질과 안전 */}
      <FeatureSection
        label="QUALITY & SAFETY"
        subtitle="30년간 쌓아온 기술력으로"
        title="최고 품질의 변압기 외함을 제공합니다"
        description="한전, LS일렉트릭, 현대일렉트릭 등 대한민국 주요 전력 기업들이 신뢰하는 케이씨파워. 변전소부터 철도, 터널까지 고객에게 최고의 전기설비 솔루션을 제공합니다."
        features={[
          {
            title: "업계 최고 수준의 품질 관리",
            description: "철저한 품질 검사와 30년 노하우로 완벽한 방수, 방진, 내구성을 자랑하는 제품을 생산합니다. 한전 우수협력업체로 선정된 신뢰할 수 있는 품질을 경험하세요."
          },
          {
            title: "다양한 환경에 최적화된 솔루션",
            description: "옥외 설치용 밀폐형부터 주거지역 소음저감형, 터널용 특수 외함까지 현장 환경에 맞는 맞춤형 솔루션을 제공합니다."
          }
        ]}
        linkText="제품 라인업 및 시공사례 보러가기"
        linkHref="/products"
        imageUrl="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
        videoUrl="https://videos.pexels.com/video-files/3195394/3195394-uhd_2560_1440_25fps.mp4"
        imagePosition="right"
        backgroundColor="bg-white"
      />

      {/* 2. 신속한 대응 */}
      <FeatureSection
        label="FAST RESPONSE"
        subtitle="24시간 긴급 대응 시스템으로"
        title="언제나 빠르고 정확한 서비스"
        description="3개 공장을 통한 신속한 생산 체계와 24시간 긴급 출동 시스템으로 고객의 긴급한 요구에 즉시 대응합니다."
        features={[
          {
            title: "전국 어디서나 신속한 출장 서비스",
            description: "인천 남동구에 위치한 3개 공장을 기반으로 수도권은 물론 전국 어디든 빠르게 출장 서비스를 제공합니다. A/S 및 긴급 공사도 신속하게 처리합니다."
          },
          {
            title: "체계적인 사후 관리",
            description: "납품 후에도 지속적인 점검과 유지보수로 제품의 안정적인 작동을 보장합니다. 고객 만족을 최우선으로 생각하는 케이씨파워입니다."
          }
        ]}
        linkText="기술 서비스 및 A/S 신청하기"
        linkHref="/services"
        imageUrl="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
        videoUrl="https://videos.pexels.com/video-files/5198936/5198936-uhd_2560_1440_30fps.mp4"
        imagePosition="left"
        backgroundColor="bg-gray-50"
      />

      {/* 3. 맞춤형 제작 */}
      <FeatureSection
        label="CUSTOMIZATION"
        subtitle="고객 맞춤형 설계로"
        title="현장에 딱 맞는 솔루션 제공"
        description="표준 제품부터 특수 목적 맞춤 제작까지, 고객의 요구사항을 정확히 반영한 최적의 솔루션을 제공합니다."
        features={[
          {
            title: "현장 환경 분석 및 맞춤 설계",
            description: "현장의 특수한 조건과 요구사항을 면밀히 분석하여 최적화된 설계를 제공합니다. 침수형, 터널용 등 특수 환경에도 완벽 대응합니다."
          },
          {
            title: "빠른 납품과 유연한 생산 체계",
            description: "3개 공장의 효율적인 생산 시스템으로 대량 주문은 물론 긴급 납품에도 신속하게 대응합니다. 고객의 일정에 맞춰 유연하게 생산합니다."
          }
        ]}
        linkText="견적 문의하기"
        linkHref="/quote"
        imageUrl="https://images.unsplash.com/photo-1581093458791-9d42e2e7b07f?w=800&q=80"
        videoUrl="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_25fps.mp4"
        imagePosition="right"
        backgroundColor="bg-[#0a0e1a]"
      />

      {/* Product Lineup Section */}
      <section className="py-32 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">주요 제품</h2>
            <p className="text-xl text-gray-600">다양한 환경에 최적화된 변압기 외함 솔루션</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* 밀폐형 외함 */}
            <Link href="/products/sealed" className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="밀폐형 외함"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">밀폐형 외함</h3>
                <p className="text-gray-600 text-sm mb-4">완벽한 방수/방진 성능으로 옥외 설치 최적화</p>
                <span className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* 소음저감형 */}
            <Link href="/products/soundproof" className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80"
                  alt="소음저감형 외함"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">소음저감형 외함</h3>
                <p className="text-gray-600 text-sm mb-4">주거지역 설치 가능한 특수 설계</p>
                <span className="text-secondary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* 터널용 외함 */}
            <Link href="/products/tunnel" className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80"
                  alt="터널용 외함"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">터널용 외함</h3>
                <p className="text-gray-600 text-sm mb-4">철도/도로 터널 특수 환경 대응</p>
                <span className="text-primary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>

            {/* 수배전반 */}
            <Link href="/products/switchboard" className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80"
                  alt="수배전반"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">수배전반</h3>
                <p className="text-gray-600 text-sm mb-4">통합 전력 관리 솔루션</p>
                <span className="text-secondary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all text-sm">
                  자세히 보기
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>

          {/* View More Link */}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all text-lg"
            >
              모든 제품 보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Major Clients Section */}
      <ClientsCarousel />

      {/* CTA Section */}
      <section className="py-32 px-4 bg-[#0a0e1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"></div>
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            지금 바로 시작하세요
          </h2>
          <p className="text-xl text-white/70 mb-12 font-light">
            케이씨파워의 전기설비 솔루션으로 안전하고 효율적인 <br />
            전력 인프라를 구축하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-10 py-4 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-all duration-300 font-semibold shadow-xl"
            >
              견적 문의하기
            </Link>
            <Link
              href="/cases"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-lg hover:bg-white/20 transition-all duration-300 font-semibold"
            >
              시공사례 보기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
