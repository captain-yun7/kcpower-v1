# 케이씨파워 (KC Power)

전기설비 전문 제조업체 웹사이트

## 회사 소개

30년 전통의 변압기 외함 제조 전문업체입니다.
한국전력공사, LS일렉트릭, HD현대일렉트릭 등 대한민국 주요 전력 기업들이 신뢰하는 파트너입니다.

### 주요 사업 분야
- 변압기 외함 제조
- 수배전반 제작
- 특수 전기설비 맞춤 제작
- 전기설비 유지보수 및 A/S

### 주요 제품
- 밀폐형 외함 (옥외 설치용)
- 소음저감형 외함 (주거지역용)
- 터널용 특수 외함
- 수배전반

## 기술 스택

### Frontend & Backend
- **Next.js 15** (App Router, Turbopack)
- **TypeScript**
- **TailwindCSS**
- **React 19**

### Database & ORM
- **Neon PostgreSQL** - 서버리스 데이터베이스
- **Prisma** - ORM

### Authentication
- **NextAuth.js v5** (Auth.js)
- Google, Kakao, Naver 소셜 로그인

### File Storage
- **Vercel Blob** - 이미지 및 파일 업로드

### Payment
- **TossPayments** - 결제 시스템
- 카드, 가상계좌, 계좌이체 지원

### UI/UX
- **Framer Motion** - 애니메이션
- **React Hook Form** - 폼 관리
- **React Hot Toast** - 알림

## 주요 기능

### 회원 기능
- 소셜 로그인 (Google, Kakao, Naver)
- 디바이스 관리 (최대 3대)
- 문의하기 및 답변 확인
- 결제 내역 관리
- 세금계산서 발급 요청

### 관리자 기능
- 강의 관리 (생성, 수정, 삭제)
- 학생 관리
- 결제 관리 (가상계좌 승인)
- 문의 관리 및 답변
- 환불 처리
- 세금계산서 발급
- 통계 대시보드

### 콘텐츠 관리
- 제품 카탈로그
- 시공사례
- 공지사항
- 회사 소개

## 시작하기

### 환경 설정

1. 환경변수 설정
```bash
cp .env.example .env
```

2. 환경변수 편집 (.env)
```bash
# Database (Neon)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# OAuth (선택사항)
GOOGLE_CLIENT_ID="..."
KAKAO_CLIENT_ID="..."
NAVER_CLIENT_ID="..."

# Vercel Blob (파일 업로드용)
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_..."

# TossPayments
NEXT_PUBLIC_TOSS_CLIENT_KEY="test_ck_..."
TOSS_SECRET_KEY="test_sk_..."
```

### 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 데이터베이스 마이그레이션

```bash
# Prisma 마이그레이션 실행
npx prisma migrate dev

# Prisma Studio 실행 (DB GUI)
npx prisma studio
```

### 빌드

```bash
npm run build
```

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router
│   ├── api/             # API Routes
│   ├── admin/           # 관리자 페이지
│   ├── courses/         # 강의 페이지
│   ├── mypage/          # 마이페이지
│   └── ...
├── components/          # React 컴포넌트
├── lib/                 # 유틸리티 및 설정
│   ├── prisma.ts       # Prisma 클라이언트
│   ├── storage.ts      # Vercel Blob 헬퍼
│   └── ...
└── auth.ts             # NextAuth 설정

prisma/
└── schema.prisma       # 데이터베이스 스키마

public/
├── logo/               # 고객사 로고
└── ...
```

## 배포

### Vercel 배포

1. Vercel에 프로젝트 연결
2. 환경변수 설정
3. Vercel Blob Storage 생성
4. 배포

```bash
vercel deploy
```

## 라이선스

© 2025 케이씨파워. All rights reserved.

## 연락처

- 주소: 인천광역시 남동구
- 전화: [전화번호]
- 이메일: [이메일]
