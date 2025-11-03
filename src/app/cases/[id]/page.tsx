'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
  content: string;
  challenge?: string;
  solution?: string;
  result?: string;
  thumbnailUrl?: string;
  imageUrl?: string;
  images: string[];
  videoUrl?: string;
  tags: string[];
  views: number;
  products?: any[];
}

export default function CaseDetailPage() {
  const params = useParams();
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [relatedCases, setRelatedCases] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchCase();
    }
  }, [params.id]);

  const fetchCase = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cases/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setCaseStudy(data.case);
        setRelatedCases(data.relatedCases || []);
      } else {
        console.error('시공사례를 찾을 수 없습니다');
      }
    } catch (error) {
      console.error('시공사례 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">시공사례를 찾을 수 없습니다</h1>
            <Link href="/cases" className="text-secondary hover:underline">
              시공사례 목록으로 돌아가기
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = [
    caseStudy.imageUrl || caseStudy.thumbnailUrl,
    ...caseStudy.images,
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-end">
        {allImages[0] ? (
          <img
            src={allImages[0] as string}
            alt={caseStudy.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-secondary/5" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 w-full px-4 pb-16">
          <div className="max-w-[1400px] mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/90 backdrop-blur-sm text-secondary text-sm font-semibold rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {caseStudy.client && (
              <div className="text-xl text-white/90 font-semibold mb-3">
                {caseStudy.client}
              </div>
            )}

            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
              {caseStudy.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-6 text-white/80">
              {caseStudy.location && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{caseStudy.location}</span>
                </div>
              )}
              {caseStudy.year && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{caseStudy.year}년</span>
                </div>
              )}
              {caseStudy.projectType && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{caseStudy.projectType}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-6 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-secondary">홈</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/cases" className="hover:text-secondary">시공사례</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium truncate">{caseStudy.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-[900px] mx-auto">
          {/* Overview */}
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-xl text-gray-700 leading-relaxed">
              {caseStudy.description}
            </p>
          </div>

          {/* Challenge, Solution, Result */}
          {(caseStudy.challenge || caseStudy.solution || caseStudy.result) && (
            <div className="grid gap-8 mb-12">
              {caseStudy.challenge && (
                <div className="bg-gray-50 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">과제</h2>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {caseStudy.challenge}
                  </div>
                </div>
              )}

              {caseStudy.solution && (
                <div className="bg-secondary/5 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">솔루션</h2>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {caseStudy.solution}
                  </div>
                </div>
              )}

              {caseStudy.result && (
                <div className="bg-green-50 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">성과</h2>
                  </div>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {caseStudy.result}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          {caseStudy.content && (
            <div
              className="prose prose-lg max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: caseStudy.content }}
            />
          )}
        </div>
      </section>

      {/* Image Gallery */}
      {allImages.length > 1 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">프로젝트 갤러리</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allImages.slice(1).map((image, idx) => (
                <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-gray-200">
                  <img
                    src={image as string}
                    alt={`${caseStudy.title} ${idx + 2}`}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Used */}
      {caseStudy.products && caseStudy.products.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">사용된 제품</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {caseStudy.products.map((product: any) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    {product.thumbnailUrl ? (
                      <img
                        src={product.thumbnailUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                        <svg className="w-16 h-16 text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-sm text-secondary font-semibold mb-1">
                      {product.model}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">관련 시공사례</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedCases.map((relCase) => (
                <Link
                  key={relCase.id}
                  href={`/cases/${relCase.id}`}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="aspect-video overflow-hidden bg-gray-100">
                    {relCase.thumbnailUrl ? (
                      <img
                        src={relCase.thumbnailUrl}
                        alt={relCase.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                        <svg className="w-16 h-16 text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    {relCase.client && (
                      <div className="text-sm text-secondary font-semibold mb-2">
                        {relCase.client}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors line-clamp-2">
                      {relCase.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {relCase.location && <span>{relCase.location}</span>}
                      {relCase.year && <span>{relCase.year}년</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#0a0e1a]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            프로젝트를 시작할 준비가 되셨나요?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            전문 상담을 통해 최적의 솔루션을 제안해드립니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:scale-105"
            >
              견적 문의하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/cases"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold"
            >
              더 많은 사례 보기
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
