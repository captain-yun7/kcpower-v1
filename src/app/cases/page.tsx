'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface CaseStudy {
  id: string;
  title: string;
  client?: string;
  location?: string;
  projectType?: string;
  year?: number;
  description: string;
  thumbnailUrl?: string;
  tags: string[];
  isPinned: boolean;
  views: number;
}

interface Filters {
  tags: string[];
  projectTypes: string[];
  clients: string[];
  years: number[];
}

export default function CasesPage() {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [filters, setFilters] = useState<Filters>({
    tags: [],
    projectTypes: [],
    clients: [],
    years: [],
  });
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string>('all');
  const [selectedProjectType, setSelectedProjectType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCases();
  }, [selectedTag, selectedProjectType, selectedYear, searchQuery]);

  const fetchCases = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (selectedTag !== 'all') params.append('tag', selectedTag);
      if (selectedProjectType !== 'all') params.append('projectType', selectedProjectType);
      if (selectedYear !== 'all') params.append('year', selectedYear);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/cases?${params.toString()}`);
      const data = await response.json();

      setCases(data.cases || []);
      setFilters(data.filters || { tags: [], projectTypes: [], clients: [], years: [] });
    } catch (error) {
      console.error('시공사례 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCases();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0e1a]">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Case Studies</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            시공사례
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            한전, LS일렉트릭, 현대일렉트릭 등 대한민국 주요 전력 기업들과<br />
            함께한 케이씨파워의 성공적인 프로젝트를 소개합니다
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-4 bg-white border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="프로젝트명, 고객사, 위치로 검색..."
                className="w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-full focus:outline-none focus:border-secondary transition-colors text-gray-900"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-secondary-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Filter Tabs */}
          <div className="flex flex-col gap-6">
            {/* Project Type Filter */}
            {filters.projectTypes.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">사업 유형</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedProjectType('all')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedProjectType === 'all'
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    전체
                  </button>
                  {filters.projectTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedProjectType(type)}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        selectedProjectType === type
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tag Filter */}
            {filters.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">제품 유형</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag('all')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedTag === 'all'
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    전체
                  </button>
                  {filters.tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        selectedTag === tag
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Year Filter */}
            {filters.years.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">연도</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedYear('all')}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedYear === 'all'
                        ? 'bg-secondary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    전체
                  </button>
                  {filters.years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(String(year))}
                      className={`px-6 py-2 rounded-full font-medium transition-all ${
                        selectedYear === String(year)
                          ? 'bg-secondary text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {year}년
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-6 text-gray-600">
            총 <span className="font-bold text-secondary">{cases.length}</span>개의 시공사례
          </div>
        </div>
      </section>

      {/* Cases Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse">
                  <div className="aspect-video bg-gray-200" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-3" />
                    <div className="h-6 bg-gray-200 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4" />
                  </div>
                </div>
              ))}
            </div>
          ) : cases.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">시공사례가 없습니다</h3>
              <p className="text-gray-600">다른 필터를 선택해보세요</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cases.map((caseItem) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.id}`}
                  className="group bg-white rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Case Image */}
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    {caseItem.thumbnailUrl ? (
                      <img
                        src={caseItem.thumbnailUrl}
                        alt={caseItem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                        <svg className="w-20 h-20 text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Pinned Badge */}
                    {caseItem.isPinned && (
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                          주요 사례
                        </span>
                      </div>
                    )}

                    {/* Tags */}
                    {caseItem.tags.length > 0 && (
                      <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                        {caseItem.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-white/90 backdrop-blur-sm text-secondary text-xs font-semibold rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Case Info */}
                  <div className="p-6">
                    {caseItem.client && (
                      <div className="text-sm text-secondary font-semibold mb-2">
                        {caseItem.client}
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-secondary transition-colors line-clamp-2">
                      {caseItem.title}
                    </h3>

                    {/* Meta Info */}
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-600 mb-4">
                      {caseItem.location && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span>{caseItem.location}</span>
                        </div>
                      )}
                      {caseItem.year && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{caseItem.year}년</span>
                        </div>
                      )}
                      {caseItem.projectType && (
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          <span>{caseItem.projectType}</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {caseItem.description}
                    </p>

                    {/* CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-secondary font-semibold inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        자세히 보기
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <div className="flex items-center gap-1 text-gray-500 text-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        {caseItem.views}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#0a0e1a]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            다음 성공 사례의 주인공이 되세요
          </h2>
          <p className="text-xl text-white/70 mb-10">
            30년 경험과 기술력으로 귀사의 프로젝트를 성공으로 이끌겠습니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:scale-105"
            >
              프로젝트 문의하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/products"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold"
            >
              제품 둘러보기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
