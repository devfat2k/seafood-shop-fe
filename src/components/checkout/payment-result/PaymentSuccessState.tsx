import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type PaymentSuccessStateProps = {
  displayOrderCode: string;
  paymentId?: string | null;
  displayTotal: string;
  displayPaymentMethod: string;
};

export const PaymentSuccessState = ({
  displayOrderCode,
  paymentId,
  displayTotal,
  displayPaymentMethod,
}: PaymentSuccessStateProps) => (
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
      Đơn hàng hải sản tươi sống của bạn đã được tiếp nhận và đang được chuẩn bị đóng thùng oxy giao
      hỏa tốc.
    </p>

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
          Đóng gói và giao sớm nhất
        </span>
      </div>
    </div>

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
);
