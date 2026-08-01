'use client';

import { useState } from 'react';
import type { ProductDetailData } from '@/data/product-detail-mock';

type ProductTabsProps = {
  product: ProductDetailData;
};

export function ProductTabs(props: ProductTabsProps) {
  const { product } = props;
  const [activeTab, setActiveTab] = useState<'description' | 'recipe' | 'reviews'>('description');

  return (
    <div className="mt-12 rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-sm lg:p-8">
      {/* Tab Headers */}
      <div className="flex border-b border-[#E4E0D8] text-sm font-bold">
        <button
          type="button"
          onClick={() => {
            setActiveTab('description');
          }}
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
          onClick={() => {
            setActiveTab('recipe');
          }}
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
          onClick={() => {
            setActiveTab('reviews');
          }}
          className={`border-b-2 px-6 py-3 transition-colors ${
            activeTab === 'reviews'
              ? 'border-[#0E3D34] text-[#0E3D34]'
              : 'border-transparent text-[#5B6B63] hover:text-[#26312D]'
          }`}
        >
          Đánh Giá ({product.reviewCount})
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="mt-6">
        {activeTab === 'description' && (
          <div
            className="prose max-w-none text-sm text-[#5B6B63]"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        )}

        {activeTab === 'recipe' && (
          <div
            className="prose max-w-none text-sm text-[#5B6B63]"
            dangerouslySetInnerHTML={{ __html: product.recipeGuideHtml }}
          />
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-[#26312D]">
              Đánh Giá Từ Khách Hàng ({product.reviews.length})
            </h3>
            <div className="space-y-4">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={rev.avatar}
                        alt={rev.author}
                        className="h-9 w-9 rounded-full object-cover"
                      />
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
          </div>
        )}
      </div>
    </div>
  );
}
