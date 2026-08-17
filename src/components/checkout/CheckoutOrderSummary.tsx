'use client';

import { Icon } from '@/components/common/Icon';

type CheckoutOrderSummaryProps = {
  subtotal: number;
  isSubmitting: boolean;
  onPlaceOrder: () => void;
  disabled: boolean;
};

const FREESHIP_THRESHOLD = 1_500_000;
const STANDARD_SHIPPING_FEE = 30_000;

export function CheckoutOrderSummary({
  subtotal,
  isSubmitting,
  onPlaceOrder,
  disabled,
}: CheckoutOrderSummaryProps) {
  const isFreeship = subtotal >= FREESHIP_THRESHOLD;
  const shippingFee = isFreeship ? 0 : STANDARD_SHIPPING_FEE;
  const grandTotal = subtotal + shippingFee;

  return (
    <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-md">
      <h2 className="font-heading text-base font-bold text-foreground">Tổng Hóa Đơn</h2>

      <div className="mt-4 space-y-3 border-b border-border pb-4 text-xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Tiền hàng (Tạm tính):</span>
          <span className="font-semibold text-foreground">{subtotal.toLocaleString('vi-VN')}₫</span>
        </div>

        <div className="flex items-center justify-between text-muted-foreground">
          <span>Phí giao hỏa tốc 2H:</span>
          <span className={`font-semibold ${isFreeship ? 'text-tertiary' : 'text-foreground'}`}>
            {isFreeship ? 'MIỄN PHÍ' : `${STANDARD_SHIPPING_FEE.toLocaleString('vi-VN')}₫`}
          </span>
        </div>

        {isFreeship && (
          <div className="flex items-center justify-between text-tertiary">
            <span className="flex items-center gap-1">
              <Icon name="sparkles" size="xs" />
              <span>Ưu đãi freeship:</span>
            </span>
            <span className="font-semibold">-{STANDARD_SHIPPING_FEE.toLocaleString('vi-VN')}₫</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-bold text-foreground sm:text-sm">Tổng thanh toán:</span>
          <p className="text-[10px] text-muted-foreground">(Đã bao gồm VAT &amp; Phí oxy)</p>
        </div>
        <span className="text-xl font-black text-primary sm:text-2xl">
          {grandTotal.toLocaleString('vi-VN')}₫
        </span>
      </div>

      <button
        type="button"
        disabled={disabled || isSubmitting}
        onClick={onPlaceOrder}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-xs font-bold text-white shadow-lg transition-all hover:opacity-90 active:scale-98 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? (
          <>
            <Icon name="clock" size="sm" className="animate-spin" />
            <span>Đang Xử Lý Đặt Hàng...</span>
          </>
        ) : (
          <>
            <span>Xác Nhận &amp; Đặt Hàng</span>
            <Icon name="arrow-right" size="sm" />
          </>
        )}
      </button>

      {/* Trust Badges */}
      <div className="mt-6 space-y-2 border-t border-border pt-4">
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Icon name="shield-check" size="xs" className="shrink-0 text-tertiary" />
          <span>Bao ăn, 1 đổi 1 tận nhà nếu hải sản ngộp/kém chất lượng</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Icon name="clock" size="xs" className="shrink-0 text-secondary" />
          <span>Giao nhanh 2H đóng thùng xốp oxy chuyên dụng</span>
        </div>
      </div>
    </div>
  );
}
