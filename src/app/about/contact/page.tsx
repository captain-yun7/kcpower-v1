'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import LocationSketchMap from '@/components/LocationSketchMap';
import { useLocale } from '@/i18n/LocaleProvider';
import { messages } from '@/i18n/messages/contact';
import { company, factories } from '@/lib/company';

export default function ContactPage() {
  const [openFactory, setOpenFactory] = React.useState<number | null>(1);
  const locale = useLocale();
  const t = messages[locale];

  // URL 해시를 확인해서 해당 공장 열기
  React.useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#factory1') {
      setOpenFactory(1);
      setTimeout(() => document.getElementById('factory1')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (hash === '#factory2') {
      setOpenFactory(2);
      setTimeout(() => document.getElementById('factory2')?.scrollIntoView({ behavior: 'smooth' }), 100);
    } else if (hash === '#factory3') {
      setOpenFactory(3);
      setTimeout(() => document.getElementById('factory3')?.scrollIntoView({ behavior: 'smooth' }), 100);
    }
  }, []);

  const toggleFactory = (factoryId: number) => {
    setOpenFactory(openFactory === factoryId ? null : factoryId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a] pt-[90px]">
        <div className="absolute inset-0 bg-[url('https://placehold.co/1600x600/0e7490/white?text=Location')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Location</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {t.heroDesc}
          </p>
        </div>
      </section>

      {/* Quick Contact Info */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">{t.mainPhone}</p>
                <p className="text-lg font-bold text-gray-900">{company.phone}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">{t.email}</p>
                <p className="text-lg font-bold text-gray-900">{company.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">{t.hours}</p>
                <p className="text-lg font-bold text-gray-900">{company.hours[locale]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Factories */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1400px] mx-auto space-y-4">
          {factories.map((factory) => {
            const isOpen = openFactory === factory.id;
            const name = factory.name[locale];
            const address = `${factory.address[locale]} (${factory.lot})`;

            return (
              <div
                key={factory.id}
                id={`factory${factory.id}`}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-mt-24"
              >
                <button
                  onClick={() => toggleFactory(factory.id)}
                  aria-expanded={isOpen}
                  className="w-full px-6 sm:px-8 py-6 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{factory.id}</span>
                    </div>
                    <div className="text-left">
                      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{name}</h2>
                      <p className="text-gray-600 text-sm mt-1">{address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 flex-shrink-0">
                    <span className="text-sm font-medium hidden sm:inline">{t.showMap}</span>
                    <svg
                      className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-200 p-6 sm:p-8 bg-gray-50">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* 공장 사진 */}
                      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                        {factory.photo ? (
                          <img
                            src={factory.photo}
                            alt={t.photoAlt(name)}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-gray-400">
                            <svg className="w-14 h-14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V10l5 3V10l5 3V5h4v16M9 17h.01M13 17h.01M17 17h.01" />
                            </svg>
                            <p className="text-sm">{t.photoPending}</p>
                          </div>
                        )}
                      </div>

                      {/* 지도 + 주소 */}
                      <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg">
                        <div className="relative w-full flex-1 min-h-[280px]">
                          <iframe
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(factory.mapQuery)}&z=16&hl=${locale}&output=embed`}
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={t.mapTitle(name)}
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                        <div className="p-6 flex items-start gap-4">
                          <svg className="w-9 h-9 text-secondary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21h18M5 21V10l5 3V10l5 3V5h4v16M9 17h.01M13 17h.01M17 17h.01" />
                          </svg>
                          <div>
                            <p className="text-lg font-bold text-gray-900">
                              {name}: {address}
                            </p>
                            <a
                              href={
                                locale === 'ko'
                                  ? `https://map.naver.com/v5/search/${encodeURIComponent(factory.mapQuery)}`
                                  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(factory.mapQuery)}`
                              }
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-2 text-sm font-medium text-secondary hover:underline"
                            >
                              {t.openInMap} →
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 약도 */}
      <section className="pb-20 px-4 bg-white">
        <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-5">
              <p className="text-secondary font-semibold">Map</p>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">{t.sketchTitle}</h2>
            <p className="text-lg text-gray-600 mb-6">{t.sketchDesc}</p>
            <ul className="space-y-3">
              {factories.map((factory) => (
                <li key={factory.id} className="flex items-start gap-3 text-gray-700">
                  <span className="w-6 h-6 bg-secondary text-white text-sm font-bold rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {factory.id}
                  </span>
                  <span>
                    <strong className="text-gray-900">{factory.name[locale]}</strong>
                    <br />
                    {factory.address[locale]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gray-200 shadow-sm overflow-hidden max-w-[480px] w-full mx-auto">
            <LocationSketchMap locale={locale} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t.ctaTitle}
          </h2>
          <p className="text-xl text-white/70 mb-10">
            {t.ctaDesc}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:gap-3 hover:scale-105"
            >
              {t.ctaReserve}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={`tel:${company.phone}`}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t.ctaCall}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
