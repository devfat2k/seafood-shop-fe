'use client';

import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';

type AccountUnauthorizedStateProps = {
  onOpenLogin: () => void;
};

export function AccountUnauthorizedState({ onOpenLogin }: AccountUnauthorizedStateProps) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon name="lock" size="xl" />
      </div>
      <h2 className="mt-6 font-heading text-2xl font-bold text-foreground sm:text-3xl">
        Yêu Cầu Đăng Nhập
      </h2>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        Vui lòng đăng nhập vào tài khoản của bạn để quản lý thông tin cá nhân, theo dõi đơn hàng và
        sổ địa chỉ giao hàng.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onOpenLogin}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 active:scale-98"
        >
          <Icon name="log-in" size="sm" />
          <span>Đăng Nhập Ngay</span>
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          <Icon name="home" size="sm" />
          <span>Về Trang Chủ</span>
        </Link>
      </div>
    </div>
  );
}
