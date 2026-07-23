import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { prisma } from '@/lib/prisma';

// 회사소개영상 URL (mp4 또는 스트리밍 주소 확보 시 입력)
const COMPANY_VIDEO_URL = '';

async function getBanners() {
  const now = new Date();

  const banners = await prisma.banner.findMany({
    where: {
      position: 'HOME_MAIN',
      isActive: true,
      OR: [
        { startDate: null },
        { startDate: { lte: now } },
      ],
      AND: [
        {
          OR: [
            { endDate: null },
            { endDate: { gte: now } },
          ],
        },
      ],
    },
    orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
    select: {
      id: true,
      title: true,
      description: true,
      imageUrl: true,
      linkUrl: true,
      linkText: true,
    },
  });

  return banners;
}

export default async function Home() {
  const banners = await getBanners();
  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e1a]">
      <Header />

      {/* Hero Section with Auto-Slide */}
      <HeroSection banners={banners} />

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
          className="group flex items-center gap-3 px-6 py-4 text-white hover:bg-[#2a3555] transition-all duration-300"
        >
          <div className="w-10 h-10 flex items-center justify-center bg-white/10 rounded-full group-hover:scale-110 transition-transform">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-[14px] font-medium">자료 다운로드</span>
        </Link>
      </div>

      {/* 회사소개영상 */}
      <section className="py-20 px-4 bg-[#0a0e1a]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-10">
            회사소개영상
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            {COMPANY_VIDEO_URL ? (
              <video src={COMPANY_VIDEO_URL} controls className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-9 h-9 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">영상 준비 중입니다</p>
              </div>
            )}
          </div>
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
              <div className="text-5xl lg:text-6xl font-bold text-secondary mb-2">30+</div>
              <div className="text-gray-700 font-semibold">년 역사</div>
              <div className="text-sm text-gray-600 mt-1">1993년 설립</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-secondary mb-2">3</div>
              <div className="text-gray-700 font-semibold">개 공장</div>
              <div className="text-sm text-gray-600 mt-1">인천 남동구</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-secondary mb-2">10K+</div>
              <div className="text-gray-700 font-semibold">누적 납품</div>
              <div className="text-sm text-gray-600 mt-1">변압기 외함</div>
            </div>
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-secondary mb-2">4+</div>
              <div className="text-gray-700 font-semibold">주요 고객사</div>
              <div className="text-sm text-gray-600 mt-1">한전, LS, 현대일렉트릭</div>
            </div>
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      <Footer />
    </div>
  );
}
