'use client';

import { Icon } from '@/components/common/Icon';
import type { OrderResponse } from '@/types/order';
import { formatCurrency } from '@/utils/Helpers';
import { OrderTrackingItemList } from './OrderTrackingItemList';
import { OrderTrackingRecipient } from './OrderTrackingRecipient';
import { OrderTrackingTimeline } from './OrderTrackingTimeline';

type OrderTrackingModalProps = {
  order: OrderResponse | null;
  onClose: () => void;
};

export function OrderTrackingModal({ order, onClose }: OrderTrackingModalProps) {
  if (!order) {
    return null;
  }

  const displayCode = order.code?.startsWith('#')
    ? order.code
    : `#${order.code ?? (order.id ? `DH-${order.id}` : 'ORD')}`;
  const items = order.items ?? order.orderItems ?? [];
  const totalPrice = order.totalPrice ?? order.totalAmount ?? 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="fixed inset-0 animate-in cursor-default bg-black/60 backdrop-blur-xs transition-opacity fade-in"
        onClick={onClose}
        aria-label="Đóng modal"
      />

      <div className="relative max-h-[90vh] w-full max-w-2xl animate-in overflow-y-auto rounded-2xl border border-border bg-card p-6 shadow-2xl zoom-in-95 sm:p-8">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <div>
            <span className="text-xs font-semibold text-secondary">Chi Tiết Đơn Hàng</span>
            <h3 className="font-heading text-lg font-bold text-foreground">{displayCode}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Đóng modal"
          >
            <Icon name="x" size="sm" />
          </button>
        </div>

        <OrderTrackingRecipient
          addressSnapshot={order.shippingAddressSnapshot}
          paymentMethod={order.paymentMethod}
        />

        <OrderTrackingTimeline status={order.status} />

        <OrderTrackingItemList items={items} />

        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">Tổng tiền thanh toán:</span>
          <span className="text-base font-bold text-primary sm:text-lg">
            {formatCurrency(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}
