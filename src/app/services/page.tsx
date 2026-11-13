import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLocale } from '@/i18n/server';
import { messages } from '@/i18n/messages/services';
import { company } from '@/lib/company';

export default async function ServicesPage() {
  const locale = await getLocale();
  const t = messages[locale];
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Services</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {t.heroDescLine1}<br />
            {t.heroDescLine2}
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-20 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* A/S 서비스 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-secondary hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.afterService.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t.afterService.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {t.afterService.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
              >
                {t.afterService.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* 정기 점검 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-secondary hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.maintenance.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t.maintenance.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {t.maintenance.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
              >
                {t.maintenance.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* 현장 설치 지원 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-secondary hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.installation.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t.installation.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {t.installation.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
              >
                {t.installation.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* 기술 상담 */}
            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 hover:border-secondary hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{t.consulting.title}</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t.consulting.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {t.consulting.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
              >
                {t.consulting.cta}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">{t.processTitle}</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {t.processSteps.map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">{t.contactTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.phoneTitle}</h3>
              <p className="text-2xl font-bold text-secondary mb-2">{company.phone}</p>
              <p className="text-sm text-gray-600">{company.hours[locale]}</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.emailTitle}</h3>
              <p className="text-lg font-semibold text-secondary mb-2">{company.email}</p>
              <p className="text-sm text-gray-600">{t.emailNote}</p>
            </div>

            <div className="text-center p-8 bg-gray-50 rounded-xl">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.emergencyTitle}</h3>
              <p className="text-lg font-semibold text-secondary mb-2">{t.emergencyStatus}</p>
              <p className="text-sm text-gray-600">{t.emergencyNote}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#0a0e1a]">
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
              className="px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:scale-105"
            >
              {t.ctaRequest}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href={`tel:${company.phone}`}
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold"
            >
              {t.ctaPhone}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
