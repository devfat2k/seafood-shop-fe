'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { OrderItemResponse } from '@/types/order';
import { formatCurrency } from '@/utils/Helpers';

export function OrderTrackingItemList({ items }: { items: OrderItemResponse[] }) {
  return (
    <div className="border-t border-border pt-4">
      <h4 className="font-heading text-xs font-bold tracking-wider text-muted-foreground uppercase">
        Danh Sách Sản Phẩm ({items.length})
      </h4>
      <div className="mt-3 divide-y divide-border/60">
        {items.map((item, idx) => {
          const itemPrice = item.unitPrice ?? item.price ?? 0;
          return (
            <div
              key={item.id ?? `${item.productName}-${idx}`}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center gap-3">
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    width={48}
                    height={48}
                    unoptimized
                    className="h-12 w-12 rounded-lg border border-border object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-muted text-muted-foreground">
                    <Icon name="shopping-bag" size="xs" />
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-foreground">{item.productName}</p>
                  <p className="text-xs text-muted-foreground">
                    Số lượng: {item.quantity} x {formatCurrency(itemPrice)}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-foreground">
                {formatCurrency(itemPrice * item.quantity)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
