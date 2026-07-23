import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const majorCertifications = [
  {
    title: '혁신제품 지정 인증서',
    issuer: '국토교통부',
    desc: "'밀폐형 전장품 외함' 혁신제품 지정 (2025)",
  },
  {
    title: '중소기업기술마켓 인증서',
    issuer: '중소기업기술마켓',
    desc: '밀폐형 전장품 외함 기술·제품 등록',
  },
  {
    title: 'ESG 우수 중소기업 확인서',
    issuer: '동반성장위원회',
    desc: 'ESG 이행사항 확인 우수 기업 (2026)',
  },
  {
    title: '이노비즈·메인비즈 인증',
    issuer: '중소벤처기업부',
    desc: '기술혁신형·경영혁신형 중소기업 (2021)',
  },
  {
    title: '벤처기업 확인서',
    issuer: '벤처기업확인기관',
    desc: '혁신성장유형 벤처기업 지정 (2022)',
  },
  {
    title: '다수공급자계약(MAS) 등록',
    issuer: '조달청',
    desc: '공공조달 다수공급자 등록 (2022)',
  },
];

export default function CertificationsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a] pt-[90px]">
        <div className="relative z-10 text-center px-4 py-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Certifications & Patents</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">인증서</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            혁신제품 지정, ESG 우수기업 인증 등<br />
            케이씨파워의 기술력을 증명하는 인증과 특허입니다
          </p>
        </div>
      </section>

      {/* 주요 인증 */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">주요 인증 현황</h2>
            <p className="text-xl text-gray-600">정부 및 공공기관으로부터 인정받은 기술력</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {majorCertifications.map((cert) => (
              <div
                key={cert.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/30 hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.title}</h3>
                <p className="text-secondary font-semibold text-sm mb-3">{cert.issuer}</p>
                <p className="text-gray-600">{cert.desc}</p>
              </div>
            ))}
          </div>

          {/* 특허 안내 */}
          <div className="mt-16 bg-white rounded-2xl p-10 shadow-lg text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">특허 및 디자인 등록 다수 보유</h3>
            <p className="text-gray-600 mb-8">
              변압기 외함 관련 특허, 상표, 디자인 등록 등 다수의 지식재산권을 보유하고 있습니다.<br />
              인증서 원본 파일은 자료실에서 확인하실 수 있습니다.
            </p>
            <Link
              href="/downloads"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary text-white rounded-lg hover:bg-secondary-dark transition-colors font-semibold"
            >
              자료실에서 인증서 보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
