'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { PaymentFailedState } from '@/components/checkout/payment-result/PaymentFailedState';
import { PaymentSuccessState } from '@/components/checkout/payment-result/PaymentSuccessState';
import { useOrderDetailQuery } from '@/libs/queries/orders';
import { formatCurrency } from '@/utils/Helpers';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams?.get('status')?.toLowerCase() ?? 'success';
  const orderId = searchParams?.get('orderId');
  const paymentId = searchParams?.get('paymentId');
  const paymentMethodParam = searchParams?.get('paymentMethod');

  const isSuccess = rawStatus === 'success' || rawStatus === '00';
  const isPendingQr = rawStatus === 'pending_qr';

  const { data: order } = useOrderDetailQuery(orderId ?? '', Boolean(orderId));

  const displayOrderCode = order?.code ?? (orderId ? `#ORD-${orderId}` : '#SF-89241');
  const displayTotal = order?.totalPrice
    ? formatCurrency(order.totalPrice)
    : order?.totalAmount
      ? formatCurrency(order.totalAmount)
      : '0₫';
  const displayPaymentMethod =
    order?.paymentMethod ??
    (paymentMethodParam === 'COD'
      ? 'Tiền mặt khi nhận hàng (COD)'
      : paymentMethodParam === 'QR_BANK'
        ? 'Chuyển khoản VietQR 24/7'
        : 'Cổng VNPAY (Thẻ / QR)');

  return (
    <div className="min-h-[80vh] bg-background py-10 lg:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10">
          {isSuccess || isPendingQr ? (
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
