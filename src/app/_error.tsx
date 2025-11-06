'use client';

function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a0e1a] via-[#1a2847] to-[#0a0e1a]">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          {statusCode
            ? `서버 오류 (${statusCode})`
            : '클라이언트 오류'}
        </h1>
        <p className="text-white/60">오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
