'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { useOrderDetailQuery } from '@/libs/queries/orders';

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const rawStatus = searchParams?.get('status')?.toLowerCase();
  const orderId = searchParams?.get('orderId');
  const paymentId = searchParams?.get('paymentId');
  const paymentMethodParam = searchParams?.get('paymentMethod');

  const initialStatus = rawStatus === 'failed' ? 'failed' : 'success';
  const [status, setStatus] = useState<'success' | 'failed'>(initialStatus);

  const { data: order } = useOrderDetailQuery(orderId ?? '', Boolean(orderId));

  const displayOrderCode = order?.code ?? (orderId ? `#ORD-${orderId}` : '#SF-89241');
  const displayTotal = order?.totalPrice
    ? `${order.totalPrice.toLocaleString('vi-VN')}₫`
    : '1.600.000₫';
  const displayPaymentMethod =
    order?.paymentMethod ??
    (paymentMethodParam === 'COD' ? 'Tiền mặt khi nhận hàng (COD)' : 'Cổng VNPAY (Thẻ / QR)');

  return (
    <div className="min-h-[80vh] bg-background py-12 lg:py-20">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        {/* Toggle Switcher for preview / demo */}
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

        {/* Main Result Card */}
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10">
          {status === 'success' ? (
            /* SUCCESS STATE */
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-tertiary/15 text-tertiary">
                <Icon name="check" size="xl" />
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-tertiary/30 bg-tertiary/10 px-3.5 py-1 text-xs font-extrabold text-tertiary">
                <Icon name="sparkles" size="xs" />
                <span>ĐẶT HÀNG &amp; THANH TOÁN THÀNH CÔNG</span>
              </div>

              <h1 className="mt-4 font-heading text-2xl font-black text-foreground sm:text-3xl">
                Cảm Ơn Bạn Đã Đặt Hàng!
              </h1>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Đơn hàng hải sản tươi sống của bạn đã được tiếp nhận và đang được chuẩn bị đóng
                thùng oxy giao hỏa tốc.
              </p>

              {/* Order Details Box */}
              <div className="mt-8 space-y-4 rounded-2xl border border-border bg-muted/40 p-6 text-left">
                <div className="flex items-center justify-between border-b border-border pb-3 text-xs font-bold text-foreground">
                  <span>Mã đơn hàng:</span>
                  <span className="font-mono text-sm text-primary">{displayOrderCode}</span>
                </div>

                {paymentId && (
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Mã giao dịch VNPAY:</span>
                    <span className="font-mono font-medium text-foreground">{paymentId}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Tổng tiền đơn hàng:</span>
                  <span className="text-base font-extrabold text-accent">{displayTotal}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Phương thức thanh toán:</span>
                  <span className="font-semibold text-foreground">{displayPaymentMethod}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Thời gian giao dự kiến:</span>
                  <span className="flex items-center gap-1 font-bold text-tertiary">
                    <Icon name="clock" size="xs" />
                    Trong 2 giờ (Tận bàn tiệc)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/orders"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-102 hover:opacity-90"
                >
                  <span>Theo Dõi Đơn Hàng</span>
                  <Icon name="arrow-right" size="sm" />
                </Link>

                <Link
                  href="/products"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-xs font-bold text-foreground shadow-xs transition-transform hover:scale-102 hover:bg-muted"
                >
                  <Icon name="fish" size="sm" />
                  <span>Tiếp Tục Mua Sắm</span>
                </Link>
              </div>
            </div>
          ) : (
            /* FAILED STATE */
            <div className="text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/15 text-destructive">
                <Icon name="x" size="xl" />
              </div>

              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1 text-xs font-extrabold text-destructive">
                <Icon name="shield-check" size="xs" />
                <span>THANH TOÁN KHÔNG THÀNH CÔNG</span>
              </div>

              <h1 className="mt-4 font-heading text-2xl font-black text-foreground sm:text-3xl">
                Giao Dịch Bị Gián Đoạn
              </h1>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                Rất tiếc, quá trình thanh toán đơn hàng chưa hoàn tất thành công.
              </p>

              {/* Error Details Box */}
              <div className="mt-8 space-y-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-left">
                <div className="flex items-center justify-between text-xs font-bold text-destructive">
                  <span>Mã lỗi giao dịch:</span>
                  <span className="font-mono text-sm">{displayOrderCode} (Giao dịch thất bại)</span>
                </div>

                <div className="text-xs leading-relaxed text-muted-foreground">
                  <span className="font-bold text-foreground">Nguyên nhân có thể:</span>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4">
                    <li>Thao tác thanh toán vượt quá thời gian cho phép (Timeout).</li>
                    <li>Tài khoản ngân hàng hoặc thẻ không đủ số dư.</li>
                    <li>Bạn đã huỷ giao dịch trên ứng dụng Ngân hàng / VNPAY.</li>
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-bold text-white shadow-lg transition-transform hover:scale-102 hover:opacity-90"
                >
                  <span>Thử Thanh Toán Lại</span>
                  <Icon name="arrow-right" size="sm" />
                </Link>

                <a
                  href="tel:19008888"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-xs font-bold text-foreground shadow-xs transition-transform hover:scale-102 hover:bg-muted"
                >
                  <Icon name="phone" size="sm" className="text-secondary" />
                  <span>Hotline Hỗ Trợ (1900 8888)</span>
                </a>
              </div>
            </div>
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
