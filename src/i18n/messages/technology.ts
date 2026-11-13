export const messages = {
  ko: {
    heroTitle: 'KCP 기술',
    heroDesc: '변압기 외함의 문제를 근본부터 해결하는 케이씨파워만의 기술력',
    factoryVideoTitle: '3공장 동영상',
    videoPending: '영상 준비 중입니다',
    problemsTitle: '기존 변압기반의 문제점',
    problems: [
      { title: '분진', desc: '노후화로 인한 분진, 화재 발생의 요인' },
      { title: '습기', desc: '온도차이로 인한 습기, 변압기 소손 원인' },
      { title: '침수', desc: '이상 기후로 인한 폭우, 변압기반의 침수 우려' },
      { title: '부식', desc: '외함의 부식 발생, 변압기반 수명 단축' },
    ],
    solutionsTitle: 'KCP의 해결 기술',
    technologies: [
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
    ],
  },
  en: {
    heroTitle: 'KCP Technology',
    heroDesc: "KC Power's proprietary technology solves transformer enclosure problems at the root",
    factoryVideoTitle: 'Plant 3 Video',
    videoPending: 'Video coming soon',
    problemsTitle: 'Problems with Conventional Transformer Panels',
    problems: [
      { title: 'Dust', desc: 'Dust buildup from aging equipment, a leading cause of fires' },
      { title: 'Moisture', desc: 'Moisture from temperature differences, a cause of transformer burnout' },
      { title: 'Flooding', desc: 'Heavy rain from extreme weather puts transformer panels at risk of flooding' },
      { title: 'Corrosion', desc: 'Enclosure corrosion shortens the service life of transformer panels' },
    ],
    solutionsTitle: "KCP's Solutions",
    technologies: [
      {
        title: 'Heat Dissipation System',
        points: [
          'Cooling with heat sinks and fans',
          'Lower transformer losses and reduced carbon emissions',
          'Helps reduce social and economic losses',
        ],
      },
      {
        title: 'Anti-Condensation System',
        points: [
          'Uses heat conduction and radiant energy',
          'Blocks external dust and moisture',
          'Prevents condensation through humidity control',
        ],
      },
      {
        title: 'Full Separation and Sealing',
        points: [
          'Keeps out foreign matter and other external hazards',
          'Minimizes maintenance and extends service life',
          'Contributes to high transformer efficiency',
        ],
      },
      {
        title: 'Improved Coating',
        points: [
          'Pretreatment process and double coating',
          'Cleaner surfaces and stronger adhesion',
          'Resistance to corrosion and weather, with lasting durability',
        ],
      },
    ],
  },
} as const;
