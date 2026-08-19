import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type PaymentFailedStateProps = {
  displayOrderCode: string;
};

export const PaymentFailedState = ({ displayOrderCode }: PaymentFailedStateProps) => (
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
);
