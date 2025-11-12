import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    // 관리자 권한 확인
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: '권한이 없습니다' }, { status: 403 });
    }

    // 날짜 계산
    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisWeekStart = new Date(now);
    thisWeekStart.setDate(now.getDate() - 7);

    // 제품 통계
    const [totalProducts, publishedProducts, draftProducts] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isPublished: true } }),
      prisma.product.count({ where: { isPublished: false } }),
    ]);

    // 시공사례 통계
    const [totalCases, pinnedCases, thisMonthCases] = await Promise.all([
      prisma.caseStudy.count(),
      prisma.caseStudy.count({ where: { isPinned: true } }),
      prisma.caseStudy.count({
        where: {
          createdAt: { gte: thisMonthStart },
        },
      }),
    ]);

    // 뉴스/공지사항 통계
    const [totalNews, pinnedNews, thisWeekNews] = await Promise.all([
      prisma.news.count(),
      prisma.news.count({ where: { isPinned: true } }),
      prisma.news.count({
        where: {
          createdAt: { gte: thisWeekStart },
        },
      }),
    ]);

    // 문의 통계
    const [totalInquiries, pendingInquiries, respondedInquiries] = await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'PENDING' } }),
      prisma.inquiry.count({ where: { status: 'ANSWERED' } }),
    ]);

    // 회원 통계
    const [totalUsers, thisMonthUsers] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({
        where: {
          createdAt: { gte: thisMonthStart },
        },
      }),
    ]);

    // 다운로드 통계 (UserDownload 테이블이 있다고 가정)
    const [totalDownloads, thisWeekDownloads] = await Promise.all([
      prisma.userDownload.count().catch(() => 0),
      prisma.userDownload
        .count({
          where: {
            downloadedAt: { gte: thisWeekStart },
          },
        })
        .catch(() => 0),
    ]);

    const stats = {
      products: {
        total: totalProducts,
        published: publishedProducts,
        draft: draftProducts,
      },
      cases: {
        total: totalCases,
        pinned: pinnedCases,
        thisMonth: thisMonthCases,
      },
      news: {
        total: totalNews,
        pinned: pinnedNews,
        thisWeek: thisWeekNews,
      },
      inquiries: {
        total: totalInquiries,
        pending: pendingInquiries,
        responded: respondedInquiries,
      },
      users: {
        total: totalUsers,
        thisMonth: thisMonthUsers,
      },
      downloads: {
        total: totalDownloads,
        thisWeek: thisWeekDownloads,
      },
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json({ error: '대시보드 데이터를 불러올 수 없습니다' }, { status: 500 });
  }
}
