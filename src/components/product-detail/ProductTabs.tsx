'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import type { Product } from '@/types/api';

type ProductTabsProps = {
  product: Product;
};

const DEFAULT_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Phạm Hoàng Yến',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    size: 'Quy cách chuẩn',
    date: '10/08/2026',
    rating: 5,
    comment:
      'Hải sản giao đến nhà tươi rói, đóng gói chu đáo giữ lạnh tốt. Ăn ngọt lịm chắc thịt. Sẽ ủng hộ lâu dài!',
  },
  {
    id: 'rev-2',
    author: 'Lê Minh Hoàng',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    size: 'Đóng khay hút chân không',
    date: '05/08/2026',
    rating: 5,
    comment:
      'Hàng tươi ngon, cân đúng trọng lượng cam kết. Chuỗi lạnh giao hàng rất chuyên nghiệp, đóng gói cẩn thận.',
  },
];

export function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews'>('description');
  const reviewCount = product.reviewCount ?? 48;
  const rating = product.rating ?? 4.9;

  return (
    <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card shadow-xs">
      {/* Tab Headers */}
      <div className="flex scrollbar-none overflow-x-auto border-b border-border bg-background">
        <button
          type="button"
          onClick={() => {
            setActiveTab('description');
          }}
          className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-all sm:px-8 sm:text-sm ${
            activeTab === 'description'
              ? 'border-b-2 border-primary text-primary'
              : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Mô tả sản phẩm
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('specs');
          }}
          className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-all sm:px-8 sm:text-sm ${
            activeTab === 'specs'
              ? 'border-b-2 border-primary text-primary'
              : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Thông số kỹ thuật
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('reviews');
          }}
          className={`px-6 py-4 text-xs font-bold whitespace-nowrap transition-all sm:px-8 sm:text-sm ${
            activeTab === 'reviews'
              ? 'border-b-2 border-primary text-primary'
              : 'border-b-2 border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          Đánh giá thực tế ({reviewCount})
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-6 sm:p-8">
        {/* Tab 1: Description */}
        {activeTab === 'description' && (
          <div className="space-y-6">
            <div className="space-y-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              <p className="font-heading text-base font-bold text-foreground sm:text-lg">
                {product.name} — Đặc sản biển tự nhiên từ vùng biển Phan Thiết, Bình Thuận.
              </p>
              <p>
                {product.description ??
                  'Sản phẩm được ngư dân Phan Thiết đánh bắt tự nhiên trong ngày bằng phương pháp thủ công, đảm bảo hải sản không bị dập nát hay mất độ tươi. Ngay sau khi kéo lưới, hải sản được bảo quản bằng đá tuyết hoặc bể oxy chuyển lạnh 2H về TP.HCM.'}
              </p>
              <p>
                Cam kết 100% hải sản sạch tự nhiên, không sử dụng chất bảo quản hay hóa chất tẩy
                rửa. Hoàn tiền hoặc đổi mới 1-1 nếu chất lượng không đạt chuẩn tươi ngon khi nhận
                hàng.
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && (
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-left text-xs sm:text-sm">
                <tbody className="divide-y divide-border">
                  <tr className="bg-muted/30">
                    <td className="w-1/3 px-4 py-3 font-bold text-foreground sm:px-6">
                      Tên sản phẩm
                    </td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">{product.name}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-foreground sm:px-6">
                      Nguồn gốc / Xuất xứ
                    </td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">
                      {product.origin ?? 'Cảng cá Phan Thiết, Bình Thuận'}
                    </td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="px-4 py-3 font-bold text-foreground sm:px-6">
                      Quy cách đóng gói
                    </td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">
                      {product.spec ?? 'Túi oxy / Hút chân không đóng thùng xốp đá gel'}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-foreground sm:px-6">Danh mục</td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">
                      {product.categoryName ?? 'Hải Sản Tươi Sống'}
                    </td>
                  </tr>
                  <tr className="bg-muted/30">
                    <td className="px-4 py-3 font-bold text-foreground sm:px-6">Bảo quản</td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">
                      Bể oxy lạnh (đối với hàng sống) hoặc ngăn đông -18°C
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-foreground sm:px-6">Hạn sử dụng</td>
                    <td className="px-4 py-3 text-muted-foreground sm:px-6">
                      Dùng ngon nhất trong vòng 24 - 48h sau khi nhận
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Reviews */}
        {activeTab === 'reviews' && (
          <div className="space-y-8">
            <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-background p-6 sm:flex-row sm:p-8">
              <div className="flex items-center gap-4">
                <span className="font-heading text-4xl font-bold text-foreground sm:text-5xl">
                  {rating}
                </span>
                <div>
                  <div className="flex items-center gap-1 text-accent">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Icon key={i} name="star" size="sm" />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Dựa trên {reviewCount} đánh giá từ khách hàng đã mua
                  </span>
                </div>
              </div>
            </div>

            {/* Reviews List */}
            <div className="divide-y divide-border/60">
              {DEFAULT_REVIEWS.map((rev) => (
                <div key={rev.id} className="space-y-3 py-6 first:pt-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={rev.avatar}
                        alt={rev.author}
                        width={36}
                        height={36}
                        unoptimized
                        className="h-9 w-9 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-foreground">{rev.author}</h4>
                        <span className="text-[10px] text-muted-foreground">
                          {rev.size} • {rev.date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5 text-accent">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Icon key={i} name="star" size="xs" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{rev.comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
