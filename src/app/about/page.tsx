import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getLocale } from '@/i18n/server';
import { messages } from '@/i18n/messages/about';
import { company } from '@/lib/company';

const icons = {
  building: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  user: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
  calendar: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
  pin: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z',
  users: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
  doc: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  phone: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
  printer: 'M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z',
  mail: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  id: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2',
};

export default async function AboutPage() {
  const locale = await getLocale();
  const t = messages[locale];
  const history = t.history;

  const overviewCards = [
    { icon: icons.building, label: t.companyName, value: company.legalName[locale] },
    { icon: icons.user, label: t.ceo, value: company.ceo[locale] },
    { icon: icons.calendar, label: t.founded, value: t.foundedValue },
    { icon: icons.pin, label: t.headquarters, value: company.address[locale] },
    { icon: icons.users, label: t.employees, value: t.employeesValue(company.employees) },
    { icon: icons.doc, label: t.mainBusiness, value: t.mainBusinessValue.join('\n') },
  ];

  const contactItems = [
    { icon: icons.phone, label: t.contact, value: `Tel: ${company.phone}` },
    { icon: icons.printer, label: t.fax, value: `Fax: ${company.fax}` },
    { icon: icons.mail, label: t.email, value: company.email },
    { icon: icons.id, label: t.businessNumber, value: company.businessNumber },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a] pt-[90px]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto py-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">About Us</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            {t.heroTitle}
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            {t.heroDesc[0]}<br />
            {t.heroDesc[1]}
          </p>
        </div>
      </section>

      {/* 개요 */}
      <section id="overview" className="py-24 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 scroll-mt-[90px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <p className="text-secondary font-semibold">Overview</p>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-4">
              {t.overviewTitle}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {overviewCards.map((card) => (
              <div
                key={card.label}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-secondary/30 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-2 uppercase tracking-wide">{card.label}</h3>
                    <p className="text-lg font-bold text-gray-900 leading-relaxed whitespace-pre-line">{card.value}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* 연락처 */}
            <div className="group bg-gradient-to-br from-secondary to-secondary/90 rounded-2xl p-8 shadow-lg border border-secondary md:col-span-2 lg:col-span-3">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactItems.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-white/80 mb-1 uppercase tracking-wide">{item.label}</h3>
                      <p className="text-lg font-bold text-white break-words">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 이념 (핵심 가치) */}
      <section id="values" className="py-20 px-4 bg-white scroll-mt-[90px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <p className="text-secondary font-semibold">Core Values</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.valuesTitle}
            </h2>
            <p className="text-xl text-gray-600">
              {t.valuesSubtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.values[0].title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.values[0].desc}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.values[1].title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.values[1].desc}
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-xl transition-all">
              <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.values[2].title}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.values[2].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 연혁 */}
      <section id="history" className="py-20 px-4 bg-gray-50 scroll-mt-[90px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
              <p className="text-secondary font-semibold">History</p>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {t.historyTitle}
            </h2>
          </div>

          <div className="space-y-8">
            {history.map((item, idx) => (
              <div key={idx} className="flex gap-8 items-start">
                <div className="flex-shrink-0 w-32 text-right">
                  <span className="text-2xl font-bold text-secondary">{item.date}</span>
                </div>
                <div className="relative flex-1">
                  <div className="absolute left-0 top-3 w-3 h-3 bg-secondary rounded-full" />
                  {idx < history.length - 1 && (
                    <div className="absolute left-[5px] top-6 bottom-0 w-0.5 bg-secondary/20" />
                  )}
                  <div className="ml-8 bg-white rounded-xl p-6 hover:shadow-lg transition-all">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO 인사말 */}
      <section id="ceo" className="py-20 px-4 bg-gradient-to-br from-[#0a0e1a] to-[#1a2847] scroll-mt-[90px]">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* CEO Photo */}
            <div className="lg:col-span-1">
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-800/50">
                  <img
                    src="/ceo.png"
                    alt={t.ceoPhotoAlt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-secondary text-white rounded-xl shadow-2xl p-6">
                  <p className="text-sm font-semibold mb-1">{t.ceo}</p>
                  <p className="text-2xl font-bold">{company.ceo[locale]}</p>
                </div>
              </div>
            </div>

            {/* CEO Message Content */}
            <div className="lg:col-span-1">
              <div className="inline-block px-4 py-2 bg-secondary/20 rounded-full mb-6">
                <p className="text-secondary font-semibold">CEO Message</p>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                {t.ceoHeading[0]}<br />
                {t.ceoHeading[1]}
              </h2>

              <div className="space-y-4 text-white/80 leading-relaxed">
                <p className="text-lg">{t.ceoGreeting}</p>
                {t.ceoParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="text-white font-semibold pt-4">{t.ceoThanks}</p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-8 border-t border-white/20 flex items-center gap-4">
                <div className="text-white">
                  <p className="text-sm text-white/60 mb-1">{company.legalName[locale]}</p>
                  <p className="text-xl font-bold">{t.ceoSignature(company.ceo[locale])}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
