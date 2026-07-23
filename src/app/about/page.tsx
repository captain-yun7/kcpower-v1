import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 연혁 (시안 기준)
const history = [
  { date: '2026.06', title: 'KCP 3공장 기업부설연구소' },
  { date: '2026.01', title: 'ESG 우수 중소기업 인증' },
  { date: '2025.03', title: "'밀폐형 전장품 외함' 혁신제품 등록" },
  { date: '2022.12', title: '다수공급자[MAS] 등록' },
  { date: '2022.05', title: '혁신성장유형 벤처기업 지정' },
  { date: '2021.09', title: '이노비즈·메인비즈 인증' },
  { date: '2014.03', title: '법인전환 (주)케이씨파워' },
  { date: '1993', title: '회사 설립' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a] pt-[90px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto py-16">
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

      {/* 개요 */}
      <section id="overview" className="py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 scroll-mt-[90px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <p className="text-secondary font-semibold">Overview</p>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              회사 개요
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 회사명 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/30 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">회사명</h3>
                  <p className="text-xl font-bold text-gray-900">주식회사 케이씨파워</p>
                </div>
              </div>
            </div>

            {/* 대표이사 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/30 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">대표이사</h3>
                  <p className="text-xl font-bold text-gray-900">이영수</p>
                </div>
              </div>
            </div>

            {/* 설립일 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/30 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">설립일</h3>
                  <p className="text-xl font-bold text-gray-900">1993년</p>
                </div>
              </div>
            </div>

            {/* 본사 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/30 hover:-translate-y-1 lg:col-span-2">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">본사</h3>
                  <p className="text-xl font-bold text-gray-900">인천광역시 남동구 남동서로 19번길 46</p>
                </div>
              </div>
            </div>

            {/* 주요 사업 */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/30 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">주요 사업</h3>
                  <p className="text-lg font-bold text-gray-900 leading-relaxed">
                    변압기 외함, 수배전반, 제어반 제조<br />
                    전기설비 설치 및 유지보수
                  </p>
                </div>
              </div>
            </div>

            {/* 연락처 */}
            <div className="group bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-secondary hover:-translate-y-1 md:col-span-2 lg:col-span-3">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/80 mb-2 uppercase tracking-wide">연락처</h3>
                    <p className="text-xl font-bold text-white">Tel: 032-816-8034</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white/80 mb-2 uppercase tracking-wide">이메일</h3>
                    <p className="text-xl font-bold text-white">peskorea@naver.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 이념 (핵심 가치) */}
      <section id="values" className="py-20 px-4 bg-white scroll-mt-[90px]">
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

      {/* 연혁 */}
      <section id="history" className="py-20 px-4 bg-gray-50 scroll-mt-[90px]">
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
            {history.map((item, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-2xl font-bold text-secondary">{item.date}</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute left-0 top-3 w-3 h-3 bg-secondary rounded-full" />
                  {idx < history.length - 1 && (
                    <div className="absolute left-[5px] top-6 bottom-0 w-0.5 bg-secondary/20" />
                  )}
                  <div className="ml-8 bg-white rounded-xl p-6 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO 인사말 */}
      <section id="ceo" className="py-20 px-4 bg-gradient-to-br from-[#0a0e1a] to-[#1a2847] scroll-mt-[90px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* CEO Photo */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800/50">
                  <img
                    src="/ceo.png"
                    alt="케이씨파워 대표이사 이영수"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-secondary text-white rounded-xl shadow-2xl p-6">
                  <p className="text-sm font-semibold mb-1">대표이사</p>
                  <p className="text-2xl font-bold">이영수</p>
                </div>
              </div>
            </div>

            {/* CEO Message Content */}
            <div className="lg:col-span-1">
              <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full mb-6">
                <p className="text-secondary font-semibold">CEO Message</p>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                변함없는 신뢰와 혁신으로<br />
                더 나은 미래를 만들어갑니다
              </h2>

              <div className="space-y-4 text-white/80 leading-relaxed">
                <p className="text-lg">
                  안녕하십니까. 주식회사 케이씨파워 대표이사 이영수입니다.
                </p>
                <p>
                  1993년 창립 이후 30년이 넘는 시간 동안 케이씨파워는 변압기 외함 제조 분야에서
                  최고의 품질과 기술력을 인정받으며 성장해왔습니다. 이는 고객 여러분의 변함없는
                  신뢰와 성원 덕분입니다.
                </p>
                <p>
                  우리는 한국전력공사, LS일렉트릭, 현대일렉트릭 등 대한민국을 대표하는 기업들과
                  함께하며 국가 전력 인프라의 핵심 파트너로서 역할을 다해왔습니다.
                  단순한 제품 공급을 넘어, 고객의 니즈를 정확히 파악하고 최적의 솔루션을
                  제공하는 것이 우리의 사명입니다.
                </p>
                <p>
                  앞으로도 케이씨파워는 끊임없는 기술 개발과 품질 향상을 통해
                  고객 여러분의 기대에 부응하겠습니다. 안전하고 신뢰할 수 있는 전기설비로
                  더 나은 미래를 함께 만들어가겠습니다.
                </p>
                <p className="text-white font-semibold pt-4">
                  감사합니다.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-8 border-t border-white/20 flex items-center gap-4">
                <div className="text-white">
                  <p className="text-sm text-white/60 mb-1">주식회사 케이씨파워</p>
                  <p className="text-xl font-bold">대표이사 이영수</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
