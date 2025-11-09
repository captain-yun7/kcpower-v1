'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

interface Product {
  id: string;
  name: string;
  model: string;
  category: string;
}

export default function NewCasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    location: '',
    projectType: '',
    year: new Date().getFullYear(),
    description: '',
    content: '',
    challenge: '',
    solution: '',
    result: '',
    thumbnailUrl: '',
    imageUrl: '',
    images: [] as string[],
    videoUrl: '',
    tags: [] as string[],
    isPinned: false,
    order: 0,
    isPublished: false,
    productIds: [] as string[],
  });

  const [tagInput, setTagInput] = useState('');

  const projectTypes = [
    '변전소',
    '철도',
    '뉴타운',
    '산업단지',
    '터널',
    '기타',
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('제품 목록 로딩 실패:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch('/api/admin/case-studies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('시공사례가 등록되었습니다');
        router.push('/admin/cases');
      } else {
        const data = await response.json();
        alert(data.error || '시공사례 등록에 실패했습니다');
      }
    } catch (error) {
      console.error('시공사례 등록 에러:', error);
      alert('시공사례 등록에 실패했습니다');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()],
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const toggleProduct = (productId: string) => {
    setFormData({
      ...formData,
      productIds: formData.productIds.includes(productId)
        ? formData.productIds.filter((id) => id !== productId)
        : [...formData.productIds, productId],
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/cases"
          className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
        >
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">새 시공사례 등록</h1>
        <p className="text-gray-600 mt-2">새로운 시공사례를 등록합니다</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b">
            기본 정보
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="예: 서울 메트로 9호선 변전소 구축"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                고객사
              </label>
              <input
                type="text"
                value={formData.client}
                onChange={(e) =>
                  setFormData({ ...formData, client: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: 한국전력공사"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                위치
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: 서울시 강남구"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                프로젝트 유형
              </label>
              <select
                value={formData.projectType}
                onChange={(e) =>
                  setFormData({ ...formData, projectType: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              >
                <option value="">선택하세요</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                완공 연도
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="2024"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              간단 설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="프로젝트 간략 설명"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              태그
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="태그 입력 후 엔터"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                추가
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="hover:text-red-500"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 상세 내용 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b">
            상세 내용
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              프로젝트 과제/어려움
            </label>
            <textarea
              value={formData.challenge}
              onChange={(e) =>
                setFormData({ ...formData, challenge: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="프로젝트에서 직면한 과제나 어려움"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              해결 방법
            </label>
            <textarea
              value={formData.solution}
              onChange={(e) =>
                setFormData({ ...formData, solution: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="과제를 해결한 방법"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              결과/성과
            </label>
            <textarea
              value={formData.result}
              onChange={(e) =>
                setFormData({ ...formData, result: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="프로젝트의 결과와 성과"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              전체 내용 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              rows={8}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="상세 내용 (HTML 지원)"
            />
          </div>
        </div>

        {/* 이미지 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b">
            이미지
          </h2>

          <div className="grid grid-cols-2 gap-8">
            <ImageUpload
              label="대표 이미지"
              value={formData.imageUrl}
              onChange={(url) => setFormData({ ...formData, imageUrl: url })}
            />
            <ImageUpload
              label="썸네일 이미지"
              value={formData.thumbnailUrl}
              onChange={(url) =>
                setFormData({ ...formData, thumbnailUrl: url })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              영상 URL
            </label>
            <input
              type="url"
              value={formData.videoUrl}
              onChange={(e) =>
                setFormData({ ...formData, videoUrl: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="https://"
            />
          </div>
        </div>

        {/* 연결 제품 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b">
            연결 제품
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
              <label
                key={product.id}
                className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                  formData.productIds.includes(product.id)
                    ? 'border-secondary bg-secondary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={formData.productIds.includes(product.id)}
                  onChange={() => toggleProduct(product.id)}
                  className="w-5 h-5 text-secondary rounded focus:ring-secondary"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{product.name}</p>
                  <p className="text-sm text-gray-600">
                    {product.model} · {product.category}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 기타 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b">
            기타 설정
          </h2>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              표시 순서
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) =>
                setFormData({ ...formData, order: parseInt(e.target.value) })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="0"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPinned"
                checked={formData.isPinned}
                onChange={(e) =>
                  setFormData({ ...formData, isPinned: e.target.checked })
                }
                className="w-5 h-5 text-secondary rounded focus:ring-secondary"
              />
              <label
                htmlFor="isPinned"
                className="text-sm font-semibold text-gray-900"
              >
                주요 사례로 고정
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublished"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
                className="w-5 h-5 text-secondary rounded focus:ring-secondary"
              />
              <label
                htmlFor="isPublished"
                className="text-sm font-semibold text-gray-900"
              >
                즉시 게시
              </label>
            </div>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-4 justify-end">
          <Link
            href="/admin/cases"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '등록 중...' : '사례 등록'}
          </button>
        </div>
      </form>
    </div>
  );
}
