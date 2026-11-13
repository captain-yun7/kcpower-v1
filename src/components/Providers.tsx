'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { LocaleProvider } from '@/i18n/LocaleProvider';
import type { Locale } from '@/i18n/config';

export default function Providers({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <SessionProvider>
      <LocaleProvider locale={locale}>{children}</LocaleProvider>
    </SessionProvider>
  );
}
