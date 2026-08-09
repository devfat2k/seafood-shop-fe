'use client';

import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type CartItem = {
  id: string;
  name: string;
  weight: string;
  price: number;
  quantity: number;
  image: string;
};

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const INITIAL_CART: CartItem[] = [
  {
    id: 'c-1',
    name: 'Set Hải Sản BBQ "Đại Dương Xanh"',
    weight: 'Set 3-4 người ăn',
    price: 980_000,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'c-2',
    name: 'Set Cua Gạch Phan Thiết (2 Con)',
    weight: '1kg / Túi oxy',
    price: 620_000,
    quantity: 1,
    image:
      'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=400&q=80',
  },
];

const FREESHIP_THRESHOLD = 1_500_000;

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [items, setItems] = useState<CartItem[]>(INITIAL_CART);

  if (!isOpen) {
    return null;
  }

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingForFreeship = Math.max(0, FREESHIP_THRESHOLD - subtotal);
  const freeshipProgress = Math.min(100, (subtotal / FREESHIP_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop Button */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng giỏ hàng"
        className="fixed inset-0 h-full w-full bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DBEAFE] text-[#1E3A8A]">
                  <Icon name="shopping-bag" size="sm" />
                </div>
                <h2 className="text-lg font-extrabold text-[#0F172A]">
                  Giỏ Hàng Của Bạn ({items.length})
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-text-secondary hover:bg-[#F1F5F9] hover:text-[#0F172A]"
                aria-label="Đóng giỏ hàng"
              >
                <Icon name="x" size="md" />
              </button>
            </div>

            {/* Freeship Progress Bar */}
            <div className="border-b border-[#F1F5F9] bg-[#F8FAFC] px-6 py-3">
              <p className="text-xs font-semibold text-[#0F172A]">
                {remainingForFreeship > 0 ? (
                  <>
                    Mua thêm{' '}
                    <span className="font-bold text-[#F97316]">
                      {remainingForFreeship.toLocaleString('vi-VN')}₫
                    </span>{' '}
                    để được <span className="font-bold text-emerald-600">FREESHIP</span>!
                  </>
                ) : (
                  <span className="font-bold text-emerald-600">
                    🎉 Bạn đã đủ điều kiện FREESHIP toàn quốc!
                  </span>
                )}
              </p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E2E8F0]">
                <div
                  className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#F97316] transition-all duration-500"
                  style={{ width: `${freeshipProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F1F5F9] text-text-secondary">
                    <Icon name="shopping-cart" size="xl" />
                  </div>
                  <p className="mt-4 text-base font-bold text-[#0F172A]">Giỏ hàng đang trống</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Hãy chọn thêm hải sản tươi ngon cho bữa ăn gia đình
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-6 rounded-full bg-[#1E3A8A] px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#172554]"
                  >
                    Khám Phá Hải Sản
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-[#F1F5F9]">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl border border-[#E2E8F0] object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 text-xs font-bold text-[#0F172A]">
                              {item.name}
                            </h3>
                            <button
                              type="button"
                              onClick={() => {
                                removeItem(item.id);
                              }}
                              className="text-text-secondary hover:text-red-500"
                              aria-label="Xoá món"
                            >
                              <Icon name="trash" size="xs" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-[11px] text-text-secondary">{item.weight}</p>
                        </div>

                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center rounded-lg border border-[#E2E8F0] bg-white">
                            <button
                              type="button"
                              onClick={() => {
                                updateQuantity(item.id, -1);
                              }}
                              className="px-2 py-1 text-xs text-text-secondary hover:bg-[#F1F5F9]"
                            >
                              -
                            </button>
                            <span className="px-2 text-xs font-bold text-[#0F172A]">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                updateQuantity(item.id, 1);
                              }}
                              className="px-2 py-1 text-xs text-text-secondary hover:bg-[#F1F5F9]"
                            >
                              +
                            </button>
                          </div>

                          <span className="text-sm font-extrabold text-[#F97316]">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary */}
            {items.length > 0 && (
              <div className="border-t border-[#E2E8F0] bg-white p-6 shadow-lg">
                <div className="flex items-center justify-between text-sm font-bold text-[#0F172A]">
                  <span>Tạm tính:</span>
                  <span className="text-xl font-black text-[#F97316]">
                    {subtotal.toLocaleString('vi-VN')}₫
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-text-secondary">
                  Giá chưa bao gồm phí giao hàng (nếu có)
                </p>

                <Link
                  href="/checkout"
                  onClick={onClose}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#1E3A8A] py-3.5 text-sm font-bold text-white shadow-lg hover:bg-[#172554]"
                >
                  <span>Tiến Hành Thanh Toán</span>
                  <Icon name="arrow-right" size="sm" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
