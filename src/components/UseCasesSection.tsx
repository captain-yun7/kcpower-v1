'use client';

import Link from 'next/link';
import { useState } from 'react';

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
    imageUrl: '/images/cases/kepco.jpg',
    link: '/cases/kepco',
  },
  {
    id: '2',
    title: '서울지하철 9호선',
    category: '철도',
    categoryColor: 'bg-secondary',
    imageUrl: '/images/cases/metro.jpg',
    link: '/cases/metro',
  },
  {
    id: '3',
    title: '현대일렉트릭 협력',
    category: 'LS/현대',
    categoryColor: 'bg-primary',
    imageUrl: '/images/cases/hyundai.jpg',
    link: '/cases/hyundai',
  },
  {
    id: '4',
    title: '동탄2신도시 인프라',
    category: '신도시',
    categoryColor: 'bg-secondary',
    imageUrl: '/images/cases/dongtan.jpg',
    link: '/cases/dongtan',
  },
  {
    id: '5',
    title: 'LS일렉트릭 공장',
    category: 'LS/현대',
    categoryColor: 'bg-primary',
    imageUrl: '/images/cases/ls.jpg',
    link: '/cases/ls',
  },
  {
    id: '6',
    title: '산일전기 프로젝트',
    category: '협력사',
    categoryColor: 'bg-secondary',
    imageUrl: '/images/cases/sanil.jpg',
    link: '/cases/sanil',
  },
  {
    id: '7',
    title: '터널용 특수 외함',
    category: '철도',
    categoryColor: 'bg-secondary',
    imageUrl: '/images/cases/tunnel.jpg',
    link: '/cases/tunnel',
  },
  {
    id: '8',
    title: '침수형 외함 설치',
    category: '협력사',
    categoryColor: 'bg-secondary',
    imageUrl: '/images/cases/waterproof.jpg',
    link: '/cases/waterproof',
  },
];

export default function UseCasesSection() {
  const [filter, setFilter] = useState<string>('전체');

  const filteredCases = filter === '전체'
    ? useCases
    : useCases.filter(uc => uc.category === filter);

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-[16px] text-gray-500 mb-3">Project Cases</p>
          <h2 className="text-[42px] lg:text-[48px] font-bold text-gray-900 mb-6 leading-tight">
            30년 경험, 검증된 시공사례
          </h2>
          <p className="text-[18px] text-primary mb-8">
            대한민국 주요 전력 인프라를 책임진 케이씨파워의 다양한 프로젝트를 확인하세요.
          </p>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-[16px] focus:border-primary focus:outline-none bg-white"
            >
              <option value="전체">모든 시공사례</option>
              <option value="한전">한전</option>
              <option value="LS/현대">LS/현대</option>
              <option value="철도">철도</option>
              <option value="신도시">신도시</option>
              <option value="협력사">협력사</option>
            </select>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCases.map((useCase) => (
            <Link
              key={useCase.id}
              href={useCase.link}
              className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-700">
                {/* Placeholder for image */}
                <div className={`w-full h-full bg-gradient-to-br ${useCase.categoryColor === 'bg-primary' ? 'from-primary/20 to-primary/40' : 'from-secondary/20 to-secondary/40'} flex items-center justify-center`}>
                  <div className="text-white/30 text-6xl font-bold">
                    {useCase.title.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Category Badge */}
                <div className="mb-3">
                  <span className={`inline-block px-4 py-1.5 ${useCase.categoryColor} text-white text-[13px] font-medium rounded-md`}>
                    {useCase.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white text-[22px] font-bold leading-tight group-hover:translate-y-[-4px] transition-transform duration-300">
                  {useCase.title}
                </h3>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 px-10 py-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-[16px] font-semibold"
          >
            모든 시공사례 보기
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
