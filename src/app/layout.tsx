import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | 케이씨파워',
    default: '케이씨파워 - 전기설비 전문 제조업체'
  },
  description: "30년 전통의 변압기 외함 제조 전문업체. 한전, LS일렉트릭, 현대일렉트릭이 신뢰하는 케이씨파워입니다.",
  keywords: ["변압기 외함", "전기설비", "수배전반", "케이씨파워", "한전", "밀폐형 외함", "소음저감형", "터널용 외함"],
  authors: [{ name: "케이씨파워" }],
  creator: "케이씨파워",
  publisher: "케이씨파워",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    title: '케이씨파워 - 전기설비 전문 제조업체',
    description: '30년 전통의 변압기 외함 제조 전문업체. 한전, LS일렉트릭, 현대일렉트릭이 신뢰하는 케이씨파워입니다.',
    url: '/',
    siteName: '케이씨파워',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/logo2.png',
        width: 1200,
        height: 630,
        alt: '케이씨파워 로고',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '케이씨파워 - 전기설비 전문 제조업체',
    description: '30년 전통의 변압기 외함 제조 전문업체. 한전, LS일렉트릭, 현대일렉트릭이 신뢰하는 케이씨파워입니다.',
    images: ['/logo2.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
