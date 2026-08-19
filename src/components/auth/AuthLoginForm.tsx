'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { useLoginMutation } from '@/libs/queries/auth';
import type { LoginRequest } from '@/types/auth';
import { loginRequestSchema } from '@/validations/auth';

type AuthLoginFormProps = {
  onSuccess: () => void;
  onRequireVerification: (email: string) => void;
  onOpenForgotPassword: () => void;
};

export function AuthLoginForm({
  onSuccess,
  onRequireVerification,
  onOpenForgotPassword,
}: AuthLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const res = await loginMutation.mutateAsync(data);
      toast.success(res.message || 'Đăng nhập thành công!');
      onSuccess();
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      if (
        errorMsg.toLowerCase().includes('not verified') ||
        errorMsg.toLowerCase().includes('chưa xác thực') ||
        errorMsg.toLowerCase().includes('kích hoạt')
      ) {
        toast.warning('Tài khoản chưa xác thực email. Vui lòng nhập mã OTP để kích hoạt.');
        onRequireVerification(getValues('email'));
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="login-email" className="block text-xs font-semibold text-foreground">
          Địa chỉ Email
        </label>
        <div className="relative mt-1.5">
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            {...register('email')}
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-xs text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <Icon
            name="mail"
            size="sm"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-[11px] font-medium text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="login-password" className="block text-xs font-semibold text-foreground">
            Mật khẩu
          </label>
          <button
            type="button"
            onClick={onOpenForgotPassword}
            className="text-xs font-semibold text-secondary transition-colors hover:underline"
          >
            Quên mật khẩu?
          </button>
        </div>
        <div className="relative mt-1.5">
          <input
            id="login-password"
            type={showPassword ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="Nhập mật khẩu của bạn"
            {...register('password')}
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-xs text-foreground transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <Icon
            name="lock"
            size="sm"
            className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
          />
          <button
            type="button"
            aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size="sm" />
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-[11px] font-medium text-destructive">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loginMutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50"
      >
        {loginMutation.isPending ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            <span>Đang đăng nhập...</span>
          </span>
        ) : (
          <>
            <span>Đăng Nhập Ngay</span>
            <Icon name="arrow-right" size="sm" />
          </>
        )}
      </button>
    </form>
  );
}
