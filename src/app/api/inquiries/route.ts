import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { z } from 'zod';
import { isInquiryAttachmentUrl } from '@/lib/inquiry-attachment';

const inquirySchema = z.object({
  type: z.enum(['PRODUCT', 'PURCHASE', 'PARTNERSHIP', 'SUPPORT', 'OTHER']),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(50).optional(),
  company: z.string().trim().max(200).optional(),
  country: z.string().trim().max(100).optional(),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(10000),
  attachmentUrl: z
    .string()
    .url()
    .refine((value) => isInquiryAttachmentUrl(value))
    .optional(),
  attachmentName: z.string().trim().max(255).optional(),
});

// POST /api/inquiries - 견적 문의 접수 (비회원 가능)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    const parsed = inquirySchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json({ error: 'INVALID_INPUT' }, { status: 400 });
    }

    const { phone, company, country, attachmentUrl, attachmentName, ...required } = parsed.data;

    const inquiry = await prisma.inquiry.create({
      data: {
        ...required,
        phone: phone || null,
        company: company || null,
        country: country || null,
        attachmentUrl: attachmentUrl ?? null,
        attachmentName: attachmentUrl ? attachmentName || null : null,
        userId: session?.user?.id ?? null,
      },
      select: { id: true, createdAt: true },
    });

    return NextResponse.json({ inquiry }, { status: 201 });
  } catch (error) {
    console.error('문의 작성 에러:', error);
    return NextResponse.json({ error: 'SERVER_ERROR' }, { status: 500 });
  }
}

// GET /api/inquiries - 내 문의 목록 조회
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: '로그인이 필요합니다' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // 내 문의 목록 조회
    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where: {
          userId: session.user.id,
        },
        select: {
          id: true,
          title: true,
          isPrivate: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          _count: {
            select: {
              replies: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take: limit,
      }),
      prisma.inquiry.count({
        where: {
          userId: session.user.id,
        },
      }),
    ]);

    return NextResponse.json({
      inquiries,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('문의 목록 조회 에러:', error);
    return NextResponse.json(
      { error: '문의 목록을 불러오는데 실패했습니다' },
      { status: 500 }
    );
  }
}
