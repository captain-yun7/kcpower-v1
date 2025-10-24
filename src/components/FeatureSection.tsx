'use client';

import Link from 'next/link';

interface FeatureSectionProps {
  title: string;
  subtitle: string;
  label: string;
  description: string;
  features?: {
    title: string;
    description: string;
  }[];
  linkText: string;
  linkHref: string;
  videoUrl?: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
  backgroundColor?: string;
  backgroundImage?: string;
}

export default function FeatureSection({
  title,
  subtitle,
  label,
  description,
  features,
  linkText,
  linkHref,
  videoUrl,
  imageUrl,
  imagePosition = 'left',
  backgroundColor = 'bg-white',
  backgroundImage,
}: FeatureSectionProps) {
  const contentOrder = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1';
  const mediaOrder = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2';

  // Determine if dark background for text color
  const isDark = backgroundColor.includes('[#0a0e1a]') || backgroundColor.includes('gray-900') || backgroundColor.includes('black');
  const textColorClass = isDark ? 'text-white' : 'text-gray-900';
  const subtitleColorClass = isDark ? 'text-white/70' : 'text-gray-600';
  const descriptionColorClass = isDark ? 'text-white/80' : 'text-gray-700';
  const labelColorClass = isDark ? 'text-white/10' : 'text-gray-200/30';
  const featureTextColorClass = isDark ? 'text-white/70' : 'text-gray-600';

  return (
    <section className={`relative py-24 lg:py-32 overflow-hidden ${backgroundColor}`}>
      {/* Background Image if provided */}
      {backgroundImage && (
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Section */}
          <div className={contentOrder}>
            {/* Super Label */}
            <div className="mb-8">
              <h3 className={`text-[80px] lg:text-[120px] font-bold ${labelColorClass} leading-none tracking-tight`}>
                {label}
              </h3>
            </div>

            {/* Subtitle */}
            <p className={`text-[16px] ${subtitleColorClass} mb-4 font-medium`}>
              {subtitle}
            </p>

            {/* Main Title */}
            <h2 className={`text-[32px] lg:text-[42px] font-bold ${textColorClass} mb-6 leading-tight`}>
              {title}
            </h2>

            {/* Description */}
            <p className={`text-[16px] lg:text-[18px] ${descriptionColorClass} mb-8 leading-relaxed`}>
              {description}
            </p>

            {/* Features List */}
            {features && features.length > 0 && (
              <div className="space-y-6 mb-10">
                {features.map((feature, index) => (
                  <div key={index} className="flex gap-4">
                    <div className={`flex-shrink-0 w-2 h-2 ${isDark ? 'bg-blue-400' : 'bg-blue-600'} rounded-full mt-2`} />
                    <div>
                      <h4 className={`text-[18px] font-bold ${isDark ? 'text-blue-400' : 'text-blue-600'} mb-2`}>
                        {feature.title}
                      </h4>
                      <p className={`text-[15px] ${featureTextColorClass} leading-relaxed`}>
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTA Link */}
            <Link
              href={linkHref}
              className={`inline-flex items-center gap-2 ${isDark ? 'text-blue-400' : 'text-blue-600'} font-semibold text-[16px] hover:gap-4 transition-all group`}
            >
              {linkText}
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          {/* Media Section */}
          <div className={`${mediaOrder} relative`}>
            <div className="relative aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden shadow-2xl">
              {videoUrl ? (
                <div className="relative w-full h-full group">
                  {/* Video Placeholder with Play Button */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
                    <button className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform group-hover:bg-white">
                      <svg
                        className="w-8 h-8 text-blue-600 ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </button>
                  </div>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ) : imageUrl ? (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                  <div className="text-center text-gray-400">
                    <svg
                      className="w-24 h-24 mx-auto mb-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="font-medium">Video Placeholder</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
