'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Icon } from '@/components/common/Icon';
import type { ForgotPasswordRequest } from '@/types/auth';
import { forgotPasswordRequestSchema } from '@/validations/auth';

type ForgotPasswordEmailStepProps = {
  onSubmit: (data: ForgotPasswordRequest) => Promise<void>;
  isPending: boolean;
  onReturnLogin: () => void;
};

export function ForgotPasswordEmailStep({
  onSubmit,
  isPending,
  onReturnLogin,
}: ForgotPasswordEmailStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordRequest>({
    resolver: zodResolver(forgotPasswordRequestSchema),
    defaultValues: { email: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fp-email" className="block text-xs font-semibold text-foreground">
          Email tài khoản <span className="text-destructive">*</span>
        </label>
        <div className="relative mt-1.5">
          <input
            id="fp-email"
            type="email"
            {...register('email')}
            placeholder="example@gmail.com"
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-xs text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <Icon
            name="mail"
            size="sm"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-[11px] text-destructive">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
      >
        {isPending ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            <span>Đang gửi mã...</span>
          </span>
        ) : (
          <>
            <span>Gửi Mã Xác Nhận</span>
            <Icon name="arrow-right" size="xs" />
          </>
        )}
      </button>

      <div className="text-center">
        <button
          type="button"
          onClick={onReturnLogin}
          className="text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          Quay lại Đăng nhập
        </button>
      </div>
    </form>
  );
}
