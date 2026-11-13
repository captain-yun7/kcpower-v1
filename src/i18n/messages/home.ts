export const messages = {
  ko: {
    slides: [
      {
        title: '30년 신뢰,\n최고의 전기설비 솔루션',
        subtitle: '1993년부터 쌓아온 기술력과 신뢰로 대한민국 전력 인프라를 책임집니다',
        ctaText: '케이씨파워 제품 둘러보기',
      },
      {
        title: '한전이 선택한\n믿을 수 있는 파트너',
        subtitle: '한국전력공사 우수협력업체로 선정된 검증된 품질',
        ctaText: '시공사례 보기',
      },
      {
        title: '3개 공장,\n신속한 생산 체계',
        subtitle: '대량 주문부터 긴급 납품까지 빠르게 대응합니다',
        ctaText: '회사소개 보기',
      },
      {
        title: '특수 환경 대응,\n맞춤형 솔루션',
        subtitle: '터널용, 침수형, 소음저감형 등 현장에 최적화된 제품',
        ctaText: '견적 문의하기',
      },
    ],
    bannerCta: '자세히 보기',
    goToSlide: (n: number) => `슬라이드 ${n}로 이동`,
    prevSlide: '이전 슬라이드',
    nextSlide: '다음 슬라이드',
    quickQuote: '견적 문의',
    quickLocation: '오시는 길',
    quickDownloads: '자료 다운로드',
    videoTitle: '회사소개영상',
    statsTitle: '대한민국 전기설비의 신뢰할 수 있는 파트너',
    statsSubtitle: '30년간 쌓아온 기술력과 노하우로 안전하고 효율적인 전기설비 솔루션을 제공합니다',
    stats: [
      { value: '30+', label: '년 역사', note: '1993년 설립' },
      { value: '3', label: '개 공장', note: '인천 남동구' },
      { value: '10+', label: '주요 고객사', note: '철도, 한전' },
    ],
    values: [
      { title: '안전', desc: '모든 제품과 서비스에서 안전을 최우선으로 합니다' },
      { title: '신뢰', desc: '30년간 쌓아온 기술력과 실적으로 신뢰를 증명합니다' },
      { title: '혁신', desc: '끊임없는 R&D로 업계 최초의 혁신 제품을 개발합니다' },
    ],
  },
  en: {
    slides: [
      {
        title: '30 Years of Trust,\nProven Power Solutions',
        subtitle: 'Supporting Korea’s power infrastructure with engineering expertise built since 1993',
        ctaText: 'Explore our products',
      },
      {
        title: 'A Partner\nKEPCO Relies On',
        subtitle: 'Proven quality, recognized as an outstanding KEPCO supplier',
        ctaText: 'View project references',
      },
      {
        title: 'Three Plants,\nFast Production',
        subtitle: 'From volume orders to urgent deliveries, we respond quickly',
        ctaText: 'About KC Power',
      },
      {
        title: 'Built for\nDemanding Sites',
        subtitle: 'Tunnel, flood-resistant and low-noise enclosures tailored to each site',
        ctaText: 'Request a quote',
      },
    ],
    bannerCta: 'Learn more',
    goToSlide: (n: number) => `Go to slide ${n}`,
    prevSlide: 'Previous slide',
    nextSlide: 'Next slide',
    quickQuote: 'Request a Quote',
    quickLocation: 'Location',
    quickDownloads: 'Downloads',
    videoTitle: 'Company Introduction',
    statsTitle: 'A Trusted Partner for Korea’s Electrical Infrastructure',
    statsSubtitle: 'Thirty years of engineering know-how, delivering safe and efficient electrical equipment',
    stats: [
      { value: '30+', label: 'Years in Business', note: 'Founded in 1993' },
      { value: '3', label: 'Plants', note: 'Namdong-gu, Incheon' },
      { value: '10+', label: 'Major Clients', note: 'Railway operators, KEPCO' },
    ],
    values: [
      { title: 'Safety', desc: 'Safety comes first in every product and service' },
      { title: 'Trust', desc: 'Thirty years of expertise and a proven track record' },
      { title: 'Innovation', desc: 'Continuous R&D behind industry-first products' },
    ],
  },
} as const;
