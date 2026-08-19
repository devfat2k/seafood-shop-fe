'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { formatCurrency } from '@/utils/Helpers';

type CartDrawerFooterProps = {
  subtotal: number;
  onClose: () => void;
};

export const CartDrawerFooter = ({ subtotal, onClose }: CartDrawerFooterProps) => (
  <div className="border-t border-border bg-card p-6 shadow-lg">
    <div className="flex items-center justify-between text-sm font-bold text-foreground">
      <span>Tạm tính:</span>
      <span className="text-xl font-bold text-primary">{formatCurrency(subtotal)}</span>
    </div>
    <p className="mt-1 text-xs text-muted-foreground">Giá chưa bao gồm phí giao hàng (nếu có)</p>

    <Link
      href="/checkout"
      onClick={onClose}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 text-sm font-bold text-white shadow-md transition-all hover:opacity-90 active:scale-98"
    >
      <span>Tiến Hành Thanh Toán</span>
      <Icon name="arrow-right" size="sm" />
    </Link>
  </div>
);
