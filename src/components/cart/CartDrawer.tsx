'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { useCartStore } from '@/libs/stores/cart';
import type { CartItem } from '@/libs/stores/cart';

export type { CartItem };

type CartDrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

const FREESHIP_THRESHOLD = 1_500_000;

export function CartDrawer(props: CartDrawerProps) {
  const {
    items,
    isOpen: storeIsOpen,
    subtotal,
    closeCart,
    updateQuantity,
    removeItem,
  } = useCartStore();

  const isVisible = props.isOpen ?? storeIsOpen;
  const handleClose = props.onClose ?? closeCart;

  if (!isVisible) {
    return null;
  }

  const remainingForFreeship = Math.max(0, FREESHIP_THRESHOLD - subtotal);
  const freeshipProgress = Math.min(100, (subtotal / FREESHIP_THRESHOLD) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <button
        type="button"
        onClick={handleClose}
        aria-label="Đóng giỏ hàng"
        className="fixed inset-0 h-full w-full animate-in bg-black/60 backdrop-blur-xs transition-opacity fade-in"
      />

      {/* Slide Container: Right on desktop, bottom-to-top on mobile */}
      <div className="fixed inset-x-0 top-auto bottom-0 flex max-h-[85vh] w-full animate-in flex-col rounded-t-2xl slide-in-from-right sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none">
        <div className="flex h-full flex-col bg-card shadow-2xl">
          {/* Mobile Handle bar */}
          <div className="mx-auto my-2 h-1 w-12 rounded-full bg-muted sm:hidden" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
                <Icon name="shopping-bag" size="sm" />
              </div>
              <h2 className="font-heading text-lg font-bold text-foreground">
                Giỏ Hàng Của Bạn ({items.length})
              </h2>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Đóng giỏ hàng"
            >
              <Icon name="x" size="md" />
            </button>
          </div>

          {/* Freeship Progress Bar */}
          <div className="border-b border-border/60 bg-background px-6 py-3">
            <p className="text-xs font-semibold text-foreground">
              {remainingForFreeship > 0 ? (
                <>
                  Mua thêm{' '}
                  <span className="font-bold text-primary">
                    {remainingForFreeship.toLocaleString('vi-VN')}₫
                  </span>{' '}
                  để được <span className="font-bold text-tertiary">FREESHIP</span>!
                </>
              ) : (
                <span className="font-bold text-tertiary">
                  🎉 Bạn đã đủ điều kiện FREESHIP toàn quốc!
                </span>
              )}
            </p>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-gradient-to-r from-secondary to-primary transition-all duration-500"
                style={{ width: `${freeshipProgress}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Icon name="shopping-cart" size="xl" />
                </div>
                <p className="mt-4 font-heading text-base font-bold text-foreground">
                  Giỏ hàng đang trống
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Hãy chọn thêm hải sản tươi ngon cho bữa ăn gia đình
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-6 rounded-lg bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-md transition-opacity hover:opacity-90"
                >
                  Khám Phá Hải Sản
                </button>
              </div>
            ) : (
              <div className="divide-y divide-border/60">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4">
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        unoptimized
                        className="h-20 w-20 shrink-0 rounded-lg border border-border object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="line-clamp-2 text-xs font-bold text-foreground">
                            {item.name}
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              removeItem(item.id);
                            }}
                            className="text-muted-foreground hover:text-destructive"
                            aria-label="Xoá món"
                          >
                            <Icon name="trash" size="xs" />
                          </button>
                        </div>
                        {item.weight && (
                          <p className="mt-0.5 text-[11px] text-muted-foreground">{item.weight}</p>
                        )}
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-lg border border-border bg-background">
                          <button
                            type="button"
                            onClick={() => {
                              updateQuantity(item.id, -1);
                            }}
                            className="px-2 py-1 text-xs font-bold text-muted-foreground hover:bg-muted"
                          >
                            -
                          </button>
                          <span className="px-2 text-xs font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              updateQuantity(item.id, 1);
                            }}
                            className="px-2 py-1 text-xs font-bold text-muted-foreground hover:bg-muted"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-bold text-primary">
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
            <div className="border-t border-border bg-card p-6 shadow-lg">
              <div className="flex items-center justify-between text-sm font-bold text-foreground">
                <span>Tạm tính:</span>
                <span className="text-xl font-bold text-primary">
                  {subtotal.toLocaleString('vi-VN')}₫
                </span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Giá chưa bao gồm phí giao hàng (nếu có)
              </p>

              <Link
                href="/checkout"
                onClick={handleClose}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-98"
              >
                <span>Tiến Hành Thanh Toán</span>
                <Icon name="arrow-right" size="sm" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
