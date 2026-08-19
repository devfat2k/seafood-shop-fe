'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Icon } from '@/components/common/Icon';
import type { ResetPasswordFormValues } from '@/types/auth';
import { resetPasswordFormSchema } from '@/validations/auth';

type ForgotPasswordNewPasswordStepProps = {
  onSubmit: (data: ResetPasswordFormValues) => Promise<void>;
  isPending: boolean;
};

export function ForgotPasswordNewPasswordStep({
  onSubmit,
  isPending,
}: ForgotPasswordNewPasswordStepProps) {
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: { newPassword: '', confirmPassword: '' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="fp-newPassword" className="block text-xs font-semibold text-foreground">
          Mật khẩu mới <span className="text-destructive">*</span>
        </label>
        <div className="relative mt-1.5">
          <input
            id="fp-newPassword"
            type={showNewPass ? 'text' : 'password'}
            {...register('newPassword')}
            placeholder="Nhập mật khẩu mới (từ 8 ký tự)"
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-xs text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <Icon
            name="lock"
            size="sm"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => {
              setShowNewPass(!showNewPass);
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showNewPass ? 'Ẩn mật khẩu mới' : 'Hiện mật khẩu mới'}
          >
            <Icon name={showNewPass ? 'eye-off' : 'eye'} size="sm" />
          </button>
        </div>
        {errors.newPassword && (
          <p className="mt-1 text-[11px] font-medium text-destructive">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="fp-confirmPassword" className="block text-xs font-semibold text-foreground">
          Xác nhận mật khẩu mới <span className="text-destructive">*</span>
        </label>
        <div className="relative mt-1.5">
          <input
            id="fp-confirmPassword"
            type={showConfirmPass ? 'text' : 'password'}
            {...register('confirmPassword')}
            placeholder="Nhập lại mật khẩu mới"
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-xs text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <Icon
            name="lock"
            size="sm"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => {
              setShowConfirmPass(!showConfirmPass);
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label={showConfirmPass ? 'Ẩn xác nhận mật khẩu' : 'Hiện xác nhận mật khẩu'}
          >
            <Icon name={showConfirmPass ? 'eye-off' : 'eye'} size="sm" />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="mt-1 text-[11px] font-medium text-destructive">
            {errors.confirmPassword.message}
          </p>
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
            <span>Đang cập nhật...</span>
          </span>
        ) : (
          <>
            <span>Đổi Mật Khẩu Mới</span>
            <Icon name="check" size="xs" />
          </>
        )}
      </button>
    </form>
  );
}
