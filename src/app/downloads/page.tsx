'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLocale } from '@/i18n/LocaleProvider';
import { messages } from '@/i18n/messages/downloads';
import { company } from '@/lib/company';

interface Download {
  id: string;
  title: string;
  description?: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  fileType: string;
  version?: string;
  downloads: number;
  requireAuth: boolean;
  createdAt: string;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  order: number;
}

export default function DownloadsPage() {
  const locale = useLocale();
  const t = messages[locale];
  const [downloads, setDownloads] = useState<Download[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchDownloads();
  }, [selectedCategory, searchQuery]);

  const fetchDownloads = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (selectedCategory !== 'all') params.append('categoryId', selectedCategory);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/downloads?${params.toString()}`);
      const data = await response.json();

      setDownloads(data.downloads || []);
      setCategories(data.categories || []);
    } catch (error) {
      console.error('자료 목록 조회 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDownloads();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) {
      return (
        <svg className="w-8 h-8 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      );
    } else if (fileType.includes('zip') || fileType.includes('rar')) {
      return (
        <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      );
    } else if (fileType.includes('doc') || fileType.includes('docx')) {
      return (
        <svg className="w-8 h-8 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
        </svg>
      );
    }
  };

  const handleDownload = async (download: Download) => {
    try {
      // 다운로드 수 증가 (선택사항)
      // await fetch(`/api/downloads/${download.id}/increment`, { method: 'POST' });

      // 파일 다운로드
      window.open(download.fileUrl, '_blank');
    } catch (error) {
      console.error('다운로드 오류:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Downloads</p>
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

      {/* Search and Filter Section */}
      <section className="py-12 px-4 bg-gray-50 border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full px-6 py-4 pr-14 border-2 border-gray-200 rounded-full focus:outline-none focus:border-secondary transition-colors text-gray-900"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-secondary text-white rounded-full flex items-center justify-center hover:bg-secondary-dark transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Category Filter */}
          {categories.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    selectedCategory === 'all'
                      ? 'bg-secondary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {t.all}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-medium transition-all ${
                      selectedCategory === category.id
                        ? 'bg-secondary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="mt-6 text-gray-600 text-center">
            {t.resultsPrefix}<span className="font-bold text-secondary">{downloads.length}</span>{t.resultsSuffix(downloads.length)}
          </div>
        </div>
      </section>

      {/* Downloads List */}
      <section className="py-20 px-4">
        <div className="max-w-[1200px] mx-auto">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-xl p-6 animate-pulse">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
                      <div className="h-4 bg-gray-200 rounded w-2/3" />
                    </div>
                    <div className="w-24 h-10 bg-gray-200 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : downloads.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.emptyTitle}</h3>
              <p className="text-gray-600">{t.emptyDesc}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {downloads.map((download) => (
                <div
                  key={download.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-center gap-6">
                    {/* File Icon */}
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-secondary/5 transition-colors">
                      {getFileIcon(download.fileType)}
                    </div>

                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors">
                          {download.title}
                        </h3>
                        {download.version && (
                          <span className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-semibold rounded">
                            v{download.version}
                          </span>
                        )}
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                          {download.category.name}
                        </span>
                      </div>

                      {download.description && (
                        <p className="text-gray-600 text-sm mb-2 line-clamp-1">
                          {download.description}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                          </svg>
                          {formatFileSize(download.fileSize)}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {t.downloadCount(download.downloads.toLocaleString())}
                        </span>
                        <span>
                          {new Date(download.createdAt).toLocaleDateString(locale === 'en' ? 'en-US' : 'ko-KR')}
                        </span>
                      </div>
                    </div>

                    {/* Download Button */}
                    <button
                      onClick={() => handleDownload(download)}
                      className="px-6 py-3 bg-secondary text-white rounded-full hover:bg-secondary-dark transition-all duration-300 font-semibold flex items-center gap-2 hover:shadow-lg flex-shrink-0"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      {t.download}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.infoSafeTitle}</h3>
              <p className="text-gray-600 text-sm">
                {t.infoSafeDesc}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.infoUpdateTitle}</h3>
              <p className="text-gray-600 text-sm">
                {t.infoUpdateDesc}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{t.infoSupportTitle}</h3>
              <p className="text-gray-600 text-sm">
                {t.infoSupportDesc}
              </p>
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
            <a
              href={`mailto:${company.email}`}
              className="px-10 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark hover:shadow-2xl hover:shadow-secondary/30 transition-all duration-300 font-semibold inline-flex items-center gap-2 hover:scale-105"
            >
              {t.ctaRequest}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
