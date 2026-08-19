'use client';

import { Icon } from '@/components/common/Icon';
import { useCartStore } from '@/libs/stores/cart';
import type { CartItem } from '@/libs/stores/cart';
import { CartDrawerFooter } from './CartDrawerFooter';
import { CartDrawerItem } from './CartDrawerItem';

export type { CartItem };

type CartDrawerProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export const CartDrawer = (props: CartDrawerProps) => {
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

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <button
        type="button"
        onClick={handleClose}
        aria-label="Đóng giỏ hàng"
        className="fixed inset-0 h-full w-full animate-in bg-black/60 backdrop-blur-xs transition-opacity fade-in"
      />

      <div className="fixed inset-x-0 top-auto bottom-0 flex max-h-[85vh] w-full animate-in flex-col rounded-t-2xl slide-in-from-right sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:max-h-none sm:w-full sm:max-w-md sm:rounded-none">
        <div className="flex h-full flex-col bg-card shadow-2xl">
          <div className="mx-auto my-2 h-1 w-12 rounded-full bg-muted sm:hidden" />

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
                  <CartDrawerItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeItem}
                  />
                ))}
              </div>
            )}
          </div>

          {items.length > 0 && <CartDrawerFooter subtotal={subtotal} onClose={handleClose} />}
        </div>
      </div>
    </div>
  );
};
