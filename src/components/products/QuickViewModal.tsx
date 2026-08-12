'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

export type QuickViewProduct = {
  id: string;
  name: string;
  badge: string;
  price: string;
  originalPrice: string;
  rating: number;
  reviewsCount: number;
  origin: string;
  description: string;
  image: string;
  weights: string[];
};

type QuickViewModalProps = {
  product: QuickViewProduct | null;
  onClose: () => void;
  onAddToCart?: (product: QuickViewProduct, quantity: number, weight: string) => void;
};

export function QuickViewModal({ product, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedWeight, setSelectedWeight] = useState<string>(product?.weights[0] ?? '1kg');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return null;
  }

  const handleAdd = () => {
    onAddToCart?.(product, quantity, selectedWeight);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng cửa sổ xem nhanh"
        className="fixed inset-0 h-full w-full bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-[#E4E0D8] bg-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-all hover:bg-black/60"
          aria-label="Đóng modal"
        >
          <Icon name="x" size="sm" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-64 w-full bg-[#0E3D34] md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover opacity-90"
            />
            <span className="absolute top-4 left-4 rounded-full bg-[#0E3D34] px-3 py-1 text-[10px] font-extrabold text-white uppercase shadow-sm">
              {product.badge}
            </span>
          </div>

          {/* Details & Action */}
          <div className="flex flex-col justify-between p-6">
            <div>
              <div className="flex items-center gap-1 text-xs text-[#C4922F]">
                <Icon name="star" size="xs" />
                <span className="font-bold text-[#26312D]">{product.rating}</span>
                <span className="text-text-secondary">({product.reviewsCount} đánh giá)</span>
              </div>

              <h2 className="mt-2 text-xl font-extrabold text-[#26312D]">{product.name}</h2>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-[#C4922F]">{product.price}</span>
                <span className="text-xs text-text-secondary line-through">
                  {product.originalPrice}
                </span>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-text-secondary">
                {product.description}
              </p>

              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-text-secondary">
                <Icon name="map-pin" size="xs" className="text-[#0B2F28]" />
                <span>Nguồn gốc: {product.origin}</span>
              </div>

              {/* Weight Selector */}
              <div className="mt-5">
                <span className="text-xs font-bold text-[#26312D]">Chọn quy cách:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {product.weights.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => {
                        setSelectedWeight(w);
                      }}
                      className={`rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                        selectedWeight === w
                          ? 'border-[#0B2F28] bg-[#E4EEEA] text-[#0B2F28]'
                          : 'border-[#E4E0D8] bg-white text-text-secondary hover:border-[#C4922F]/40'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-bold text-[#26312D]">Số lượng:</span>
                <div className="flex items-center rounded-xl border border-[#E4E0D8] bg-[#F5F1E8]">
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity((q) => Math.max(1, q - 1));
                    }}
                    className="px-3 py-1 text-sm font-bold text-text-secondary hover:bg-[#E4EEEA]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-extrabold text-[#26312D]">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setQuantity((q) => q + 1);
                    }}
                    className="px-3 py-1 text-sm font-bold text-text-secondary hover:bg-[#E4EEEA]"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-6 flex items-center gap-3 border-t border-[#E4E0D8]/60 pt-4">
              <button
                type="button"
                onClick={handleAdd}
                className="flex-1 rounded-full bg-[#0B2F28] py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#0E3D34] active:scale-95"
              >
                Thêm Vào Giỏ Hàng
              </button>

              <Link
                href={`/products/${product.id}`}
                onClick={onClose}
                className="rounded-full border border-[#E4E0D8] bg-white px-4 py-3 text-xs font-bold text-[#26312D] hover:bg-[#F5F1E8]"
              >
                Chi Tiết
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
