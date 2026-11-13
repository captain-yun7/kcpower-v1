'use client';

import { useRouter } from 'next/navigation';
import { LOCALE_COOKIE, locales, type Locale } from '@/i18n/config';
import { useLocale } from '@/i18n/LocaleProvider';

const labels: Record<Locale, string> = { ko: 'KO', en: 'EN' };

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
  const router = useRouter();
  const current = useLocale();

  const changeLocale = (locale: Locale) => {
    if (locale === current) return;
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };

  return (
    <div className={`flex items-center text-[14px] font-medium ${className}`} role="group" aria-label="Language">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center">
          {index > 0 && <span className="mx-2 text-white/30">|</span>}
          <button
            type="button"
            onClick={() => changeLocale(locale)}
            aria-pressed={locale === current}
            className={
              locale === current
                ? 'text-white font-bold'
                : 'text-white/50 hover:text-white transition-colors'
            }
          >
            {labels[locale]}
          </button>
        </span>
      ))}
    </div>
  );
}
