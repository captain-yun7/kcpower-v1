import Header from '@/components/Header';
import Footer from '@/components/Footer';

// 홍보영상 URL (확보 시 입력)
const promoVideos = [
  { label: 'ENGLISH.VER', title: '홍보영상 (영문)', url: '' },
  { label: 'JAPAN.VER', title: '홍보영상 (일문)', url: '' },
];

export default function MediaPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-gradient-to-r from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a] pt-[90px]">
        <div className="relative z-10 text-center px-4 py-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <p className="text-secondary font-semibold uppercase tracking-wide">Promotion Video</p>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">홍보영상</h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            케이씨파워의 기술과 제품을 영상으로 만나보세요
          </p>
        </div>
      </section>

      {/* Videos */}
      <section className="py-20 px-4 bg-[#0a0e1a]">
        <div className="max-w-[1000px] mx-auto space-y-16">
          {promoVideos.map((video) => (
            <div key={video.label}>
              <div className="aspect-video rounded-xl overflow-hidden bg-black shadow-2xl">
                {video.url ? (
                  <video src={video.url} controls className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                    <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-9 h-9 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="text-white/60 text-sm">영상 준비 중입니다</p>
                  </div>
                )}
              </div>
              <p className="text-center text-white text-2xl font-bold mt-6 tracking-wide">
                &lt;{video.label}&gt;
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
