import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding KC Power database...');

  // 기존 데이터 삭제 (역순으로 삭제하여 외래키 제약 회피)
  console.log('🗑️  Clearing existing data...');
  await prisma.userDownload.deleteMany();
  await prisma.download.deleteMany();
  await prisma.downloadCategory.deleteMany();
  await prisma.caseProduct.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.news.deleteMany();
  await prisma.solutionProduct.deleteMany();
  await prisma.product.deleteMany();
  await prisma.solution.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleared existing data');

  // 1. 관리자 계정 생성
  const hashedPassword = await bcrypt.hash('admin123!', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@kcpower.com' },
    update: {},
    create: {
      email: 'admin@kcpower.com',
      name: '관리자',
      password: hashedPassword,
      role: 'ADMIN',
      company: '케이씨파워',
      position: '시스템 관리자',
    },
  });

  console.log('✅ Created admin user');

  // 2. 제품 데이터 생성
  const products = [
    {
      name: '밀폐형 변압기 외함',
      model: 'TR-1000M',
      category: '변압기외함',
      tags: ['밀폐형', '야외용', '방수'],
      description: '완벽한 밀폐 구조로 야외 설치 환경에서도 안정적인 성능을 보장하는 변압기 외함입니다. IP65 등급의 방진방수 성능을 제공합니다.',
      shortDesc: '야외 설치용 밀폐형 변압기 외함 (IP65)',
      capacity: '1000kVA',
      voltage: '22.9kV',
      dimensions: 'W2400 × D1800 × H2400mm',
      weight: '850kg',
      material: '스테인리스강 (STS304)',
      protection: 'IP65',
      thumbnailUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80',
      order: 1,
      isPublished: true,
    },
    {
      name: '소음저감형 변압기 외함',
      model: 'TR-1500S',
      category: '변압기외함',
      tags: ['소음저감형', '주거지역', '저소음'],
      description: '특수 흡음재와 이중 차폐 구조를 적용하여 변압기 운영 소음을 획기적으로 감소시킨 제품입니다. 주거지역 및 상업지역에 최적화되어 있습니다.',
      shortDesc: '주거지역 특화 소음저감형 외함 (소음 40dB 이하)',
      capacity: '1500kVA',
      voltage: '22.9kV',
      dimensions: 'W2800 × D2000 × H2600mm',
      weight: '1200kg',
      material: '아연도금강판 + 흡음재',
      protection: 'IP54',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
      order: 2,
      isPublished: true,
    },
    {
      name: '터널용 변압기 외함',
      model: 'TR-750T',
      category: '변압기외함',
      tags: ['터널용', '내화성', '소방'],
      description: '터널 내부 전기설비용으로 특수 설계된 내화형 변압기 외함입니다. 고온 환경 및 화재 발생 시에도 안전성을 확보합니다.',
      shortDesc: '터널 전기설비 전용 내화형 외함',
      capacity: '750kVA',
      voltage: '22.9kV',
      dimensions: 'W2200 × D1600 × H2200mm',
      weight: '720kg',
      material: '내화 아연도금강판',
      protection: 'IP54',
      thumbnailUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=80',
      order: 3,
      isPublished: true,
    },
    {
      name: '고압 수배전반',
      model: 'SW-2000H',
      category: '수배전반',
      tags: ['수배전반', '고압', '배전'],
      description: '22.9kV 고압 전력을 안전하게 수전, 변환, 배전하는 종합 수배전 설비입니다. 자동화된 제어 시스템으로 안정적인 전력 공급을 보장합니다.',
      shortDesc: '22.9kV 고압 수배전 종합 설비',
      capacity: '2000kVA',
      voltage: '22.9kV / 380V',
      dimensions: 'W3600 × D1200 × H2200mm',
      weight: '1800kg',
      material: '스테인리스강판',
      protection: 'IP42',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
      order: 4,
      isPublished: true,
    },
    {
      name: '저압 배전반',
      model: 'SW-500L',
      category: '수배전반',
      tags: ['배전반', '저압', '제어'],
      description: '380V 저압 전력 배전용 전기반으로 각종 전기 설비에 안정적인 전력을 공급합니다. 모듈형 설계로 확장이 용이합니다.',
      shortDesc: '380V 저압 배전반 (모듈형)',
      capacity: '500kVA',
      voltage: '380V',
      dimensions: 'W2400 × D800 × H2000mm',
      weight: '550kg',
      material: '아연도금강판',
      protection: 'IP42',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=80',
      order: 5,
      isPublished: true,
    },
    {
      name: 'PLC 제어반',
      model: 'CT-300P',
      category: '제어반',
      tags: ['제어반', 'PLC', '자동화'],
      description: 'PLC 기반 자동 제어 시스템으로 전기설비의 운영을 최적화합니다. 실시간 모니터링 및 원격 제어 기능을 제공합니다.',
      shortDesc: 'PLC 기반 전기설비 자동제어반',
      capacity: '300A',
      voltage: '380V',
      dimensions: 'W1800 × D600 × H2000mm',
      weight: '320kg',
      material: '스테인리스강판',
      protection: 'IP54',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&q=80',
      order: 6,
      isPublished: true,
    },
    {
      name: '철도용 변전설비',
      model: 'RW-3000',
      category: '특수외함',
      tags: ['철도', '변전', '고압'],
      description: '철도 전철화 시스템 전용 변전설비입니다. 한국철도 규격에 맞춰 설계되었으며 높은 신뢰성을 자랑합니다.',
      shortDesc: '철도 전철화 전용 변전설비',
      capacity: '3000kVA',
      voltage: '154kV / 25kV',
      dimensions: 'W4200 × D2400 × H2800mm',
      weight: '2500kg',
      material: '스테인리스강 (STS304)',
      protection: 'IP54',
      thumbnailUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80',
      order: 7,
      isPublished: true,
    },
    {
      name: '소형 변압기 외함',
      model: 'TR-300C',
      category: '변압기외함',
      tags: ['소형', '상업용', '실내'],
      description: '상업용 건물 및 소규모 시설에 적합한 소형 변압기 외함입니다. 컴팩트한 설계로 설치 공간을 최소화했습니다.',
      shortDesc: '상업용 소형 변압기 외함',
      capacity: '300kVA',
      voltage: '22.9kV',
      dimensions: 'W1800 × D1400 × H2000mm',
      weight: '420kg',
      material: '아연도금강판',
      protection: 'IP42',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092583537-20d51b3d4670?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092583537-20d51b3d4670?w=1200&q=80',
      order: 8,
      isPublished: true,
    },
    {
      name: '대용량 변압기 외함',
      model: 'TR-5000X',
      category: '변압기외함',
      tags: ['대용량', '산업용', '발전소'],
      description: '발전소 및 대규모 산업 단지용 대용량 변압기 외함입니다. 최고 수준의 내구성과 안전성을 제공합니다.',
      shortDesc: '발전소급 대용량 변압기 외함',
      capacity: '5000kVA',
      voltage: '154kV',
      dimensions: 'W5000 × D3000 × H3500mm',
      weight: '4200kg',
      material: '특수 스테인리스강',
      protection: 'IP65',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
      order: 9,
      isPublished: true,
    },
    {
      name: '지중 변압기 외함',
      model: 'TR-1200U',
      category: '변압기외함',
      tags: ['지중', '방수', '내부식'],
      description: '지중 설치용으로 특수 설계된 변압기 외함입니다. 완벽한 방수 및 방식 처리로 지하 환경에서도 장기간 안정적으로 운영됩니다.',
      shortDesc: '지중 설치용 방수 외함',
      capacity: '1200kVA',
      voltage: '22.9kV',
      dimensions: 'W2600 × D1900 × H2300mm',
      weight: '950kg',
      material: '특수 방식 처리 강판',
      protection: 'IP68',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=1200&q=80',
      order: 10,
      isPublished: true,
    },
    {
      name: '복합 전력제어반',
      model: 'CT-800M',
      category: '제어반',
      tags: ['제어반', '복합', '스마트'],
      description: '스마트 그리드 시스템과 연동 가능한 차세대 복합 전력제어반입니다. IoT 기반 원격 모니터링 및 제어가 가능합니다.',
      shortDesc: 'IoT 기반 스마트 전력제어반',
      capacity: '800A',
      voltage: '380V',
      dimensions: 'W2000 × D700 × H2100mm',
      weight: '480kg',
      material: '스테인리스강판',
      protection: 'IP54',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1f6f9ce?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1f6f9ce?w=1200&q=80',
      order: 11,
      isPublished: true,
    },
    {
      name: '비상발전기 연동반',
      model: 'CT-1500E',
      category: '제어반',
      tags: ['비상발전', '자동전환', 'UPS'],
      description: '정전 시 비상발전기와 자동으로 연동되는 전력제어반입니다. 무정전 전환(ATS) 기능으로 중요 시설의 전력 공급을 보장합니다.',
      shortDesc: '비상발전 자동전환 제어반 (ATS)',
      capacity: '1500A',
      voltage: '380V',
      dimensions: 'W2400 × D800 × H2200mm',
      weight: '620kg',
      material: '아연도금강판',
      protection: 'IP42',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=1200&q=80',
      order: 12,
      isPublished: true,
    },
  ];

  for (const productData of products) {
    await prisma.product.create({
      data: productData,
    });
  }

  console.log(`✅ Created ${products.length} products`);

  // 3. 공지사항 및 뉴스 데이터 생성
  const newsData = [
    {
      title: '2024년 상반기 납품 실적 우수 달성',
      category: 'NOTICE',
      content: '<p>케이씨파워가 2024년 상반기 우수한 납품 실적을 달성했습니다.</p><p>한국전력공사, LS일렉트릭 등 주요 고객사에 총 150대 이상의 변압기 외함을 성공적으로 납품했으며, 특히 철도 전철화 사업에서 높은 품질 평가를 받았습니다.</p><p>앞으로도 최고 품질의 제품과 서비스를 제공하기 위해 노력하겠습니다.</p>',
      excerpt: '2024년 상반기 150대 이상 납품, 철도 전철화 사업 우수 평가',
      thumbnailUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      author: '케이씨파워',
      isPinned: true,
      views: 1250,
      publishedAt: new Date('2024-07-15'),
    },
    {
      title: '신제품 출시: 차세대 소음저감형 변압기 외함',
      category: 'NOTICE',
      content: '<p>케이씨파워가 차세대 소음저감 기술을 적용한 신제품을 출시합니다.</p><p>특수 흡음재와 이중 차폐 구조를 적용하여 기존 제품 대비 소음을 30% 이상 감소시켰으며, 주거지역 및 상업지역 설치에 최적화되었습니다.</p><p>2024년 8월 1일부터 주문 접수를 시작합니다.</p>',
      excerpt: '소음 30% 감소, 주거지역 최적화 신제품 8월 출시',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      author: '케이씨파워',
      isPinned: true,
      views: 980,
      publishedAt: new Date('2024-07-20'),
    },
    {
      title: '추석 연휴 A/S 서비스 운영 안내',
      category: 'NOTICE',
      content: '<p>2024년 추석 연휴 기간 A/S 서비스 운영 일정을 안내드립니다.</p><ul><li>9월 14일(토) ~ 9월 18일(수): 정상 운영</li><li>긴급 출동 서비스: 24시간 운영</li><li>견적 문의: 온라인 접수 가능</li></ul><p>고객 여러분의 양해 부탁드립니다.</p>',
      excerpt: '추석 연휴 A/S 정상 운영, 긴급 출동 24시간 가능',
      thumbnailUrl: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80',
      author: '케이씨파워',
      isPinned: false,
      views: 650,
      publishedAt: new Date('2024-09-01'),
    },
    {
      title: 'ISO 9001:2015 품질경영시스템 인증 갱신',
      category: 'PRESS_RELEASE',
      content: '<p>케이씨파워가 ISO 9001:2015 품질경영시스템 인증을 성공적으로 갱신했습니다.</p><p>이번 인증 갱신은 당사의 품질 관리 체계와 지속적인 개선 노력을 국제적으로 인정받은 것입니다.</p><p>앞으로도 최고 수준의 품질 관리를 통해 고객 만족도를 높이겠습니다.</p>',
      excerpt: 'ISO 9001:2015 품질경영시스템 인증 갱신 완료',
      thumbnailUrl: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80',
      author: '케이씨파워',
      isPinned: false,
      views: 420,
      publishedAt: new Date('2024-06-10'),
    },
    {
      title: '2024 전력기기 전시회 참가 안내',
      category: 'EVENT',
      content: '<p>케이씨파워가 2024년 10월 개최되는 전력기기 전시회에 참가합니다.</p><p><strong>일시:</strong> 2024년 10월 15일 ~ 17일<br><strong>장소:</strong> 서울 코엑스 3층 D홀<br><strong>부스:</strong> D-215</p><p>신제품 전시 및 기술 상담이 진행되오니 많은 관심 부탁드립니다.</p>',
      excerpt: '10월 15-17일 코엑스 전력기기 전시회 참가',
      thumbnailUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
      author: '케이씨파워',
      isPinned: false,
      views: 780,
      publishedAt: new Date('2024-09-25'),
    },
    {
      title: '하절기 전기설비 점검 서비스 실시',
      category: 'NOTICE',
      content: '<p>무더운 여름철을 대비한 전기설비 무상 점검 서비스를 실시합니다.</p><p>변압기 외함 및 수배전반의 냉각 시스템, 절연 상태, 접지 시스템 등을 전문 기술진이 점검해 드립니다.</p><p>신청 기간: 2024년 6월 1일 ~ 7월 31일</p>',
      excerpt: '여름철 전기설비 무상 점검 서비스 (6-7월)',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092918484-8313e1f6f9ce?w=800&q=80',
      author: '케이씨파워',
      isPinned: false,
      views: 520,
      publishedAt: new Date('2024-05-25'),
    },
    {
      title: '제3공장 증축 완료 및 생산능력 확대',
      category: 'PRESS_RELEASE',
      content: '<p>케이씨파워 제3공장 증축 공사가 완료되어 생산능력이 30% 증가했습니다.</p><p>신규 도입한 최첨단 용접 로봇과 자동화 설비로 생산 효율성이 크게 향상되었으며, 납기 단축과 품질 향상이 기대됩니다.</p><p>증축된 공장은 2024년 8월부터 정상 가동에 들어갑니다.</p>',
      excerpt: '제3공장 증축 완료, 생산능력 30% 증대',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      author: '케이씨파워',
      isPinned: false,
      views: 890,
      publishedAt: new Date('2024-07-30'),
    },
    {
      title: '친환경 제품 개발 및 탄소중립 실천',
      category: 'BLOG',
      content: '<p>케이씨파워는 친환경 제품 개발과 탄소중립 실천에 앞장서고 있습니다.</p><p>재활용 가능한 소재 사용 비율을 80% 이상으로 높였으며, 공장 전력의 40%를 태양광 에너지로 충당하고 있습니다.</p><p>2030년까지 탄소 배출량 50% 감축을 목표로 지속 가능한 경영을 실천하겠습니다.</p>',
      excerpt: '재활용 소재 80%, 태양광 에너지 40% 활용',
      thumbnailUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&q=80',
      author: '케이씨파워',
      isPinned: false,
      views: 340,
      publishedAt: new Date('2024-06-20'),
    },
  ];

  for (const news of newsData) {
    await prisma.news.create({
      data: news,
    });
  }

  console.log(`✅ Created ${newsData.length} news items`);

  // 4. 시공사례 데이터 생성
  const caseStudies = [
    {
      title: '한국전력공사 광주 변전소 변압기 외함 납품',
      client: '한국전력공사',
      location: '광주광역시 서구',
      projectType: '변전소',
      year: 2024,
      description: '광주 서구 신규 변전소 건설 프로젝트에 밀폐형 변압기 외함 8대를 성공적으로 납품했습니다.',
      content: '<h2>프로젝트 개요</h2><p>한국전력공사 광주 변전소 신축 공사에 1000kVA급 밀폐형 변압기 외함 8대를 납품하는 프로젝트였습니다.</p><h2>주요 특징</h2><ul><li>IP65 등급 완벽 밀폐 구조</li><li>스테인리스강 (STS304) 적용으로 내구성 극대화</li><li>야외 설치 환경 최적화</li></ul><h2>성과</h2><p>2024년 3월 납품 완료 후 현재까지 무고장 운영 중이며, 발주처로부터 우수한 품질 평가를 받았습니다.</p>',
      challenge: '야외 설치 환경에서 장기간 안정적으로 운영 가능한 높은 내구성이 요구되었습니다.',
      solution: 'IP65 등급 밀폐 구조와 STS304 스테인리스강 적용으로 완벽한 방진방수 성능을 구현했습니다.',
      result: '2024년 3월 납품 완료 후 6개월간 무고장 운영, 발주처 품질평가 A등급 획득',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
      tags: ['밀폐형', '변전소', '한국전력'],
      isPinned: true,
      views: 1450,
      order: 1,
      isPublished: true,
    },
    {
      title: 'LS일렉트릭 천안공장 수배전반 설치',
      client: 'LS일렉트릭',
      location: '충청남도 천안시',
      projectType: '산업단지',
      year: 2024,
      description: 'LS일렉트릭 천안공장 증축 프로젝트에 고압 수배전반 시스템을 공급 및 설치했습니다.',
      content: '<h2>프로젝트 개요</h2><p>LS일렉트릭 천안공장 증축에 따른 전력 인프라 확충 프로젝트로, 2000kVA급 고압 수배전반 시스템을 공급했습니다.</p><h2>공급 제품</h2><ul><li>고압 수배전반 (SW-2000H) 4세트</li><li>저압 배전반 (SW-500L) 6세트</li><li>PLC 제어반 (CT-300P) 2세트</li></ul><h2>성과</h2><p>공사 기간 단축 및 안정적인 전력 공급 시스템 구축으로 고객사로부터 높은 만족도를 얻었습니다.</p>',
      challenge: '짧은 공사 기간 내에 대규모 전력 설비를 설치하고 안정성을 확보해야 했습니다.',
      solution: '모듈형 설계로 현장 조립 시간을 단축하고, 사전 시운전으로 품질을 검증했습니다.',
      result: '예정 공기 대비 7일 단축 완공, 시운전 일회 성공',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200&q=80',
      tags: ['수배전반', '산업단지', 'LS일렉트릭'],
      isPinned: true,
      views: 1230,
      order: 2,
      isPublished: true,
    },
    {
      title: '서울 지하철 9호선 연장 구간 철도 변전설비',
      client: '서울교통공사',
      location: '서울특별시 강서구',
      projectType: '철도',
      year: 2023,
      description: '서울 지하철 9호선 연장 구간에 철도 전철화 변전설비 6개소를 납품했습니다.',
      content: '<h2>프로젝트 개요</h2><p>서울 지하철 9호선 4단계 연장 구간 전철화 사업에 철도 전용 변전설비를 공급하는 대형 프로젝트였습니다.</p><h2>공급 내역</h2><ul><li>철도용 변전설비 (RW-3000) 6개소</li><li>154kV/25kV 전압 변환</li><li>한국철도 규격 KRS 준수</li></ul><h2>성과</h2><p>2023년 12월 준공 후 현재까지 안정적으로 운영 중이며, 서울교통공사로부터 우수 협력업체로 선정되었습니다.</p>',
      challenge: '한국철도 규격(KRS) 준수와 높은 신뢰성이 요구되는 철도 전용 설비를 공급해야 했습니다.',
      solution: '철도 전문 엔지니어링팀 구성 및 KRS 규격 완벽 준수, 3중 안전장치 적용',
      result: '2023년 12월 준공, 서울교통공사 우수 협력업체 선정',
      thumbnailUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1200&q=80',
      tags: ['철도', '지하철', '서울교통공사'],
      isPinned: true,
      views: 1680,
      order: 3,
      isPublished: true,
    },
    {
      title: '현대일렉트릭 울산 연구소 전력설비',
      client: '현대일렉트릭',
      location: '울산광역시 남구',
      projectType: '산업단지',
      year: 2024,
      description: '현대일렉트릭 울산 연구소 신축 공사에 종합 전력설비를 공급했습니다.',
      content: '<h2>프로젝트 개요</h2><p>현대일렉트릭 울산 연구소 신축에 따른 전력 인프라 구축 프로젝트로, 수배전반부터 제어반까지 종합 솔루션을 제공했습니다.</p><h2>공급 제품</h2><ul><li>고압 수배전반 3세트</li><li>저압 배전반 8세트</li><li>복합 전력제어반 4세트</li><li>비상발전기 연동반 1세트</li></ul>',
      challenge: '연구소 특성상 무정전 전력 공급 시스템과 스마트 전력 관리가 필요했습니다.',
      solution: 'UPS 시스템과 비상발전기 자동전환(ATS) 기능, IoT 기반 원격 모니터링 시스템 구축',
      result: '무정전 전환 시스템 구축 완료, 스마트 전력 관리 시스템 도입',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=1200&q=80',
      tags: ['수배전반', '제어반', '현대일렉트릭'],
      isPinned: false,
      views: 890,
      order: 4,
      isPublished: true,
    },
    {
      title: '산일전기 부산 신항 터널 전기설비',
      client: '산일전기',
      location: '부산광역시 강서구',
      projectType: '터널',
      year: 2023,
      description: '부산 신항 해저터널 전기설비 공사에 터널용 변압기 외함을 납품했습니다.',
      content: '<h2>프로젝트 개요</h2><p>부산 신항 해저터널 건설 프로젝트의 전기설비 공사로, 터널 내부 환경에 최적화된 내화형 변압기 외함을 공급했습니다.</p><h2>특수 사양</h2><ul><li>내화 등급 강화 (고온 환경 대응)</li><li>염분 부식 방지 특수 코팅</li><li>IP54 방진방수 등급</li></ul>',
      challenge: '해저터널 특성상 고온, 고습, 염분 환경에서도 안정적으로 작동해야 했습니다.',
      solution: '내화 아연도금강판 사용 및 특수 방식 코팅 적용, 이중 밀폐 구조 설계',
      result: '2023년 9월 납품 완료, 1년간 무고장 운영',
      thumbnailUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=1200&q=80',
      tags: ['터널용', '내화성', '산일전기'],
      isPinned: false,
      views: 720,
      order: 5,
      isPublished: true,
    },
    {
      title: '세종시 정부청사 수배전 설비 교체',
      client: '한국전력공사',
      location: '세종특별자치시',
      projectType: '변전소',
      year: 2024,
      description: '세종시 정부청사의 노후 수배전 설비를 최신 스마트 시스템으로 교체했습니다.',
      content: '<h2>프로젝트 개요</h2><p>세종시 정부청사 15개 동의 노후 수배전 설비를 차세대 스마트 전력 관리 시스템으로 전면 교체하는 프로젝트였습니다.</p><h2>교체 내역</h2><ul><li>고압 수배전반 12세트</li><li>복합 전력제어반 8세트</li><li>IoT 통합 모니터링 시스템</li></ul>',
      challenge: '정부청사 운영 중 무정전 설비 교체 작업이 필요했습니다.',
      solution: '단계별 교체 작업 및 임시 전력 공급 시스템 구축, 야간 작업으로 업무 지장 최소화',
      result: '3개월간 무정전 교체 완료, 전력 효율 25% 개선',
      thumbnailUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=1200&q=80',
      tags: ['수배전반', '스마트', '정부청사'],
      isPinned: false,
      views: 650,
      order: 6,
      isPublished: true,
    },
    {
      title: '인천공항 제2여객터미널 전력설비',
      client: '인천국제공항공사',
      location: '인천광역시 중구',
      projectType: '산업단지',
      year: 2023,
      description: '인천공항 제2여객터미널 확장 공사에 대용량 전력설비를 공급했습니다.',
      content: '<h2>프로젝트 개요</h2><p>인천공항 제2여객터미널 확장 공사의 전력 인프라 구축 프로젝트로, 대용량 수배전 시스템을 공급했습니다.</p><h2>공급 규모</h2><ul><li>대용량 변압기 외함 (TR-5000X) 6대</li><li>고압 수배전반 10세트</li><li>비상발전 연동 시스템</li></ul>',
      challenge: '24시간 운영 중인 공항에서 대규모 전력설비를 설치해야 했습니다.',
      solution: '야간 및 주말 집중 작업, 모듈형 사전 조립으로 현장 작업 시간 최소화',
      result: '2023년 6월 준공, 공항 전력 안정성 대폭 향상',
      thumbnailUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80',
      tags: ['대용량', '공항', '비상발전'],
      isPinned: false,
      views: 1120,
      order: 7,
      isPublished: true,
    },
    {
      title: '판교 테크노밸리 데이터센터 전력설비',
      client: 'KT',
      location: '경기도 성남시 분당구',
      projectType: '산업단지',
      year: 2024,
      description: 'KT 판교 데이터센터 신축 공사에 무정전 전력 공급 시스템을 구축했습니다.',
      content: '<h2>프로젝트 개요</h2><p>KT 판교 데이터센터 신축 프로젝트의 전력 인프라로, 무정전 전력 공급과 이중화 시스템을 구축했습니다.</p><h2>시스템 구성</h2><ul><li>고압 수배전반 이중화 시스템</li><li>UPS 및 비상발전 연동</li><li>실시간 전력 모니터링</li></ul>',
      challenge: '데이터센터 특성상 1초의 정전도 허용되지 않는 완벽한 무정전 시스템이 필요했습니다.',
      solution: '완전 이중화 전력 공급 시스템과 3단계 백업 전원 구축 (UPS, 발전기, 외부 예비선)',
      result: '무정전 전력 공급 시스템 구축, Tier 3 데이터센터 인증 획득',
      thumbnailUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80',
      tags: ['데이터센터', 'UPS', '이중화'],
      isPinned: false,
      views: 980,
      order: 8,
      isPublished: true,
    },
    {
      title: '포항 제철소 변전설비 현대화',
      client: '포스코',
      location: '경상북도 포항시',
      projectType: '산업단지',
      year: 2023,
      description: '포항 제철소의 노후 변전설비를 최신 설비로 교체하는 대규모 프로젝트를 수행했습니다.',
      content: '<h2>프로젝트 개요</h2><p>포항 제철소 30년 이상 노후 변전설비를 최신 스마트 시스템으로 교체하는 대규모 현대화 프로젝트였습니다.</p><h2>교체 규모</h2><ul><li>대용량 변압기 외함 20대</li><li>고압 수배전반 25세트</li><li>스마트 전력관리 시스템</li></ul>',
      challenge: '제철소 가동을 중단하지 않고 설비를 교체해야 하는 어려움이 있었습니다.',
      solution: '구역별 순차 교체 방식 및 임시 전력 공급 라인 구축, 6개월 단계적 교체 완료',
      result: '무가동 설비 교체 완료, 전력 효율 35% 개선, 유지보수 비용 40% 절감',
      thumbnailUrl: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80',
      tags: ['대용량', '산업단지', '현대화'],
      isPinned: false,
      views: 1340,
      order: 9,
      isPublished: true,
    },
    {
      title: '대전 도시철도 2호선 변전설비',
      client: '대전광역시 도시철도공사',
      location: '대전광역시',
      projectType: '철도',
      year: 2024,
      description: '대전 도시철도 2호선 건설 사업에 철도 변전설비를 공급했습니다.',
      content: '<h2>프로젝트 개요</h2><p>대전 도시철도 2호선 전철화 사업에 철도 전용 변전설비 12개소를 공급하는 프로젝트였습니다.</p><h2>공급 내역</h2><ul><li>철도용 변전설비 12개소</li><li>154kV/25kV 전압 변환</li><li>원격 모니터링 시스템</li></ul>',
      challenge: '도심 지하 구간 설치로 인한 공간 제약과 소음 규제를 충족해야 했습니다.',
      solution: '소형화 설계 및 소음저감 구조 적용, 야간 작업으로 도심 소음 영향 최소화',
      result: '2024년 5월 납품 완료, 대전시로부터 우수 시공사 표창',
      thumbnailUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1200&q=80',
      tags: ['철도', '도시철도', '소음저감형'],
      isPinned: false,
      views: 760,
      order: 10,
      isPublished: true,
    },
  ];

  for (const caseData of caseStudies) {
    await prisma.caseStudy.create({
      data: caseData,
    });
  }

  console.log(`✅ Created ${caseStudies.length} case studies`);

  // 5. 다운로드 카테고리 및 파일 생성
  const categories = [
    { name: '제품 카탈로그', order: 1 },
    { name: '기술 사양서', order: 2 },
    { name: '인증서', order: 3 },
    { name: 'CAD 도면', order: 4 },
    { name: '사용자 매뉴얼', order: 5 },
  ];

  for (const category of categories) {
    const createdCategory = await prisma.downloadCategory.create({
      data: category,
    });

    // 각 카테고리별 샘플 파일 생성
    if (category.name === '제품 카탈로그') {
      await prisma.download.createMany({
        data: [
          {
            categoryId: createdCategory.id,
            title: '2024 변압기 외함 종합 카탈로그',
            description: '케이씨파워 변압기 외함 전 제품군 소개 카탈로그',
            fileName: '2024_transformer_catalog.pdf',
            fileUrl: 'https://example.com/downloads/2024_transformer_catalog.pdf',
            fileSize: 15360000, // 15MB
            fileType: 'pdf',
            version: 'v2024.1',
            requireAuth: false,
          },
          {
            categoryId: createdCategory.id,
            title: '수배전반 제품 카탈로그',
            description: '고압/저압 수배전반 제품 라인업',
            fileName: 'switchgear_catalog.pdf',
            fileUrl: 'https://example.com/downloads/switchgear_catalog.pdf',
            fileSize: 12288000, // 12MB
            fileType: 'pdf',
            version: 'v2024.1',
            requireAuth: false,
          },
        ],
      });
    } else if (category.name === '기술 사양서') {
      await prisma.download.createMany({
        data: [
          {
            categoryId: createdCategory.id,
            title: 'TR-1000M 기술 사양서',
            description: '밀폐형 변압기 외함 TR-1000M 상세 기술 사양',
            fileName: 'TR-1000M_spec.pdf',
            fileUrl: 'https://example.com/downloads/TR-1000M_spec.pdf',
            fileSize: 2048000, // 2MB
            fileType: 'pdf',
            version: 'v1.2',
            requireAuth: true,
          },
          {
            categoryId: createdCategory.id,
            title: 'SW-2000H 기술 사양서',
            description: '고압 수배전반 SW-2000H 상세 기술 사양',
            fileName: 'SW-2000H_spec.pdf',
            fileUrl: 'https://example.com/downloads/SW-2000H_spec.pdf',
            fileSize: 1843200, // 1.8MB
            fileType: 'pdf',
            version: 'v1.0',
            requireAuth: true,
          },
        ],
      });
    } else if (category.name === '인증서') {
      await prisma.download.createMany({
        data: [
          {
            categoryId: createdCategory.id,
            title: 'ISO 9001:2015 품질경영시스템 인증서',
            description: 'ISO 9001:2015 인증서 (2024년 갱신)',
            fileName: 'ISO9001_2024.pdf',
            fileUrl: 'https://example.com/downloads/ISO9001_2024.pdf',
            fileSize: 512000, // 500KB
            fileType: 'pdf',
            requireAuth: false,
          },
          {
            categoryId: createdCategory.id,
            title: 'KC 인증서',
            description: '전기용품 안전인증 (KC) 인증서',
            fileName: 'KC_certification.pdf',
            fileUrl: 'https://example.com/downloads/KC_certification.pdf',
            fileSize: 614400, // 600KB
            fileType: 'pdf',
            requireAuth: false,
          },
        ],
      });
    } else if (category.name === 'CAD 도면') {
      await prisma.download.createMany({
        data: [
          {
            categoryId: createdCategory.id,
            title: 'TR-1000M CAD 도면',
            description: 'AutoCAD 2024 형식 도면 파일',
            fileName: 'TR-1000M.dwg',
            fileUrl: 'https://example.com/downloads/TR-1000M.dwg',
            fileSize: 3145728, // 3MB
            fileType: 'dwg',
            version: 'v1.2',
            requireAuth: true,
          },
          {
            categoryId: createdCategory.id,
            title: 'SW-2000H CAD 도면',
            description: 'AutoCAD 2024 형식 도면 파일',
            fileName: 'SW-2000H.dwg',
            fileUrl: 'https://example.com/downloads/SW-2000H.dwg',
            fileSize: 2621440, // 2.5MB
            fileType: 'dwg',
            version: 'v1.0',
            requireAuth: true,
          },
        ],
      });
    } else if (category.name === '사용자 매뉴얼') {
      await prisma.download.createMany({
        data: [
          {
            categoryId: createdCategory.id,
            title: '변압기 외함 설치 및 유지보수 매뉴얼',
            description: '변압기 외함 설치, 운영, 유지보수 종합 가이드',
            fileName: 'transformer_manual.pdf',
            fileUrl: 'https://example.com/downloads/transformer_manual.pdf',
            fileSize: 8388608, // 8MB
            fileType: 'pdf',
            version: 'v3.1',
            requireAuth: false,
          },
          {
            categoryId: createdCategory.id,
            title: '수배전반 운영 매뉴얼',
            description: '수배전반 안전 운영 및 점검 매뉴얼',
            fileName: 'switchgear_manual.pdf',
            fileUrl: 'https://example.com/downloads/switchgear_manual.pdf',
            fileSize: 6291456, // 6MB
            fileType: 'pdf',
            version: 'v2.5',
            requireAuth: false,
          },
        ],
      });
    }
  }

  console.log(`✅ Created download categories and files`);

  console.log('\n🎉 KC Power database seeding completed!');
  console.log(`📊 Summary:`);
  console.log(`  - ${products.length} products`);
  console.log(`  - ${newsData.length} news/notices`);
  console.log(`  - ${caseStudies.length} case studies`);
  console.log(`  - ${categories.length} download categories with files`);
  console.log(`\n📝 Admin credentials:`);
  console.log(`  Email: admin@kcpower.com`);
  console.log(`  Password: admin123!`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
