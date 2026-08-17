'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { PasswordStrengthIndicator } from '@/components/account/PasswordStrengthIndicator';
import { SecurityAdviceCard } from '@/components/account/SecurityAdviceCard';
import { Icon } from '@/components/common/Icon';
import { useChangePasswordMutation } from '@/libs/queries/users';
import type { ChangePasswordRequest } from '@/types/user';
import { changePasswordSchema } from '@/types/user';

export function AccountSecurityTab() {
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const changePasswordMutation = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordRequest>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: '',
      newPassword: '',
    },
  });

  const newPasswordVal = watch('newPassword', '');

  const onSubmit = async (data: ChangePasswordRequest) => {
    try {
      const res = await changePasswordMutation.mutateAsync(data);
      toast.success(res.message || 'Đổi mật khẩu thành công! Vui lòng lưu lại mật khẩu mới.');
      reset();
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Đổi mật khẩu thất bại';
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Icon name="lock" size="sm" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                Mật Khẩu &amp; Bảo Mật
              </h1>
              <p className="text-xs text-muted-foreground">
                Đổi mật khẩu định kỳ để nâng cao an toàn cho tài khoản của bạn.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 max-w-md space-y-4">
          <div>
            <label htmlFor="sec-old-pass" className="block text-xs font-bold text-foreground">
              Mật khẩu hiện tại
            </label>
            <div className="relative mt-1.5">
              <input
                id="sec-old-pass"
                type={showOldPass ? 'text' : 'password'}
                placeholder="••••••••"
                {...register('oldPassword')}
                className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <Icon name="lock" size="sm" className="absolute top-3 left-3 text-muted-foreground" />
              <button
                type="button"
                aria-label="Ẩn hiện mật khẩu cũ"
                onClick={() => {
                  setShowOldPass(!showOldPass);
                }}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showOldPass ? 'eye-off' : 'eye'} size="sm" />
              </button>
            </div>
            {errors.oldPassword && (
              <p className="mt-1 text-[11px] font-medium text-destructive">
                {errors.oldPassword.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="sec-new-pass" className="block text-xs font-bold text-foreground">
              Mật khẩu mới
            </label>
            <div className="relative mt-1.5">
              <input
                id="sec-new-pass"
                type={showNewPass ? 'text' : 'password'}
                placeholder="Tối thiểu 8 ký tự"
                {...register('newPassword')}
                className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <Icon name="lock" size="sm" className="absolute top-3 left-3 text-muted-foreground" />
              <button
                type="button"
                aria-label="Ẩn hiện mật khẩu mới"
                onClick={() => {
                  setShowNewPass(!showNewPass);
                }}
                className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showNewPass ? 'eye-off' : 'eye'} size="sm" />
              </button>
            </div>
            {errors.newPassword && (
              <p className="mt-1 text-[11px] font-medium text-destructive">
                {errors.newPassword.message}
              </p>
            )}

            <PasswordStrengthIndicator password={newPasswordVal} />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={changePasswordMutation.isPending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-98 disabled:opacity-50"
            >
              {changePasswordMutation.isPending ? (
                <span>Đang lưu mật khẩu mới...</span>
              ) : (
                <>
                  <span>Cập Nhật Mật Khẩu</span>
                  <Icon name="check" size="sm" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <SecurityAdviceCard />
    </div>
  );
}
