'use client';

import { useEffect } from 'react';
import { Icon } from '@/components/common/Icon';
import type { PaymentMethod } from '@/types/payment';

type PaymentWaitingOverlayProps = {
  orderId: string | number;
  paymentMethod: PaymentMethod;
  onConfirmed: (status: 'success' | 'failed') => void;
};

const METHOD_LABEL: Record<PaymentMethod, string> = {
  VNPAY: 'VNPAY',
  MOMO: 'MoMo',
  ZALOPAY: 'ZaloPay',
  COD: 'COD',
};

export function PaymentWaitingOverlay({
  orderId,
  paymentMethod,
  onConfirmed,
}: PaymentWaitingOverlayProps) {
  // Lắng nghe broadcast từ tab payment-result
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      const channel = new BroadcastChannel('payment_status');

      const handleMessage = (
        event: MessageEvent<{ type: string; orderId: string; status: 'success' | 'failed' }>,
      ) => {
        if (event.data?.type === 'payment_complete' && event.data.orderId === String(orderId)) {
          onConfirmed(event.data.status);
        }
      };

      channel.addEventListener('message', handleMessage);
      cleanup = () => {
        channel.removeEventListener('message', handleMessage);
        channel.close();
      };
    }

    return cleanup;
  }, [orderId, onConfirmed]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* Card */}
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-accent" />

        <div className="p-8">
          {/* Spinner */}
          <div className="flex justify-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Icon name="credit-card" size="md" className="text-primary" />
              </div>
            </div>
          </div>

          <h2 className="mt-6 text-center font-heading text-xl font-black text-foreground">
            Đang Chờ Thanh Toán
          </h2>

          <p className="mt-2 text-center text-xs leading-relaxed text-muted-foreground">
            Cổng thanh toán{' '}
            <span className="font-bold text-foreground">{METHOD_LABEL[paymentMethod]}</span> đã được
            mở ở tab mới. Vui lòng hoàn tất giao dịch tại đó.
          </p>

          {/* Auto-detect notice */}
          <div className="mt-4 flex items-center justify-center gap-1.5 rounded-xl bg-muted/60 px-4 py-2.5 text-[11px] text-muted-foreground">
            <Icon name="zap" size="xs" className="shrink-0 text-secondary" />
            <span>Trang này tự động cập nhật khi bạn hoàn tất thanh toán</span>
          </div>

          {/* Order ID */}
          <p className="mt-4 text-center text-[11px] text-muted-foreground">
            Mã đơn: <span className="font-mono font-semibold text-foreground">#{orderId}</span>
          </p>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => {
                onConfirmed('success');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] hover:opacity-90 active:scale-100"
            >
              <Icon name="check-circle" size="sm" />
              <span>Tôi Đã Thanh Toán Xong</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onConfirmed('failed');
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-xs font-bold text-muted-foreground shadow-xs transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon name="x-circle" size="sm" />
              <span>Hủy Thanh Toán</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
