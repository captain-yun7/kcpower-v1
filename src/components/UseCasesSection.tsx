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
    title: '팔레타이징',
    category: '제조',
    categoryColor: 'bg-red-700',
    imageUrl: '/images/use-cases/palletizing.jpg',
    link: '/solutions/palletizing',
  },
  {
    id: '2',
    title: '레이저 로봇 용접',
    category: '제조',
    categoryColor: 'bg-red-700',
    imageUrl: '/images/use-cases/laser-welding.jpg',
    link: '/solutions/laser-welding',
  },
  {
    id: '3',
    title: 'Sanding (샌딩)',
    category: '제조',
    categoryColor: 'bg-red-700',
    imageUrl: '/images/use-cases/sanding.jpg',
    link: '/solutions/sanding',
  },
  {
    id: '4',
    title: '머신텐딩',
    category: '제조',
    categoryColor: 'bg-red-700',
    imageUrl: '/images/use-cases/machine-tending.jpg',
    link: '/solutions/machine-tending',
  },
  {
    id: '5',
    title: 'Dr.Presso',
    category: '서비스',
    categoryColor: 'bg-red-800',
    imageUrl: '/images/use-cases/dr-presso.jpg',
    link: '/solutions/dr-presso',
  },
  {
    id: '6',
    title: '튀김',
    category: '서비스',
    categoryColor: 'bg-red-800',
    imageUrl: '/images/use-cases/frying.jpg',
    link: '/solutions/frying',
  },
  {
    id: '7',
    title: '공항 수하물 핸들링',
    category: '서비스',
    categoryColor: 'bg-red-800',
    imageUrl: '/images/use-cases/baggage.jpg',
    link: '/solutions/baggage',
  },
  {
    id: '8',
    title: '전기차 충전',
    category: '서비스',
    categoryColor: 'bg-red-800',
    imageUrl: '/images/use-cases/ev-charging.jpg',
    link: '/solutions/ev-charging',
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
          <p className="text-[16px] text-gray-500 mb-3">Use cases</p>
          <h2 className="text-[42px] lg:text-[48px] font-bold text-gray-900 mb-6 leading-tight">
            로봇 도입으로 일하는 방식이 새로워집니다.
          </h2>
          <p className="text-[18px] text-red-700 mb-8">
            다양한 성공사례를 통해 앞디툴을 확신할 새로운 아이디어를 얻어보세요.
          </p>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-6 py-3 border-2 border-gray-300 rounded-lg text-[16px] focus:border-red-700 focus:outline-none bg-white"
            >
              <option value="전체">더 많은 도입사례</option>
              <option value="제조">제조</option>
              <option value="서비스">서비스</option>
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
                <div className="w-full h-full bg-gradient-to-br from-red-700/20 to-red-900/20 flex items-center justify-center">
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
            href="/solutions"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-[16px] font-semibold"
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
