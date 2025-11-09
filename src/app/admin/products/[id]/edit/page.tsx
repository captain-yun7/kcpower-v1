'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUpload from '@/components/admin/ImageUpload';

export default function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    category: '',
    tags: [] as string[],
    description: '',
    shortDesc: '',
    capacity: '',
    voltage: '',
    dimensions: '',
    weight: '',
    material: '',
    protection: '',
    imageUrl: '',
    thumbnailUrl: '',
    images: [] as string[],
    brochureUrl: '',
    videoUrl: '',
    order: 0,
    isPublished: false,
  });

  const [tagInput, setTagInput] = useState('');

  const categories = [
    '변압기외함',
    '수배전반',
    '제어반',
    '분전반',
    '기타',
  ];

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      setFetching(true);
      const response = await fetch(`/api/admin/products/${params.id}`);
      if (response.ok) {
        const product = await response.json();
        setFormData({
          name: product.name || '',
          model: product.model || '',
          category: product.category || '',
          tags: product.tags || [],
          description: product.description || '',
          shortDesc: product.shortDesc || '',
          capacity: product.capacity || '',
          voltage: product.voltage || '',
          dimensions: product.dimensions || '',
          weight: product.weight || '',
          material: product.material || '',
          protection: product.protection || '',
          imageUrl: product.imageUrl || '',
          thumbnailUrl: product.thumbnailUrl || '',
          images: product.images || [],
          brochureUrl: product.brochureUrl || '',
          videoUrl: product.videoUrl || '',
          order: product.order || 0,
          isPublished: product.isPublished || false,
        });
      }
    } catch (error) {
      console.error('제품 조회 에러:', error);
      alert('제품 정보를 불러오는데 실패했습니다');
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`/api/admin/products/${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('제품이 수정되었습니다');
        router.push('/admin/products');
      } else {
        const data = await response.json();
        alert(data.error || '제품 수정에 실패했습니다');
      }
    } catch (error) {
      console.error('제품 수정 에러:', error);
      alert('제품 수정에 실패했습니다');
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

  if (fetching) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/admin/products"
          className="text-sm text-gray-600 hover:text-gray-900 mb-4 inline-block"
        >
          ← 목록으로
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">제품 수정</h1>
        <p className="text-gray-600 mt-2">제품 정보를 수정합니다</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 기본 정보 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b">
            기본 정보
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                제품명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: 밀폐형 변압기외함"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                모델명 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: TR-1000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              카테고리 <span className="text-red-500">*</span>
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
            >
              <option value="">카테고리 선택</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
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

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              간단 설명
            </label>
            <input
              type="text"
              value={formData.shortDesc}
              onChange={(e) =>
                setFormData({ ...formData, shortDesc: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="목록에 표시될 짧은 설명"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              상세 설명 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
              placeholder="제품 상세 설명"
            />
          </div>
        </div>

        {/* 스펙 정보 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b">
            스펙 정보
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                용량
              </label>
              <input
                type="text"
                value={formData.capacity}
                onChange={(e) =>
                  setFormData({ ...formData, capacity: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: 1000kVA"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                전압
              </label>
              <input
                type="text"
                value={formData.voltage}
                onChange={(e) =>
                  setFormData({ ...formData, voltage: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: 22.9kV"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                크기
              </label>
              <input
                type="text"
                value={formData.dimensions}
                onChange={(e) =>
                  setFormData({ ...formData, dimensions: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: W2400 × D1800 × H2400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                중량
              </label>
              <input
                type="text"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: 500kg"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                재질
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) =>
                  setFormData({ ...formData, material: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: 스테인리스강"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                보호등급
              </label>
              <input
                type="text"
                value={formData.protection}
                onChange={(e) =>
                  setFormData({ ...formData, protection: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="예: IP65"
              />
            </div>
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
        </div>

        {/* 기타 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pb-4 border-b">
            기타 정보
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                브로셔 URL
              </label>
              <input
                type="url"
                value={formData.brochureUrl}
                onChange={(e) =>
                  setFormData({ ...formData, brochureUrl: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-secondary focus:border-secondary"
                placeholder="https://"
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
              게시
            </label>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-4 justify-end">
          <Link
            href="/admin/products"
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
          >
            취소
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? '수정 중...' : '제품 수정'}
          </button>
        </div>
      </form>
    </div>
  );
}
