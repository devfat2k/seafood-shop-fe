import { Icon } from '@/components/common/Icon';

export function SecurityAdviceCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="font-heading text-xs font-bold tracking-wider text-secondary uppercase">
        Khuyến Nghị Bảo Mật Tài Khoản
      </h3>
      <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tertiary/15 text-tertiary">
            <Icon name="check" size="xs" />
          </span>
          <span>Mật khẩu nên chứa cả chữ hoa, chữ thường, số và ký tự đặc biệt (!@#$).</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tertiary/15 text-tertiary">
            <Icon name="check" size="xs" />
          </span>
          <span>Không chia sẻ mã xác thực OTP gửi qua email/SMS cho bất kỳ ai.</span>
        </li>
        <li className="flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-tertiary/15 text-tertiary">
            <Icon name="check" size="xs" />
          </span>
          <span>Đăng xuất tài khoản khi sử dụng thiết bị công cộng.</span>
        </li>
      </ul>
    </div>
  );
}
