'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  model: string;
  category: string;
  thumbnailUrl?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'PUBLISHED' | 'DRAFT'>('ALL');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || []);
      }
    } catch (error) {
      console.error('제품 목록 로딩 실패:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    if (filter === 'ALL') return true;
    if (filter === 'PUBLISHED') return product.isPublished;
    if (filter === 'DRAFT') return !product.isPublished;
    return true;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">제품 관리</h1>
          <p className="text-gray-600 mt-2">등록된 제품을 관리합니다</p>
        </div>
        <Link
          href="/admin/products/new"
          className="px-6 py-3 bg-secondary text-white rounded-xl hover:bg-secondary-dark transition-colors font-medium"
        >
          + 새 제품 등록
        </Link>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-xl p-2 inline-flex gap-2 shadow-sm border border-gray-200">
        <button
          onClick={() => setFilter('ALL')}
          className={`px-6 py-2 rounded-lg transition-all font-medium ${
            filter === 'ALL'
              ? 'bg-secondary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          전체 ({products.length})
        </button>
        <button
          onClick={() => setFilter('PUBLISHED')}
          className={`px-6 py-2 rounded-lg transition-all font-medium ${
            filter === 'PUBLISHED'
              ? 'bg-secondary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          게시 ({products.filter((p) => p.isPublished).length})
        </button>
        <button
          onClick={() => setFilter('DRAFT')}
          className={`px-6 py-2 rounded-lg transition-all font-medium ${
            filter === 'DRAFT'
              ? 'bg-secondary text-white'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          임시저장 ({products.filter((p) => !p.isPublished).length})
        </button>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                제품명
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                카테고리
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                상태
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                등록일
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                관리
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                  등록된 제품이 없습니다
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{product.name}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-600">{product.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.isPublished
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {product.isPublished ? '게시' : '임시저장'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(product.createdAt).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
