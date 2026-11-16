import type { Locale } from '@/i18n/config';

type Localized = Record<Locale, string>;

// 회사 기본 정보 (연락처·주소 변경 시 이 파일만 수정)
export const company = {
  name: { ko: '케이씨파워', en: 'KC Power' } as Localized,
  legalName: { ko: '주식회사 케이씨파워', en: 'KC Power Co., Ltd.' } as Localized,
  ceo: { ko: '이영수', en: 'Lee Young-soo' } as Localized,
  phone: '032-816-8034',
  fax: '032-816-8035',
  email: 'peskorea@hanmail.net',
  businessNumber: '131-86-58057',
  employees: 35,
  hours: { ko: '평일 08:00 ~ 17:00', en: 'Mon–Fri 08:00–17:00' } as Localized,
  address: {
    ko: '인천광역시 남동구 능허대로 633',
    en: '633 Neungheo-daero, Namdong-gu, Incheon, Korea',
  } as Localized,
};

export interface Factory {
  id: number;
  name: Localized;
  address: Localized;
  lot: string;
  // 지도 검색에 쓰는 도로명 주소
  mapQuery: string;
  photo?: string;
}

export const factories: Factory[] = [
  {
    id: 1,
    name: { ko: '본사 (1공장)', en: 'Headquarters (Plant 1)' },
    address: company.address,
    lot: '138B 11LOT',
    mapQuery: '인천광역시 남동구 능허대로 633',
    photo: '/factories/factory-1.jpg',
  },
  {
    id: 2,
    name: { ko: '2공장', en: 'Plant 2' },
    address: {
      ko: '인천광역시 남동구 능허대로649번길 83',
      en: '83 Neungheo-daero 649beon-gil, Namdong-gu, Incheon, Korea',
    },
    lot: '129B 6LOT',
    mapQuery: '인천광역시 남동구 능허대로649번길 83',
    photo: '/factories/factory-2.jpg',
  },
  {
    id: 3,
    name: { ko: '3공장', en: 'Plant 3' },
    address: {
      ko: '인천광역시 남동구 청능대로 267',
      en: '267 Cheongneung-daero, Namdong-gu, Incheon, Korea',
    },
    lot: '68B 5LOT',
    mapQuery: '인천광역시 남동구 청능대로 267',
    photo: '/factories/factory-3.jpg',
  },
];
