'use client';

import Link from 'next/link';

interface UseCase {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  imageUrl: string;
  link: string;
}

const useCases: UseCase[] = [
  {
    id: '1',
    title: '한전 변전소 외함 납품',
    category: '한전',
    categoryColor: 'bg-primary',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
    link: '/cases/kepco',
  },
  {
    id: '2',
    title: '서울지하철 9호선',
    category: '철도',
    categoryColor: 'bg-secondary',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
    link: '/cases/metro',
  },
  {
    id: '3',
    title: '현대일렉트릭 협력',
    category: 'LS/현대',
    categoryColor: 'bg-primary',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    link: '/cases/hyundai',
  },
  {
    id: '4',
    title: '동탄2신도시 인프라',
    category: '신도시',
    categoryColor: 'bg-secondary',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    link: '/cases/dongtan',
  },
  {
    id: '5',
    title: 'LS일렉트릭 공장',
    category: 'LS/현대',
    categoryColor: 'bg-primary',
    imageUrl: 'https://images.unsplash.com/photo-1581093458791-9d42e2e7b07f?w=800&q=80',
    link: '/cases/ls',
  },
  {
    id: '6',
    title: '산일전기 프로젝트',
    category: '협력사',
    categoryColor: 'bg-secondary',
    imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
    link: '/cases/sanil',
  },
  {
    id: '7',
    title: '터널용 특수 외함',
    category: '철도',
    categoryColor: 'bg-secondary',
    imageUrl: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&q=80',
    link: '/cases/tunnel',
  },
  {
    id: '8',
    title: '침수형 외함 설치',
    category: '협력사',
    categoryColor: 'bg-secondary',
    imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
    link: '/cases/waterproof',
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4">
            <p className="text-[14px] text-primary font-semibold tracking-wide uppercase">Project Cases</p>
          </div>
          <h2 className="text-[48px] lg:text-[56px] font-bold text-gray-900 mb-6 leading-tight">
            30년 경험, 검증된 시공사례
          </h2>
          <p className="text-[20px] text-gray-600 mb-10 max-w-3xl mx-auto">
            대한민국 주요 전력 인프라를 책임진 케이씨파워의 다양한 프로젝트를 확인하세요.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.slice(0, 4).map((useCase) => (
            <Link
              key={useCase.id}
              href={useCase.link}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={useCase.imageUrl}
                  alt={useCase.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent group-hover:from-black/95 transition-all duration-500" />

              {/* Content */}
              <div className="absolute inset-0 p-7 flex flex-col justify-between">
                {/* Category Badge */}
                <div className="flex justify-between items-start">
                  <span className={`inline-block px-4 py-2 ${useCase.categoryColor} text-white text-[12px] font-bold rounded-lg shadow-lg uppercase tracking-wider backdrop-blur-sm`}>
                    {useCase.category}
                  </span>

                  {/* Hover Arrow */}
                  <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Content */}
                <div className="space-y-3">
                  <h3 className="text-white text-[24px] font-bold leading-tight transform group-hover:translate-y-[-8px] transition-transform duration-500">
                    {useCase.title}
                  </h3>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-white/80 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-[14px] font-medium">자세히 보기</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Decorative Border */}
              <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-all duration-500" />
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-16">
          <Link
            href="/cases"
            className="inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300 text-[17px] font-bold group hover:scale-105"
          >
            모든 시공사례 보기
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
