'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

interface Client {
  name: string;
  fullName: string;
  logoPath: string;
}

const clients: Client[] = [
  {
    name: 'KEPCO',
    fullName: '한국전력공사',
    logoPath: '/logo/한국전력공사.png',
  },
  {
    name: 'KORAIL',
    fullName: '한국철도공사',
    logoPath: '/logo/한국철도공사.png',
  },
  {
    name: 'HD',
    fullName: 'HD현대일렉트릭',
    logoPath: '/logo/현대일렉트릭.png',
  },
  {
    name: '효성',
    fullName: '효성중공업',
    logoPath: '/logo/효성.png',
  },
  {
    name: '국가철도공단',
    fullName: '국가철도공단',
    logoPath: '/logo/국가철도공간.png',
  },
  {
    name: '산일전기',
    fullName: '산일전기(주)',
    logoPath: '/logo/산일전기.png',
  },
  {
    name: '서울교통공사',
    fullName: '서울교통공사',
    logoPath: '/logo/서울교통공사.png',
  },
  {
    name: '인천교통공사',
    fullName: '인천교통공사',
    logoPath: '/logo/인천교통공사.jpg',
  },
  {
    name: '제룡전기',
    fullName: '제룡전기주식회사',
    logoPath: '/logo/제룡전기.webp',
  },
];

export default function ClientsCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const scroll = () => {
      scrollPosition += 0.5;

      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 무한 스크롤을 위해 클라이언트 배열을 3번 복제
  const duplicatedClients = [...clients, ...clients, ...clients];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-4">
            <p className="text-[14px] text-secondary font-semibold tracking-wide uppercase">Our Clients</p>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">주요 고객사</h2>
          <p className="text-xl text-gray-600">
            대한민국 전력 인프라를 책임지는 주요 기업들이 케이씨파워를 선택합니다
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div
            ref={scrollRef}
            className="flex gap-12 overflow-hidden"
            style={{ scrollBehavior: 'auto' }}
          >
            {duplicatedClients.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                className="flex-shrink-0 bg-white rounded-2xl p-8 w-[280px] h-[180px] flex items-center justify-center hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-primary/20 group"
              >
                <div className="w-full h-full flex items-center justify-center">
                  <div className="relative w-full h-[120px] group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={client.logoPath}
                      alt={client.fullName}
                      fill
                      className="object-contain"
                      sizes="280px"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            그 외 다수의 전기설비 업체와 함께하고 있습니다
          </p>
        </div>
      </div>
    </section>
  );
}
