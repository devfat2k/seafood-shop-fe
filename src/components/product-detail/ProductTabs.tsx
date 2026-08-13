'use client';

import { useState } from 'react';
import type { Product } from '@/types/api';

type ProductTabsProps = {
  product: Product;
  descriptionHtml?: string;
  recipeGuideHtml?: string;
  reviews?: Array<{
    id: string | number;
    author: string;
    avatar?: string;
    rating: number;
    date: string;
    comment: string;
  }>;
};

export function ProductTabs(props: ProductTabsProps) {
  const { product, descriptionHtml, recipeGuideHtml, reviews = [] } = props;
  const [activeTab, setActiveTab] = useState<'description' | 'recipe' | 'reviews'>('description');
  const reviewCount = product.reviewCount ?? reviews.length;

  return (
    <div className="mt-12 rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-sm lg:p-8">
      {/* Tab Headers */}
      <div className="flex border-b border-[#E4E0D8] text-sm font-bold">
        <button
          type="button"
          onClick={() => setActiveTab('description')}
          className={`border-b-2 px-6 py-3 transition-colors ${
            activeTab === 'description'
              ? 'border-[#0E3D34] text-[#0E3D34]'
              : 'border-transparent text-[#5B6B63] hover:text-[#26312D]'
          }`}
        >
          Mô Tả Sản Phẩm
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('recipe')}
          className={`border-b-2 px-6 py-3 transition-colors ${
            activeTab === 'recipe'
              ? 'border-[#0E3D34] text-[#0E3D34]'
              : 'border-transparent text-[#5B6B63] hover:text-[#26312D]'
          }`}
        >
          Hướng Dẫn Chế Biến
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reviews')}
          className={`border-b-2 px-6 py-3 transition-colors ${
            activeTab === 'reviews'
              ? 'border-[#0E3D34] text-[#0E3D34]'
              : 'border-transparent text-[#5B6B63] hover:text-[#26312D]'
          }`}
        >
          Đánh Giá ({reviewCount})
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="mt-6">
        {activeTab === 'description' && (
          <div className="prose max-w-none text-sm text-[#5B6B63]">
            {descriptionHtml ? (
              <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
            ) : (
              <p>{product.description ?? 'Đang cập nhật thông tin mô tả chi tiết sản phẩm.'}</p>
            )}
          </div>
        )}

        {activeTab === 'recipe' && (
          <div className="prose max-w-none text-sm text-[#5B6B63]">
            {recipeGuideHtml ? (
              <div dangerouslySetInnerHTML={{ __html: recipeGuideHtml }} />
            ) : (
              <div>
                <h3 className="text-xl font-bold text-[#26312D] mb-3">Gợi Ý Chế Biến Món Ngon</h3>
                <ul className="list-disc pl-5 text-sm space-y-2 text-[#5B6B63]">
                  <li><strong>Hấp sả / Nướng bơ tỏi:</strong> Giữ nguyên vị ngọt thanh tự nhiên của hải sản tươi sống.</li>
                  <li><strong>Lẩu hải sản Thái chua cay:</strong> Kết hợp cùng nước lẩu đậm đà thơm mùi sả ớt.</li>
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#26312D]">
              Đánh Giá Từ Khách Hàng ({reviews.length})
            </h3>
            {reviews.length === 0 ? (
              <p className="text-xs text-[#5B6B63]">Chưa có đánh giá nào cho sản phẩm này.</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div key={rev.id} className="rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {rev.avatar && (
                          <img
                            src={rev.avatar}
                            alt={rev.author}
                            className="h-9 w-9 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <p className="text-xs font-bold text-[#26312D]">{rev.author}</p>
                          <p className="text-[10px] text-[#5B6B63]">{rev.date}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#C4922F]">
                        {'★'.repeat(rev.rating)}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-[#5B6B63]">{rev.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
