'use client';

import Image from 'next/image';
import { Icon } from '@/components/common/Icon';
import type { OrderResponse, OrderStatus } from '@/types/order';

export function getStatusBadge(status: OrderStatus) {
  switch (status) {
    case 'SHIPPED': {
      return {
        label: 'Đang giao 2H',
        className: 'bg-secondary/15 text-secondary border-secondary/30',
        icon: 'truck' as const,
      };
    }
    case 'DONE': {
      return {
        label: 'Giao thành công',
        className: 'bg-tertiary/15 text-tertiary border-tertiary/30',
        icon: 'check' as const,
      };
    }
    case 'CONFIRMED': {
      return {
        label: 'Đã xác nhận',
        className: 'bg-secondary/15 text-secondary border-secondary/30',
        icon: 'check' as const,
      };
    }
    case 'PENDING': {
      return {
        label: 'Chờ xử lý',
        className: 'bg-accent/15 text-accent border-accent/30',
        icon: 'clock' as const,
      };
    }
    case 'CANCELLED': {
      return {
        label: 'Đã hủy',
        className: 'bg-destructive/15 text-destructive border-destructive/30',
        icon: 'x' as const,
      };
    }
    default: {
      return {
        label: status,
        className: 'bg-muted text-muted-foreground border-border',
        icon: 'shopping-bag' as const,
      };
    }
  }
}

type OrderCardProps = {
  order: OrderResponse;
  onOpenTracking: (order: OrderResponse) => void;
  onOpenCancel: (order: OrderResponse) => void;
};

export function OrderCard({ order, onOpenTracking, onOpenCancel }: OrderCardProps) {
  const badge = getStatusBadge(order.status);
  const items = order.items ?? [];
  const [firstItem] = items;
  const otherItemsCount = Math.max(0, items.length - 1);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-xs transition-all hover:border-secondary/30 sm:p-6">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-foreground sm:text-sm">
            #{order.code || `ORD-${order.id}`}
          </span>
          <span className="text-xs text-muted-foreground">
            {order.orderDate
              ? new Date(order.orderDate).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                })
              : 'Gần đây'}
          </span>
        </div>

        <div
          className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${badge.className}`}
        >
          <Icon name={badge.icon} size="xs" />
          <span>{badge.label}</span>
        </div>
      </div>

      {/* Items Preview */}
      <div className="my-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {firstItem?.imageUrl ? (
            <Image
              src={firstItem.imageUrl}
              alt={firstItem.productName}
              width={64}
              height={64}
              unoptimized
              className="h-16 w-16 rounded-xl border border-border object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground">
              <Icon name="shopping-bag" size="sm" />
            </div>
          )}
          <div>
            <h4 className="line-clamp-1 text-xs font-bold text-foreground sm:text-sm">
              {firstItem?.productName ?? 'Đơn hàng hải sản'}
            </h4>
            <p className="text-xs text-muted-foreground">
              {firstItem ? `Số lượng: ${firstItem.quantity}` : `${items.length} món`}
              {otherItemsCount > 0 && ` (+ ${otherItemsCount} sản phẩm khác)`}
            </p>
          </div>
        </div>

        <div className="text-right sm:self-center">
          <span className="block text-xs text-muted-foreground">Tổng thanh toán</span>
          <span className="text-base font-bold text-primary sm:text-lg">
            {order.totalPrice.toLocaleString('vi-VN')}₫
          </span>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-end gap-2 border-t border-border pt-4">
        {order.status === 'PENDING' && (
          <button
            type="button"
            onClick={() => {
              onOpenCancel(order);
            }}
            className="rounded-xl border border-border px-3.5 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
          >
            Hủy Đơn
          </button>
        )}

        <button
          type="button"
          onClick={() => {
            onOpenTracking(order);
          }}
          className="flex items-center gap-1.5 rounded-xl bg-secondary/15 px-4 py-1.5 text-xs font-bold text-secondary transition-colors hover:bg-secondary/25"
        >
          <Icon name="truck" size="xs" />
          <span>Theo Dõi Đơn Hàng</span>
        </button>
      </div>
    </div>
  );
}
