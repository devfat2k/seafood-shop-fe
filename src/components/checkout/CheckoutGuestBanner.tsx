import { Icon } from '@/components/common/Icon';

type CheckoutGuestBannerProps = {
  onOpenLogin: () => void;
};

export function CheckoutGuestBanner({ onOpenLogin }: CheckoutGuestBannerProps) {
  return (
    <div className="mb-6 flex items-center justify-between rounded-2xl border border-secondary/30 bg-secondary/10 p-4 sm:p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-white">
          <Icon name="user" size="sm" />
        </div>
        <div>
          <p className="text-xs font-bold text-foreground sm:text-sm">
            Bạn chưa đăng nhập tài khoản
          </p>
          <p className="text-xs text-muted-foreground">
            Đăng nhập để theo dõi hành trình đơn hàng và nhận ưu đãi chuỗi lạnh
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onOpenLogin}
        className="cursor-pointer rounded-xl bg-secondary px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-secondary/90"
      >
        Đăng Nhập
      </button>
    </div>
  );
}
