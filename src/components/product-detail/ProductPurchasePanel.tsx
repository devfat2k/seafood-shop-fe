'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
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
          <span className="rounded-full bg-[#DBEAFE] px-3.5 py-1 text-xs font-extrabold text-[#1E3A8A]">
            {product.category}
          </span>
          <div className="flex items-center gap-1.5 rounded-full bg-[#FFEDD5] px-3.5 py-1 text-xs font-extrabold text-[#EA580C]">
            <Icon name="star" size="xs" className="fill-current text-[#EA580C]" />
            <span>{product.rating}</span>
            <span>({product.reviewCount} Đánh giá)</span>
          </div>
        </div>

        {/* Product Title */}
        <h1 className="mt-3 text-3xl font-extrabold text-[#0F172A] sm:text-4xl">{product.name}</h1>

        {/* Origin & Availability */}
        <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <Icon name="map-pin" size="xs" />
            <span>Xuất xứ:</span>
            <strong className="text-[#0F172A]">{product.origin}</strong>
          </span>
          <span>•</span>
          <span className="font-bold text-[#16A34A]">
            🟢 {product.stockStatus} ({product.inStockCount} con đang bơi)
          </span>
        </div>

        {/* Khung Giá (Cream Box) */}
        <div className="mt-5 flex items-center gap-4 rounded-2xl bg-[#EDF2F7] p-4">
          <span className="text-3xl font-extrabold text-[#F97316]">
            {product.price.toLocaleString('vi-VN')}đ
          </span>
          <span className="text-sm text-text-secondary line-through">
            {product.originalPrice.toLocaleString('vi-VN')}đ
          </span>
          <span className="rounded-md bg-red-100 px-2.5 py-1 text-xs font-bold text-red-600">
            -{product.discountPercentage}% GIẢM SỐC
          </span>
        </div>

        {/* Description & Specs List */}
        <p className="mt-5 text-sm leading-relaxed text-text-secondary">
          {product.shortDescription}
        </p>

        <ul className="mt-3 space-y-1.5 text-xs text-text-secondary">
          {product.specs.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#1E3A8A]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Trust Box (2 Cam Kết) */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {product.trustItems.map((trust, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] p-3.5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#DBEAFE] text-[#1E3A8A]">
                <Icon name={trust.icon === 'truck' ? 'truck' : 'shield-check'} size="md" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0F172A]">{trust.title}</h4>
                <p className="mt-0.5 text-[11px] leading-snug text-text-secondary">{trust.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quantity Stepper & Subtotal */}
        <div className="mt-6 flex items-center justify-between border-t border-[#E2E8F0] pt-5">
          <span className="text-xs font-bold text-[#0F172A]">Chọn số lượng:</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-full border border-[#E2E8F0] bg-[#EDF2F7] px-2 py-1">
              <button
                type="button"
                aria-label="Giảm số lượng"
                onClick={handleDecrease}
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#0F172A] hover:bg-[#DBEAFE]"
              >
                <Icon name="minus" size="xs" />
              </button>
              <span className="w-8 text-center text-xs font-bold text-[#0F172A]">{quantity}</span>
              <button
                type="button"
                aria-label="Tăng số lượng"
                onClick={handleIncrease}
                className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-[#0F172A] hover:bg-[#DBEAFE]"
              >
                <Icon name="plus" size="xs" />
              </button>
            </div>
            <span className="text-xs text-text-secondary">
              (Tạm tính:{' '}
              <strong className="text-[#1E3A8A]">{subtotal.toLocaleString('vi-VN')}đ</strong>)
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#1E3A8A] px-6 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#172554]"
          >
            <Icon name="shopping-bag" size="sm" />
            <span>Thêm Vào Giỏ Hàng</span>
          </button>
          <Link
            href="/checkout"
            className="flex items-center justify-center gap-1.5 rounded-full bg-[#F97316] px-6 py-3.5 text-xs font-bold text-white shadow transition-transform hover:scale-105 hover:bg-[#EA580C]"
          >
            <Icon name="shopping-cart" size="xs" />
            <span>Mua Ngay</span>
          </Link>
        </div>
      </div>

      {/* Floating Toast Notification Overlay (Popover góc phải) */}
      {showToast && (
        <div className="fixed right-6 bottom-6 z-50 flex w-80 animate-in items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 shadow-2xl transition-all fade-in slide-in-from-bottom-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-12 w-12 rounded-xl object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#16A34A]">✅ Đã thêm thành công!</span>
              <button
                type="button"
                aria-label="Đóng thông báo"
                onClick={() => {
                  setShowToast(false);
                }}
                className="text-xs text-text-secondary hover:text-[#0F172A]"
              >
                <Icon name="x" size="xs" />
              </button>
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs font-bold text-[#0F172A]">{product.name}</p>
            <p className="text-[10px] text-text-secondary">
              Số lượng: {quantity} con • {subtotal.toLocaleString('vi-VN')}đ
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Link
                href="/cart"
                className="rounded-full bg-[#F97316] px-3 py-1 text-[10px] font-bold text-white"
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
