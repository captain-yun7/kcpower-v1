'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function ContactPage() {
  const [openFactory, setOpenFactory] = React.useState<number | null>(1);

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

  const factories = [
    {
      id: 1,
      name: '본사 및 제1공장',
      address: '인천광역시 남동구 남동서로 19번길 46',
      postalCode: '21635',
      phone: '032-818-4451',
      fax: '032-818-4452',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.1234567890123!2d126.7123456789012!3d37.4123456789012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI0JzQ0LjQiTiAxMjbCsDQyJzQ0LjQiRQ!5e0!3m2!1sko!2skr!4v1234567890123!5m2!1sko!2skr',
    },
    {
      id: 2,
      name: '제2공장',
      address: '인천광역시 남동구 남동서로 19번길 52',
      postalCode: '21635',
      phone: '032-818-4451',
      fax: '032-818-4452',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.2345678901234!2d126.7134567890123!3d37.4134567890123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI0JzQ4LjQiTiAxMjbCsDQyJzQ4LjQiRQ!5e0!3m2!1sko!2skr!4v1234567890124!5m2!1sko!2skr',
    },
    {
      id: 3,
      name: '제3공장',
      address: '인천광역시 남동구 남동공단 153번길 38',
      postalCode: '21633',
      phone: '032-818-4451',
      fax: '032-818-4452',
      mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3170.3456789012345!2d126.7145678901234!3d37.4145678901234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI0JzUyLjQiTiAxMjbCsDQyJzUyLjQiRQ!5e0!3m2!1sko!2skr!4v1234567890125!5m2!1sko!2skr',
    },
  ];

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
            오시는 길
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            케이씨파워의 3개 공장 위치를 안내해 드립니다
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
                <p className="text-sm text-gray-600 font-medium">대표전화</p>
                <p className="text-lg font-bold text-gray-900">032-818-4451</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">이메일</p>
                <p className="text-lg font-bold text-gray-900">kcpower@kcpower.co.kr</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">영업시간</p>
                <p className="text-lg font-bold text-gray-900">평일 09:00 - 18:00</p>
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

            return (
              <div
                key={factory.id}
                id={`factory${factory.id}`}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow scroll-mt-24"
              >
                {/* Factory Header - Clickable */}
                <button
                  onClick={() => toggleFactory(factory.id)}
                  className="w-full px-8 py-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-lg">{factory.id}</span>
                    </div>
                    <div className="text-left">
                      <h2 className="text-2xl font-bold text-gray-900">{factory.name}</h2>
                      <p className="text-gray-600 text-sm mt-1">{factory.address}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span className="text-sm font-medium">지도보기</span>
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

                {/* Factory Content Grid - Collapsible */}
                {isOpen && (
                  <div className="border-t border-gray-200 p-8 bg-gray-50">
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Map */}
                      <div className="order-2 lg:order-1">
                        <div className="relative w-full h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-lg bg-gray-100">
                          <iframe
                            src={factory.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title={`${factory.name} 위치`}
                            className="absolute inset-0"
                          />
                        </div>
                      </div>

                      {/* Factory Info */}
                      <div className="order-1 lg:order-2 flex flex-col justify-center">
                        <div className="space-y-6">
                          {/* Address */}
                          <div className="bg-gray-50 p-6 rounded-xl">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-sm font-semibold text-gray-700 mb-2">주소</p>
                                <p className="text-lg font-bold text-gray-900">{factory.address}</p>
                                <p className="text-sm text-gray-600 mt-1">우편번호: {factory.postalCode}</p>
                              </div>
                            </div>
                          </div>

                          {/* Contact */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-6 rounded-xl">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-gray-700 mb-1">전화</p>
                                  <p className="text-base font-bold text-gray-900">{factory.phone}</p>
                                </div>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                  </svg>
                                </div>
                                <div>
                                  <p className="text-xs font-semibold text-gray-700 mb-1">팩스</p>
                                  <p className="text-base font-bold text-gray-900">{factory.fax}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Directions Button */}
                          <a
                            href={`https://map.naver.com/v5/search/${encodeURIComponent(factory.address)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:gap-3"
                          >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            길찾기 (네이버 지도)
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Additional Info for Main Factory */}
                    {factory.id === 1 && (
                      <div className="mt-8 bg-gradient-to-br from-secondary/5 to-secondary/10 p-8 rounded-2xl border border-secondary/20">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">찾아오시는 길 안내</h3>
                            <div className="space-y-2 text-gray-700">
                              <p><strong className="text-secondary">• 지하철:</strong> 인천1호선 호구포역 하차 후 도보 15분</p>
                              <p><strong className="text-secondary">• 버스:</strong> 남동공단 정류장 하차 (간선 13번, 24번, 지선 567번)</p>
                              <p><strong className="text-secondary">• 자가용:</strong> 경인고속도로 남동IC에서 5분 거리</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
        <div className="max-w-[1400px] mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            방문 상담을 원하시나요?
          </h2>
          <p className="text-xl text-white/70 mb-10">
            사전 예약 후 방문하시면 더욱 신속한 상담이 가능합니다
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:gap-3 hover:scale-105"
            >
              상담 예약하기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <a
              href="tel:032-818-4451"
              className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full hover:bg-white/20 transition-all duration-300 font-semibold inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              전화 상담하기
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
