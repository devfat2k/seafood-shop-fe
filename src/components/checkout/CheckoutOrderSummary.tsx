'use client';

import { Icon } from '@/components/common/Icon';

type CheckoutOrderSummaryProps = {
  subtotal: number;
  isSubmitting: boolean;
  onPlaceOrder: () => void;
  disabled: boolean;
};

export function CheckoutOrderSummary({
  subtotal,
  isSubmitting,
  onPlaceOrder,
  disabled,
}: CheckoutOrderSummaryProps) {
  return (
    <div className="sticky top-24 rounded-2xl border border-border bg-card p-6 shadow-md">
      <h2 className="font-heading text-base font-bold text-foreground">Tổng Hóa Đơn</h2>

      <div className="mt-4 space-y-3 border-b border-border pb-4 text-xs">
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Tiền hàng (Tạm tính):</span>
          <span className="font-semibold text-foreground">{subtotal.toLocaleString('vi-VN')}₫</span>
        </div>
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <div>
          <span className="text-xs font-bold text-foreground sm:text-sm">Tổng thanh toán:</span>
          <p className="text-[10px] text-muted-foreground">(Đã bao gồm VAT)</p>
        </div>
        <span className="text-xl font-black text-primary sm:text-2xl">
          {subtotal.toLocaleString('vi-VN')}₫
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
          <span>Cam kết hải sản tươi ngon, kiểm tra hàng trước khi nhận</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <Icon name="clock" size="xs" className="shrink-0 text-secondary" />
          <span>Đóng gói chuyên dụng giữ trọn hương vị biển</span>
        </div>
      </div>
    </div>
  );
}
