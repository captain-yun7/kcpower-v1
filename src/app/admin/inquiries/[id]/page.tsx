'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Inquiry {
  id: string;
  subject: string;
  type: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  status: 'PENDING' | 'ANSWERED' | 'CLOSED';
  adminNote?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    name: string | null;
    email: string | null;
  };
}

export default function AdminInquiryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNote, setAdminNote] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchInquiry(params.id as string);
    }
  }, [params.id]);

  const fetchInquiry = async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/inquiries/${id}`);
      const data = await response.json();

      if (response.ok) {
        setInquiry(data);
        setAdminNote(data.adminNote || '');
      } else {
        alert(data.error || '문의를 불러오는데 실패했습니다');
        router.push('/admin/inquiries');
      }
    } catch (error) {
      console.error('문의 로딩 실패:', error);
      alert('문의를 불러오는데 실패했습니다');
      router.push('/admin/inquiries');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: 'PENDING' | 'ANSWERED' | 'CLOSED') => {
    if (!inquiry) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/admin/inquiries/${inquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status,
          adminNote,
          respondedAt: status === 'ANSWERED' ? new Date().toISOString() : undefined,
        }),
      });

      if (response.ok) {
        alert('상태가 변경되었습니다');
        fetchInquiry(inquiry.id);
      } else {
        alert('상태 변경에 실패했습니다');
      }
    } catch (error) {
      console.error('상태 변경 실패:', error);
      alert('상태 변경에 실패했습니다');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <>
        <div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </>
    );
  }

  if (!inquiry) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Link href="/admin/inquiries" className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block">
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">문의 상세</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">제목</h3>
          <p className="text-lg font-semibold">{inquiry.subject}</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">문의 유형</h3>
            <p>{inquiry.type}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">상태</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              inquiry.status === 'ANSWERED' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
            }`}>
              {inquiry.status === 'ANSWERED' ? '답변 완료' : '답변 대기'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">이름</h3>
            <p>{inquiry.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 mb-2">이메일</h3>
            <p>{inquiry.email}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">문의 내용</h3>
          <div className="bg-gray-50 rounded-xl p-4 whitespace-pre-wrap">{inquiry.message}</div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-2">관리자 메모</h3>
          <textarea
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
            placeholder="관리자 메모 (내부용)"
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button
            onClick={() => handleStatusChange('ANSWERED')}
            disabled={saving}
            className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
          >
            답변 완료 처리
          </button>
          <button
            onClick={() => handleStatusChange('PENDING')}
            disabled={saving}
            className="px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors font-medium disabled:opacity-50"
          >
            답변 대기로 변경
          </button>
        </div>
      </div>
  );
}
