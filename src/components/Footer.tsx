'use client';

import Link from 'next/link';
import { useLocale } from '@/i18n/LocaleProvider';
import { messages } from '@/i18n/messages/common';
import { company } from '@/lib/company';

export default function Footer() {
  const locale = useLocale();
  const t = messages[locale];
  const currentYear = new Date().getFullYear();

  const footerInfo = [
    { label: t.footer.phone, value: company.phone, href: `tel:${company.phone}` },
    { label: t.footer.fax, value: company.fax },
    { label: t.footer.email, value: company.email, href: `mailto:${company.email}` },
    { label: t.footer.address, value: company.address[locale] },
    { label: t.footer.ceo, value: company.ceo[locale] },
    { label: t.footer.businessNumber, value: company.businessNumber },
  ];

  return (
    <footer className="bg-[#0a0e1a] text-gray-300 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/logo.png" alt={t.logoAlt} className="h-8 w-auto object-contain" />
            <span className="text-white text-xl font-bold">{company.name[locale]}</span>
          </Link>

          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
            {footerInfo.map((item) => (
              <p key={item.label}>
                <span className="text-gray-500 mr-2">{item.label}</span>
                {item.href ? (
                  <a href={item.href} className="text-gray-300 hover:text-secondary transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <span className="text-gray-300">{item.value}</span>
                )}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-gray-500">
          <p>&copy; {currentYear} {company.name[locale]}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about/contact" className="hover:text-secondary transition-colors">
              {t.footer.location}
            </Link>
            <Link href="/quote" className="hover:text-secondary transition-colors">
              {t.footer.quote}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
