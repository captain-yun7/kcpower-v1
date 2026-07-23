import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 3공장 소개 영상 URL (확보 시 입력)
const FACTORY_VIDEO_URL = '';

const problems = [
  { title: '분진', desc: '노후화로 인한 분진, 화재 발생의 요인' },
  { title: '습기', desc: '온도차이로 인한 습기, 변압기 소손 원인' },
  { title: '침수', desc: '이상 기후로 인한 폭우, 변압기반의 침수 우려' },
  { title: '부식', desc: '외함의 부식 발생, 변압기반 수명 단축' },
];

const technologies = [
  {
    title: '방열 시스템',
    points: [
      '방열판과 FAN을 활용한 냉각 방식',
      '변압기 자체 손실 감소 및 탄소 저감',
      '사회적, 경제적 피해 절감 기여',
    ],
  },
  {
    title: '결로 방지 시스템',
    points: [
      '열 전도 및 복사 에너지 활용',
      '외부 분진 및 습기 차단',
      '습기 제어를 통한 결로 현상 예방',
    ],
  },
  {
    title: '완전 분리 및 밀폐',
    points: [
      '외부의 이물질 등 위험요소 차단',
      '유지 보수를 최소화하여 수명 연장',
      '변압기의 고효율에 기여',
    ],
  },
  {
    title: '도장의 개선',
    points: [
      '전처리 과정과 이중 도장',
      '표면 청결도 확보 및 밀착력 강화',
      '내식성, 내후성, 내구성 확보',
    ],
  },
];

export default function TechnologyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a] pt-[90px]">
        <div className="relative z-10 text-center px-4 py-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Technology</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">KCP 기술</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            변압기 외함의 문제를 근본부터 해결하는 케이씨파워만의 기술력
          </p>
        </div>
      </section>

      {/* 3공장 동영상 */}
      <section className="py-20 px-4 bg-[#0a0e1a]">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl lg:text-4xl font-bold text-white text-center mb-10">
            3공장 동영상
          </h2>
          <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
            {FACTORY_VIDEO_URL ? (
              <video src={FACTORY_VIDEO_URL} controls className="w-full h-full object-contain" />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-9 h-9 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white/60 text-sm">영상 준비 중입니다</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 기존 변압기반의 문제점 */}
      <section className="py-20 px-4 bg-gray-900">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <svg className="w-14 h-14 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              기존 변압기반의 문제점
            </h2>
          </div>

          <div className="space-y-5">
            {problems.map((item) => (
              <div key={item.title} className="flex items-center gap-6 bg-white rounded-lg p-6 shadow-lg">
                <span className="text-2xl font-bold text-blue-800 w-20 flex-shrink-0 text-center">
                  {item.title}
                </span>
                <p className="text-gray-700 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <svg className="w-10 h-10 text-red-500 animate-bounce" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21l-8-8h5V3h6v10h5l-8 8z" />
            </svg>
          </div>
        </div>
      </section>

      {/* KCP 기술 (해결책) */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#0a2a5e] via-[#1a4a8e] to-[#0a2a5e]">
        <div className="max-w-[900px] mx-auto">
          <div className="text-center mb-14">
            <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-white rounded-full">
              <svg className="w-8 h-8 text-[#1a2847]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              KCP의 해결 기술
            </h2>
          </div>

          <div className="space-y-8">
            {technologies.map((tech) => (
              <div key={tech.title} className="bg-white rounded-[2.5rem] p-8 md:p-10 shadow-xl">
                <h3 className="text-2xl font-bold text-blue-900 mb-5">{tech.title}</h3>
                <ul className="space-y-2.5">
                  {tech.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-gray-800 text-lg">
                      <span className="w-2 h-2 rounded-full bg-gray-800 mt-2.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
