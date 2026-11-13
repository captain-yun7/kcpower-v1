import type { Locale } from '@/i18n/config';

const labels = {
  ko: {
    title: '케이씨파워 공장 약도',
    plant1: '본사 1공장',
    plant2: '2공장',
    plant3: '3공장',
    station: '남동인더스파크역',
    park: '공원',
    districtOffice: '연수구청',
    ic: '남동 I.C',
    squareOne: '스퀘어원',
    dongchun: '동춘역(송도)',
    cheonil: '천일식품',
    reservoir: '유수지',
    pipe: '국제파이프',
    dongmak: '동막역',
    gojan: '고잔사거리',
    aam: '아암대로',
    songdo: '송도신도시',
  },
  en: {
    title: 'Sketch map of KC Power plants',
    plant1: 'HQ · Plant 1',
    plant2: 'Plant 2',
    plant3: 'Plant 3',
    station: 'Namdong Induspark Stn.',
    park: 'Park',
    districtOffice: 'Yeonsu-gu Office',
    ic: 'Namdong IC',
    squareOne: 'Square One',
    dongchun: 'Dongchun Stn.',
    cheonil: 'Cheonil Foods',
    reservoir: 'Reservoir',
    pipe: 'Kukje Pipe',
    dongmak: 'Dongmak Stn.',
    gojan: 'Gojan Jct.',
    aam: 'Aam-daero',
    songdo: 'Songdo',
  },
};

const ROAD = '#a9cdf5';
const ROAD_MAIN = '#8dbcf0';

function Plant({ x, y, label, width }: { x: number; y: number; label: string; width: number }) {
  return (
    <g>
      <rect x={x - width / 2} y={y - 50} width={width} height={24} rx={4} fill="#005eb8" />
      <path d={`M${x - 6} ${y - 27} L${x + 6} ${y - 27} L${x} ${y - 19} Z`} fill="#005eb8" />
      <text x={x} y={y - 33} textAnchor="middle" fontSize={13} fontWeight={700} fill="#fff">
        {label}
      </text>
      <rect x={x - 8} y={y - 16} width={16} height={16} rx={2} fill="#f97316" />
      <path d={`M${x - 4} ${y - 12}h3v3h-3zM${x + 1} ${y - 12}h3v3h-3zM${x - 4} ${y - 7}h3v3h-3zM${x + 1} ${y - 7}h3v3h-3z`} fill="#fff" />
    </g>
  );
}

function Arrow({ x, y, direction }: { x: number; y: number; direction: 'left' | 'up' | 'down' }) {
  const rotation = { left: 0, up: 90, down: -90 }[direction];
  return (
    <path
      d="M-7 0 L0 -5 L0 -2 L7 -2 L7 2 L0 2 L0 5 Z"
      fill="#1e2847"
      transform={`translate(${x} ${y}) rotate(${rotation})`}
    />
  );
}

export default function LocationSketchMap({ locale }: { locale: Locale }) {
  const t = labels[locale];
  const wide = locale === 'en';

  return (
    <svg viewBox="0 0 440 440" role="img" aria-label={t.title} className="w-full h-auto">
      <rect width="440" height="440" rx="16" fill="#f8fafc" />

      {/* 도로 */}
      <g stroke={ROAD} strokeWidth={5} strokeLinecap="round" fill="none">
        <path d="M70 120 H350" />
        <path d="M70 208 H350" />
        <path d="M185 242 H350" />
        <path d="M185 274 H350" />
        <path d="M70 306 H350" />
        <path d="M185 332 H285" />
        <path d="M220 24 V78" />
        <path d="M285 78 V362" />
        <path d="M185 208 V362" />
      </g>
      <g stroke={ROAD_MAIN} strokeWidth={9} strokeLinecap="round" fill="none">
        <path d="M30 24 H410" />
        <path d="M30 78 H410" />
        <path d="M30 166 H410" />
        <path d="M30 362 H410" />
        <path d="M30 396 H410" />
        <path d="M70 24 V420" />
        <path d="M350 40 V420" />
      </g>

      {/* 주변 지형지물 */}
      <g fontSize={11} fill="#475569">
        <circle cx={205} cy={24} r={4} fill="#a16207" />
        <text x={214} y={41}>{t.station}</text>
        <circle cx={52} cy={50} r={4} fill="#84cc16" />
        <text x={30} y={66} fontSize={10}>{t.park}</text>
        <circle cx={40} cy={106} r={4} fill="#a16207" />
        <text x={12} y={122} fontSize={9}>{t.squareOne}</text>
        <circle cx={180} cy={176} r={4} fill="#a16207" />
        <text x={189} y={180}>{t.cheonil}</text>
        <circle cx={150} cy={254} r={4} fill="#84cc16" />
        <text x={138} y={271} fontSize={10}>{t.park}</text>
        <circle cx={372} cy={348} r={4} fill="#a16207" />
        <text x={424} y={338} textAnchor="end" fontSize={10}>{t.pipe}</text>
        <text x={382} y={250} fontSize={10} fill="#2563eb" transform="rotate(90 382 250)" textAnchor="middle">{t.reservoir}</text>
        <text x={235} y={381} fontSize={10} fill="#2563eb" textAnchor="middle">{t.reservoir}</text>
        <text x={235} y={413} textAnchor="middle">{t.aam}</text>
      </g>

      {/* 방면 표기 */}
      <g fontSize={12} fontWeight={700} fill="#1e2847">
        <Arrow x={40} y={78} direction="left" />
        <text x={80} y={97}>{t.districtOffice}</text>
        <Arrow x={350} y={58} direction="up" />
        <text x={342} y={97} textAnchor="end">{t.ic}</text>
        <Arrow x={40} y={166} direction="left" />
        <text x={80} y={185}>{t.dongchun}</text>
        <Arrow x={40} y={362} direction="left" />
        <text x={80} y={350}>{t.dongmak}</text>
        <text x={342} y={350} textAnchor="end">{t.gojan}</text>
        <Arrow x={350} y={418} direction="down" />
        <text x={338} y={424} textAnchor="end">{t.songdo}</text>
      </g>

      {/* 공장 위치 */}
      <Plant x={125} y={72} label={t.plant3} width={wide ? 62 : 56} />
      <Plant x={270} y={268} label={t.plant2} width={wide ? 62 : 56} />
      <Plant x={232} y={356} label={t.plant1} width={wide ? 96 : 88} />
    </svg>
  );
}
