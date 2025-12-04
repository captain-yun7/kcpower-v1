'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaText: string;
  ctaLink: string;
}

// 기본 슬라이드 (DB 배너가 없을 경우 폴백)
const defaultSlides: Slide[] = [
  {
    id: '1',
    title: '30년 신뢰,\n최고의 전기설비 솔루션',
    subtitle: '1993년부터 쌓아온 기술력과 신뢰로 대한민국 전력 인프라를 책임집니다',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1920&q=80',
    ctaText: '케이씨파워 제품 둘러보기',
    ctaLink: '/products',
  },
  {
    id: '2',
    title: '한전이 선택한\n믿을 수 있는 파트너',
    subtitle: '한국전력공사 우수협력업체로 선정된 검증된 품질',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80',
    ctaText: '시공사례 보기',
    ctaLink: '/cases',
  },
  {
    id: '3',
    title: '3개 공장,\n신속한 생산 체계',
    subtitle: '대량 주문부터 긴급 납품까지 빠르게 대응합니다',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1920&q=80',
    ctaText: '회사소개 보기',
    ctaLink: '/about',
  },
  {
    id: '4',
    title: '특수 환경 대응,\n맞춤형 솔루션',
    subtitle: '터널용, 침수형, 소음저감형 등 현장에 최적화된 제품',
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1920&q=80',
    ctaText: '견적 문의하기',
    ctaLink: '/quote',
  },
];

interface HeroSectionProps {
  banners?: {
    id: string;
    title: string;
    description: string | null;
    imageUrl: string;
    linkUrl: string | null;
    linkText: string | null;
  }[];
}

export default function HeroSection({ banners }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // 배너 데이터를 슬라이드 형식으로 변환
  const slides: Slide[] = banners && banners.length > 0
    ? banners.map((banner) => ({
        id: banner.id,
        title: banner.title.replace(/\\n/g, '\n'), // \n을 실제 줄바꿈으로 변환
        subtitle: banner.description || '',
        imageUrl: banner.imageUrl,
        ctaText: banner.linkText || '자세히 보기',
        ctaLink: banner.linkUrl || '/',
      }))
    : defaultSlides;

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // 5초마다 슬라이드 변경

    return () => clearInterval(interval);
  }, [isAutoPlay, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false); // 수동으로 변경하면 자동재생 멈춤
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={slide.imageUrl}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-32 w-full">
        <div className="max-w-3xl">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8 absolute'
              }`}
            >
              <h1 className="text-[56px] lg:text-[72px] font-bold text-white mb-6 leading-tight tracking-tight whitespace-pre-line">
                {slide.title}
              </h1>
              <p className="text-[20px] text-white/90 mb-12 font-light tracking-wide">
                {slide.subtitle}
              </p>
              {slide.ctaLink && (
                <Link
                  href={slide.ctaLink}
                  className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-secondary to-secondary-dark text-white text-[17px] rounded-full hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 font-semibold hover:scale-105 group"
                >
                  {slide.ctaText}
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? 'w-12 h-3 bg-secondary'
                : 'w-3 h-3 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`슬라이드 ${index + 1}로 이동`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
        aria-label="이전 슬라이드"
      >
        <svg
          className="w-6 h-6 text-white transform group-hover:-translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/20 transition-all group"
        aria-label="다음 슬라이드"
      >
        <svg
          className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
