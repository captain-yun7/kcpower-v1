import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: '회사소개 | 케이씨파워',
  description: '1993년 설립 이후 30년간 변압기 외함 제조 분야를 선도해온 케이씨파워입니다.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">About Us</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            회사소개
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            1993년 설립 이후 30년간 변압기 외함 제조 분야를 선도해온<br />
            대한민국 전기설비의 신뢰할 수 있는 파트너, 케이씨파워입니다
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
                <p className="text-secondary font-semibold">Company Profile</p>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                최고 품질의 변압기 외함을<br />
                생산하는 전문 기업
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                주식회사 케이씨파워는 1993년 설립 이후 30년간 변압기 외함, 수배전반, 제어반 제조 분야에서
                축적된 기술력과 노하우로 대한민국 전력 산업 발전에 기여해왔습니다.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                한국전력공사, LS일렉트릭, 현대일렉트릭, 산일전기 등 국내 주요 전력 기업들과의
                긴밀한 협력을 통해 변전소, 철도, 터널, 산업단지 등 다양한 현장에 최적화된
                전기설비 솔루션을 제공하고 있습니다.
              </p>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary/10 to-secondary/5">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80"
                  alt="케이씨파워 공장"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Stats Overlay */}
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-2xl p-6 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">30+</p>
                    <p className="text-sm text-gray-600">년 역사</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl lg:text-6xl font-bold text-secondary mb-2">1993</div>
              <div className="text-gray-700 font-semibold">설립</div>
              <div className="text-sm text-gray-600 mt-1">30년 전통</div>
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
              <div className="text-sm text-gray-600 mt-1">한전, LS, 현대</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <p className="text-secondary font-semibold">Core Values</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              케이씨파워의 핵심 가치
            </h2>
            <p className="text-xl text-gray-600">
              우리가 추구하는 가치와 철학
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">안전</h3>
              <p className="text-gray-600 leading-relaxed">
                모든 제품과 서비스에서 안전을 최우선으로 합니다.
                철저한 품질 관리와 검증을 통해 고객의 안전을 보장합니다.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">신뢰</h3>
              <p className="text-gray-600 leading-relaxed">
                30년간 쌓아온 기술력과 실적으로 신뢰를 증명합니다.
                한전 우수협력업체 선정으로 검증된 품질을 제공합니다.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">혁신</h3>
              <p className="text-gray-600 leading-relaxed">
                끊임없는 R&D로 업계 최초의 혁신 제품을 개발합니다.
                변화하는 시장 요구에 발맞춰 새로운 솔루션을 제시합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <p className="text-secondary font-semibold">History</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              케이씨파워의 발자취
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { year: '2024', title: '디지털 전환 가속화', desc: '스마트 팩토리 시스템 도입' },
              { year: '2020', title: '생산 능력 확대', desc: '제3공장 증축 완료' },
              { year: '2015', title: '품질 인증 획득', desc: 'ISO 9001 인증 및 한전 우수협력업체 선정' },
              { year: '2010', title: '기술력 강화', desc: '특수 환경용 외함 개발 성공' },
              { year: '2000', title: '사업 확장', desc: '제2공장 설립, 수배전반 사업 진출' },
              { year: '1993', title: '회사 설립', desc: '변압기 외함 전문 제조업체로 출발' },
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-3xl font-bold text-secondary">{item.year}</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute left-0 top-3 w-3 h-3 bg-secondary rounded-full" />
                  {idx < 5 && (
                    <div className="absolute left-[5px] top-6 bottom-0 w-0.5 bg-secondary/20" />
                  )}
                  <div className="ml-8 bg-white rounded-xl p-6 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <p className="text-secondary font-semibold">Company Info</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              기업 정보
            </h2>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">회사명</h3>
                    <p className="text-gray-900 font-medium">주식회사 케이씨파워</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">대표이사</h3>
                    <p className="text-gray-900 font-medium">이영수</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">설립일</h3>
                    <p className="text-gray-900 font-medium">1993년</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">본사</h3>
                    <p className="text-gray-900 font-medium">인천광역시 남동구 남동서로 19번길 46</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">주요 사업</h3>
                    <p className="text-gray-900 font-medium">
                      변압기 외함, 수배전반, 제어반 제조<br />
                      전기설비 설치 및 유지보수
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-1">연락처</h3>
                    <p className="text-gray-900 font-medium">
                      Tel: 032-816-8034<br />
                      Email: peskorea@naver.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#0a0e1a]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            케이씨파워와 함께하세요
          </h2>
          <p className="text-xl text-white/70 mb-10">
            30년 경험과 기술력으로 최고의 전기설비 솔루션을 제공합니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products"
              className="px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:scale-105"
            >
              제품 둘러보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link
              href="/quote"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold"
            >
              견적 문의
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
