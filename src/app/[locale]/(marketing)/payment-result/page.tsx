'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { PaymentFailedState } from '@/components/checkout/payment-result/PaymentFailedState';
import { PaymentSuccessState } from '@/components/checkout/payment-result/PaymentSuccessState';
import { useOrderDetailQuery } from '@/libs/queries/orders';
import { formatCurrency } from '@/utils/Helpers';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams?.get('status')?.toLowerCase();
  const orderId = searchParams?.get('orderId');
  const paymentId = searchParams?.get('paymentId');
  const paymentMethodParam = searchParams?.get('paymentMethod');

  const initialStatus = rawStatus === 'failed' ? 'failed' : 'success';
  const [status, setStatus] = useState<'success' | 'failed'>(initialStatus);

  useEffect(() => {
    if (!orderId || !('BroadcastChannel' in window)) {
      return;
    }
    const channel = new BroadcastChannel('payment_status');
    /* eslint-disable unicorn/require-post-message-target-origin */
    channel.postMessage({
      type: 'payment_complete',
      orderId,
      status: initialStatus,
    });
    /* eslint-enable unicorn/require-post-message-target-origin */
    channel.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: order } = useOrderDetailQuery(orderId ?? '', Boolean(orderId));

  const displayOrderCode = order?.code ?? (orderId ? `#ORD-${orderId}` : '#SF-89241');
  const displayTotal = order?.totalPrice ? formatCurrency(order.totalPrice) : '1.600.000₫';
  const displayPaymentMethod =
    order?.paymentMethod ??
    (paymentMethodParam === 'COD' ? 'Tiền mặt khi nhận hàng (COD)' : 'Cổng VNPAY (Thẻ / QR)');

  return (
    <div className="min-h-[80vh] bg-background py-12 lg:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="text-xs font-bold text-muted-foreground">Trạng thái giao dịch:</span>
          <div className="flex rounded-full border border-border bg-card p-1 shadow-xs">
            <button
              type="button"
              onClick={() => {
                setStatus('success');
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                status === 'success'
                  ? 'bg-tertiary text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Thành Công
            </button>
            <button
              type="button"
              onClick={() => {
                setStatus('failed');
              }}
              className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                status === 'failed'
                  ? 'bg-destructive text-white shadow-xs'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Thất Bại
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10">
          {status === 'success' ? (
            <PaymentSuccessState
              displayOrderCode={displayOrderCode}
              paymentId={paymentId}
              displayTotal={displayTotal}
              displayPaymentMethod={displayPaymentMethod}
            />
          ) : (
            <PaymentFailedState displayOrderCode={displayOrderCode} />
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[80vh] bg-background py-12 text-center text-xs">Đang tải...</div>
      }
    >
      <PaymentResultContent />
    </Suspense>
  );
}
