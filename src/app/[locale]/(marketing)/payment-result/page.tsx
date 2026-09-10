'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { PaymentFailedState } from '@/components/checkout/payment-result/PaymentFailedState';
import { PaymentSuccessState } from '@/components/checkout/payment-result/PaymentSuccessState';
import { useOrderDetailQuery } from '@/libs/queries/orders';
import type { OrderResponse } from '@/types/order';
import { formatCurrency } from '@/utils/Helpers';

const getDisplayTotal = (order?: OrderResponse | null) => {
  if (order?.totalPrice) {
    return formatCurrency(order.totalPrice);
  }
  if (order?.totalAmount) {
    return formatCurrency(order.totalAmount);
  }
  return '0₫';
};

const getDisplayPaymentMethod = (orderMethod?: string, paramMethod?: string | null) => {
  if (orderMethod) {
    return orderMethod;
  }
  if (paramMethod === 'COD') {
    return 'Tiền mặt khi nhận hàng (COD)';
  }
  if (paramMethod === 'QR_BANK') {
    return 'Chuyển khoản VietQR 24/7';
  }
  return 'Cổng VNPAY (Thẻ / QR)';
};

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
  const displayTotal = getDisplayTotal(order);
  const displayPaymentMethod = getDisplayPaymentMethod(order?.paymentMethod, paymentMethodParam);

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
