'use client';

import { useState } from 'react';
import type { ProductDetailData } from '@/data/product-detail-mock';
import { Link } from '@/libs/I18nNavigation';

type ProductPurchasePanelProps = {
  product: ProductDetailData;
};

export function ProductPurchasePanel(props: ProductPurchasePanelProps) {
  const { product } = props;
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const subtotal = product.price * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 4000);
  };

  return (
    <div className="relative flex flex-col justify-between">
      <div>
        {/* Category Pill & Rating Badge */}
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-[#E4EEEA] px-3.5 py-1 text-xs font-extrabold text-[#0E3D34]">
            {product.category}
          </span>
          <div className="flex items-center gap-1 rounded-full bg-[#F6E8CC] px-3.5 py-1 text-xs font-extrabold text-[#C4922F]">
            <span>⭐ {product.rating}</span>
            <span>({product.reviewCount} Đánh giá)</span>
          </div>
        </div>

        {/* Product Title */}
        <h1 className="mt-3 text-3xl font-extrabold text-[#26312D] sm:text-4xl">{product.name}</h1>

        {/* Origin & Availability */}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-[#5B6B63]">
          <span>
            📍 Xuất xứ: <strong className="text-[#26312D]">{product.origin}</strong>
          </span>
          <span>•</span>
          <span className="font-bold text-[#3F8F5F]">
            🟢 {product.stockStatus} ({product.inStockCount} con đang bơi)
          </span>
        </div>

        {/* Khung Giá (Cream Box) */}
        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#F5F1E8] p-4">
          <span className="text-3xl font-extrabold text-[#D9A441]">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
          <span className="text-sm text-[#5B6B63] line-through">
            {product.originalPrice.toLocaleString('vi-VN')}đ
          </span>
          <span className="rounded-md bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600">
            -{product.discountPercentage}% GIẢM SỐC
          </span>
        </div>

        {/* Description & Specs List */}
        <p className="mt-5 text-sm leading-relaxed text-[#5B6B63]">{product.shortDescription}</p>

        <ul className="mt-3 space-y-1.5 text-xs text-[#5B6B63]">
          {product.specs.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#0E3D34]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Trust Box (2 Cam Kết) */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.trustItems.map((trust, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-2xl border border-[#E4E0D8] bg-[#FBF8F3] p-3.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E4EEEA] text-[#0E3D34]">
                {trust.icon === 'truck' ? (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                ) : (
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                )}
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#26312D]">{trust.title}</h4>
                <p className="mt-0.5 text-[11px] leading-snug text-[#5B6B63]">{trust.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quantity Stepper & Subtotal */}
        <div className="mt-6 flex items-center justify-between border-t border-[#E4E0D8] pt-5">
          <span className="text-xs font-bold text-[#26312D]">Chọn số lượng:</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-[#E4E0D8] bg-[#F5F1E8] px-2 py-1">
              <button
                type="button"
                aria-label="Giảm số lượng"
                onClick={handleDecrease}
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#26312D] hover:bg-[#E4EEEA]"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#26312D]">{quantity}</span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                onClick={handleIncrease}
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#26312D] hover:bg-[#E4EEEA]"
              >
                +
              </button>
            </div>
            <span className="text-xs text-[#5B6B63]">
              (Tạm tính:{' '}
              <strong className="text-[#0E3D34]">{subtotal.toLocaleString('vi-VN')}đ</strong>)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0E3D34] px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#0B2F28]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span>Thêm Vào Giỏ Hàng</span>
          </button>
          <Link
            href="/checkout"
            className="flex items-center justify-center rounded-full bg-[#D9A441] px-6 py-3.5 text-xs font-bold text-[#26312D] shadow transition-transform hover:scale-105"
          >
            <span>💳 Mua Ngay</span>
          </Link>
        </div>
      </div>

      {/* Floating Toast Notification Overlay (Popover góc phải) */}
      {showToast && (
        <div className="fixed right-6 bottom-6 z-50 flex w-80 animate-in items-center gap-3 rounded-2xl border border-[#E4E0D8] bg-white p-4 shadow-2xl transition-all fade-in slide-in-from-bottom-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-12 w-12 rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#3F8F5F]">✅ Đã thêm thành công!</span>
              <button
                type="button"
                aria-label="Đóng thông báo"
                onClick={() => {
                  setShowToast(false);
                }}
                className="text-xs text-[#5B6B63] hover:text-[#26312D]"
              >
                ✕
              </button>
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs font-bold text-[#26312D]">{product.name}</p>
            <p className="text-[10px] text-[#5B6B63]">
              Số lượng: {quantity} con • {subtotal.toLocaleString('vi-VN')}đ
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Link
                href="/cart"
                className="rounded-full bg-[#D9A441] px-3 py-1 text-[10px] font-bold text-[#26312D]"
              >
                Xem giỏ hàng
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
