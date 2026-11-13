'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { upload } from '@vercel/blob/client';
import { useLocale } from '@/i18n/LocaleProvider';
import { messages } from '@/i18n/messages/quote';
import { company } from '@/lib/company';
import {
  hasAllowedExtension,
  INQUIRY_ATTACHMENT_EXTENSIONS,
  INQUIRY_ATTACHMENT_FOLDER,
  INQUIRY_ATTACHMENT_MAX_BYTES,
} from '@/lib/inquiry-attachment';

export default function QuotePage() {
  const router = useRouter();
  const locale = useLocale();
  const t = messages[locale];
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'PURCHASE',
    name: '',
    email: '',
    phone: '',
    company: '',
    country: t.defaultCountry as string,
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [attachment, setAttachment] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (file && !hasAllowedExtension(file.name)) {
      alert(t.alertFileType);
      e.target.value = '';
      return;
    }
    if (file && file.size > INQUIRY_ATTACHMENT_MAX_BYTES) {
      alert(t.alertFileSize);
      e.target.value = '';
      return;
    }

    setAttachment(file);
  };

  const uploadAttachment = async (file: File) => {
    const blob = await upload(`${INQUIRY_ATTACHMENT_FOLDER}/${file.name}`, file, {
      access: 'public',
      handleUploadUrl: '/api/inquiries/upload',
    });
    return { attachmentUrl: blob.url, attachmentName: file.name };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert(t.alertRequired);
      return;
    }

    try {
      setLoading(true);

      let attachmentFields = {};
      if (attachment) {
        try {
          attachmentFields = await uploadAttachment(attachment);
        } catch (error) {
          console.error('첨부파일 업로드 오류:', error);
          alert(t.alertUploadFailed);
          return;
        }
      }

      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, ...attachmentFields }),
      });

      if (response.ok) {
        alert(t.alertSuccess);
        router.push('/');
      } else {
        alert(t.alertFailed);
      }
    } catch (error) {
      console.error('문의 접수 오류:', error);
      alert(t.alertError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center px-4 max-w-[1400px] mx-auto">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Quote Request</p>
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

      {/* Main Content */}
      <section className="py-20 px-4">
        <div className="max-w-[1000px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left: Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t.contactTitle}</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.phone}</h3>
                    <p className="text-gray-600">{company.phone}</p>
                    <p className="text-sm text-gray-500 mt-1">{company.hours[locale]}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.email}</h3>
                    <p className="text-gray-600 break-all">{company.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{t.emailNote}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{t.headquarters}</h3>
                    <p className="text-gray-600">{company.address[locale]}</p>
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="mt-8 p-6 bg-secondary/5 rounded-xl border border-secondary/10">
                <h3 className="font-bold text-gray-900 mb-3">{t.tipsTitle}</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  {t.tips.map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right: Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.type} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
                    required
                  >
                    {(Object.keys(t.types) as (keyof typeof t.types)[]).map((type) => (
                      <option key={type} value={type}>
                        {t.types[type]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Name & Company */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder={t.companyPlaceholder}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.email} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="example@company.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.contact}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="010-1234-5678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
                    />
                  </div>
                </div>

                {/* Country & Attachment */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.country}
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
                    />
                  </div>
                  <div>
                    <label htmlFor="attachment" className="block text-sm font-semibold text-gray-900 mb-2">
                      {t.attachment}
                    </label>
                    <input
                      id="attachment"
                      type="file"
                      accept={INQUIRY_ATTACHMENT_EXTENSIONS.map((extension) => `.${extension}`).join(',')}
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 file:mr-3 file:px-3 file:py-1.5 file:rounded-md file:border-0 file:bg-secondary/10 file:text-secondary file:font-medium file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-secondary"
                    />
                    <p className="text-xs text-gray-500 mt-1.5">{t.attachmentHint}</p>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.subject} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t.subjectPlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent text-gray-900"
                    required
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    {t.message} <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={8}
                    placeholder={t.messagePlaceholder}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent resize-none text-gray-900"
                    required
                  />
                </div>

                {/* Privacy Notice */}
                <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
                  <p className="mb-2">
                    <strong>{t.privacyTitle}</strong>
                  </p>
                  <p>
                    {t.privacyBody}
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-8 py-4 bg-secondary text-white rounded-full hover:bg-secondary-dark transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
                      <span>{t.sending}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.submit}</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-[1000px] mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">{t.faqTitle}</h2>
          <div className="space-y-4">
            {t.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-secondary">Q.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-gray-600 pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
