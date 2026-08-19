'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { CartItem } from '@/libs/stores/cart';
import { formatCurrency } from '@/utils/Helpers';

type CheckoutItemsSummaryProps = {
  items: CartItem[];
  note: string;
  onNoteChange: (val: string) => void;
};

export const CheckoutItemsSummary = ({ items, note, onNoteChange }: CheckoutItemsSummaryProps) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-xs">
    <div className="flex items-center gap-2 border-b border-border pb-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
        <Icon name="shopping-bag" size="sm" />
      </div>
      <div>
        <h2 className="font-heading text-base font-bold text-foreground">
          Kiện Hải Sản Đặt Mua ({items.length})
        </h2>
        <p className="text-xs text-muted-foreground">
          Cam kết tươi sống 100%, bù 1 đổi 1 nếu không đạt chất lượng
        </p>
      </div>
    </div>

    <div className="divide-y divide-border/60">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-4 py-4">
          <div className="flex items-center gap-3">
            {item.image && (
              <Image
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
                unoptimized
                className="h-16 w-16 shrink-0 rounded-xl border border-border object-cover"
              />
            )}
            <div>
              <h3 className="text-xs font-bold text-foreground sm:text-sm">{item.name}</h3>
              {item.weight && (
                <p className="text-xs text-muted-foreground">Quy cách: {item.weight}</p>
              )}
              <p className="mt-1 text-xs font-semibold text-secondary">
                Số lượng: <span className="font-bold">{item.quantity}</span> x{' '}
                {formatCurrency(item.price)}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-sm font-bold text-foreground sm:text-base">
              {formatCurrency(item.price * item.quantity)}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div className="border-t border-border pt-4">
      <label htmlFor="order-note" className="block text-xs font-bold text-foreground">
        Ghi chú đơn hàng (Tùy chọn)
      </label>
      <textarea
        id="order-note"
        aria-label="Ghi chú đơn hàng"
        value={note}
        onChange={(e) => {
          onNoteChange(e.target.value);
        }}
        placeholder="Ví dụ: Giao trước 11h trưa để làm tiệc, gọi trước khi giao 15 phút..."
        rows={2}
        maxLength={500}
        className="mt-1.5 w-full rounded-xl border border-border bg-background p-3 text-xs text-foreground placeholder:text-muted-foreground focus:border-secondary focus:ring-2 focus:ring-secondary/20 focus:outline-none"
      />
    </div>
  </div>
);
