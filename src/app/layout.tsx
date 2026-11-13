import type { Metadata } from "next";
import Providers from "@/components/Providers";
import { getLocale } from "@/i18n/server";
import "./globals.css";

const siteMeta = {
  ko: {
    name: '케이씨파워',
    title: '케이씨파워 - 전기설비 전문 제조업체',
    description: '30년 전통의 변압기 외함 제조 전문업체. 한전, 철도 등 주요 고객사가 신뢰하는 케이씨파워입니다.',
    keywords: ['변압기 외함', '전기설비', '수배전반', '케이씨파워', '한전', '밀폐형 외함', '소음저감형', '터널용 외함'],
    logoAlt: '케이씨파워 로고',
    ogLocale: 'ko_KR',
  },
  en: {
    name: 'KC Power',
    title: 'KC Power - Transformer Enclosure & Switchgear Manufacturer',
    description: 'KC Power has manufactured transformer enclosures and electrical equipment for over 30 years, trusted by KEPCO and Korea\'s railway operators.',
    keywords: ['transformer enclosure', 'switchgear', 'electrical equipment', 'KC Power', 'KEPCO', 'sealed enclosure', 'low-noise enclosure'],
    logoAlt: 'KC Power logo',
    ogLocale: 'en_US',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const meta = siteMeta[await getLocale()];

  return {
    title: {
      template: `%s | ${meta.name}`,
      default: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: meta.name }],
    creator: meta.name,
    publisher: meta.name,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: '/',
      siteName: meta.name,
      locale: meta.ogLocale,
      type: 'website',
      images: [{ url: '/logo2.png', width: 1200, height: 630, alt: meta.logoAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
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
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <Providers locale={locale}>{children}</Providers>
      </body>
    </html>
  );
}
