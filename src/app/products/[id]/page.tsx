'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface Product {
  id: string;
  name: string;
  model: string;
  category: string;
  tags: string[];
  description: string;
  shortDesc?: string;
  capacity?: string;
  voltage?: string;
  dimensions?: string;
  weight?: string;
  material?: string;
  protection?: string;
  specs?: any;
  features?: any[];
  applications?: any[];
  imageUrl?: string;
  thumbnailUrl?: string;
  images?: string[];
  brochureUrl?: string;
  videoUrl?: string;
  solutions?: any[];
  cases?: any[];
}

export default function ProductDetailPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/products/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts || []);
      } else {
        console.error('제품을 찾을 수 없습니다');
      }
    } catch (error) {
      console.error('제품 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0e1a]">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0a0e1a]">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-4">제품을 찾을 수 없습니다</h1>
            <Link href="/products" className="text-secondary hover:underline">
              제품 목록으로 돌아가기
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = [
    product.imageUrl || product.thumbnailUrl,
    ...(product.images || []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Breadcrumb */}
      <section className="py-6 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-secondary">홈</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/products" className="hover:text-secondary">제품</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="py-16 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Images */}
            <div>
              {/* Main Image */}
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
                {allImages[selectedImage] ? (
                  <img
                    src={allImages[selectedImage] as string}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary/10 to-secondary/5">
                    <svg className="w-32 h-32 text-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === idx
                          ? 'border-secondary'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={img as string}
                        alt={`${product.name} ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div>
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-semibold rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="text-xl text-secondary font-semibold mb-6">
                모델: {product.model}
              </div>

              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
                {product.capacity && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">용량</div>
                    <div className="text-lg font-bold text-gray-900">{product.capacity}</div>
                  </div>
                )}
                {product.voltage && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">전압</div>
                    <div className="text-lg font-bold text-gray-900">{product.voltage}</div>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">크기</div>
                    <div className="text-lg font-bold text-gray-900">{product.dimensions}</div>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">중량</div>
                    <div className="text-lg font-bold text-gray-900">{product.weight}</div>
                  </div>
                )}
                {product.material && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">재질</div>
                    <div className="text-lg font-bold text-gray-900">{product.material}</div>
                  </div>
                )}
                {product.protection && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">보호등급</div>
                    <div className="text-lg font-bold text-gray-900">{product.protection}</div>
                  </div>
                )}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/quote"
                  className="flex-1 px-8 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark transition-all duration-300 font-semibold text-center inline-flex items-center justify-center gap-2 hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  견적 문의
                </Link>
                {product.brochureUrl && (
                  <a
                    href={product.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-8 py-4 bg-white border-2 border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white transition-all duration-300 font-semibold text-center inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    카탈로그 다운로드
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      {product.features && product.features.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">주요 특징</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.features.map((feature: any, idx: number) => (
                <div key={idx} className="bg-white p-8 rounded-xl hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {feature.title || feature}
                  </h3>
                  {feature.description && (
                    <p className="text-gray-600">{feature.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Applications Section */}
      {product.applications && product.applications.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">적용 분야</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {product.applications.map((app: any, idx: number) => (
                <div key={idx} className="text-center p-6 bg-gray-50 rounded-xl hover:bg-secondary/5 transition-colors">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">
                    {app.name || app}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Specs */}
      {product.specs && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">상세 사양</h2>
            <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
              <table className="w-full">
                <tbody>
                  {Object.entries(product.specs).map(([key, value], idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-semibold text-gray-700 w-1/3 border-r border-gray-200">
                        {key}
                      </td>
                      <td className="px-6 py-4 text-gray-900">
                        {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* Related Cases */}
      {product.cases && product.cases.length > 0 && (
        <section className="py-20 px-4 bg-white">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">시공 사례</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.cases.map((caseItem: any) => (
                <Link
                  key={caseItem.id}
                  href={`/cases/${caseItem.id}`}
                  className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all"
                >
                  {caseItem.thumbnailUrl && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={caseItem.thumbnailUrl}
                        alt={caseItem.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    {caseItem.client && (
                      <div className="text-sm text-secondary font-semibold mb-2">
                        {caseItem.client}
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-secondary transition-colors">
                      {caseItem.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {caseItem.location && <span>{caseItem.location}</span>}
                      {caseItem.year && <span>{caseItem.year}년</span>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-[1400px] mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">관련 제품</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  href={`/products/${relProduct.id}`}
                  className="group bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    {relProduct.thumbnailUrl ? (
                      <img
                        src={relProduct.thumbnailUrl}
                        alt={relProduct.name}
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
                      {relProduct.model}
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors">
                      {relProduct.name}
                    </h3>
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
            이 제품에 대해 궁금하신가요?
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
              href="/services"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold"
            >
              기술 지원 문의
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
