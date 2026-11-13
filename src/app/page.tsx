import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import { prisma } from '@/lib/prisma';
import { getLocale } from '@/i18n/server';
import { messages } from '@/i18n/messages/home';

const COMPANY_VIDEO_URL = 'https://sgbtbrhav48xk7cq.public.blob.vercel-storage.com/videos/company-intro-ko.mp4';
const COMPANY_VIDEO_POSTER = '/videos/company-intro-poster.jpg';

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
  const t = messages[await getLocale()];
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
          <span className="text-[14px] font-medium">{t.quickQuote}</span>
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
          <span className="text-[14px] font-medium">{t.quickLocation}</span>
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
          <span className="text-[14px] font-medium">{t.quickDownloads}</span>
        </Link>
      </div>

      {/* 회사소개영상 */}
      <section className="py-20 px-4 bg-[#0a0e1a]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-10">
            {t.videoTitle}
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            <video
              src={COMPANY_VIDEO_URL}
              poster={COMPANY_VIDEO_POSTER}
              controls
              playsInline
              preload="none"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* Company Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              {t.statsTitle}
            </h2>
            <p className="text-xl text-gray-600">
              {t.statsSubtitle}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 max-w-[1000px] mx-auto">
            {t.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-5xl lg:text-6xl font-bold text-secondary mb-2">{stat.value}</div>
                <div className="text-gray-700 font-semibold">{stat.label}</div>
                <div className="text-sm text-gray-600 mt-1">{stat.note}</div>
              </div>
            ))}
          </div>

          {/* Core Values */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.values[0].title}</h3>
              <p className="text-gray-600 text-sm">
                {t.values[0].desc}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.values[1].title}</h3>
              <p className="text-gray-600 text-sm">
                {t.values[1].desc}
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.values[2].title}</h3>
              <p className="text-gray-600 text-sm">
                {t.values[2].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
