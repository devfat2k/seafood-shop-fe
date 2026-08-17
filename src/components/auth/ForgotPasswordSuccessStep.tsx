'use client';

import { Icon } from '@/components/common/Icon';

type ForgotPasswordSuccessStepProps = {
  onReturnLogin: () => void;
};

export function ForgotPasswordSuccessStep({ onReturnLogin }: ForgotPasswordSuccessStepProps) {
  return (
    <div className="py-4 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-tertiary/15 text-tertiary">
        <Icon name="check" size="lg" />
      </div>
      <h4 className="mt-4 font-heading text-base font-bold text-foreground">
        Đổi mật khẩu thành công!
      </h4>
      <p className="mt-1 text-xs text-muted-foreground">
        Bạn có thể đăng nhập ngay với mật khẩu mới vừa thiết lập.
      </p>
      <button
        type="button"
        onClick={onReturnLogin}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-white shadow-sm hover:opacity-90"
      >
        <span>Đăng nhập ngay</span>
        <Icon name="arrow-right" size="xs" />
      </button>
    </div>
  );
}
