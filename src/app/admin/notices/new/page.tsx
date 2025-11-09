'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewNoticePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    isPinned: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch('/api/admin/notices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('공지사항이 등록되었습니다');
        router.push('/admin/notices');
      } else {
        alert('공지사항 등록에 실패했습니다');
      }
    } catch (error) {
      alert('공지사항 등록에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Link href="/admin/notices" className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block">← 목록으로</Link>
        <h1 className="text-3xl font-bold text-gray-900">새 공지사항 등록</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">제목 <span className="text-red-500">*</span></label>
            <input type="text" required value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">내용 <span className="text-red-500">*</span></label>
            <textarea required value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={12} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary" />
          </div>

          <div className="flex items-center gap-3">
            <input type="checkbox" id="isPinned" checked={formData.isPinned} onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })} className="w-5 h-5 text-secondary rounded focus:ring-secondary" />
            <label htmlFor="isPinned" className="text-sm font-semibold text-gray-900">상단 고정</label>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Link href="/admin/notices" className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium">취소</Link>
          <button type="submit" disabled={loading} className="px-8 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors font-medium disabled:opacity-50">
            {loading ? '등록 중...' : '공지사항 등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
