import Link from 'next/link';

const footerInfo = [
  { label: '전화', value: '032-816-8034', href: 'tel:032-816-8034' },
  { label: '팩스', value: '032-818-4452' },
  { label: '이메일', value: 'peskorea@naver.com', href: 'mailto:peskorea@naver.com' },
  { label: '주소', value: '인천광역시 남동구 남동서로 19번길 46' },
  { label: '대표자', value: '이영수' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0a0e1a] text-gray-300 border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <img src="/logo.png" alt="케이씨파워 로고" className="h-8 w-auto object-contain" />
            <span className="text-white text-xl font-bold">케이씨파워</span>
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
          <p>&copy; {currentYear} 케이씨파워. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/about/contact" className="hover:text-secondary transition-colors">
              오시는 길
            </Link>
            <Link href="/quote" className="hover:text-secondary transition-colors">
              견적 문의
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
