'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { useRegisterMutation } from '@/libs/queries/auth';
import type { RegisterRequest } from '@/types/auth';
import { registerRequestSchema } from '@/validations/auth';

type AuthRegisterFormProps = {
  onRegisterSuccess: (email: string) => void;
};

export function AuthRegisterForm({ onRegisterSuccess }: AuthRegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerRequestSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      password: '',
    },
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      const res = await registerMutation.mutateAsync(data);
      toast.success(
        res.message || 'Đăng ký tài khoản thành công! Vui lòng nhập mã OTP gửi tới email.',
      );
      onRegisterSuccess(data.email);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : 'Đăng ký thất bại';
      toast.error(errorMsg);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
      <div>
        <label htmlFor="reg-fullname" className="block text-xs font-bold text-foreground">
          Họ và tên
        </label>
        <div className="relative mt-1">
          <input
            id="reg-fullname"
            type="text"
            placeholder="Nguyễn Văn A"
            {...register('fullName')}
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          />
          <Icon name="user" size="sm" className="absolute top-3 left-3 text-muted-foreground" />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-[11px] font-medium text-destructive">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-xs font-bold text-foreground">
          Địa chỉ Email
        </label>
        <div className="relative mt-1">
          <input
            id="reg-email"
            type="email"
            placeholder="name@example.com"
            {...register('email')}
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          />
          <Icon name="mail" size="sm" className="absolute top-3 left-3 text-muted-foreground" />
        </div>
        {errors.email && (
          <p className="mt-1 text-[11px] font-medium text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="reg-phone" className="block text-xs font-bold text-foreground">
          Số điện thoại
        </label>
        <div className="relative mt-1">
          <input
            id="reg-phone"
            type="tel"
            placeholder="0912345678"
            {...register('phoneNumber')}
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          />
          <Icon name="phone" size="sm" className="absolute top-3 left-3 text-muted-foreground" />
        </div>
        {errors.phoneNumber && (
          <p className="mt-1 text-[11px] font-medium text-destructive">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="reg-password" className="block text-xs font-bold text-foreground">
          Mật khẩu
        </label>
        <div className="relative mt-1">
          <input
            id="reg-password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Tối thiểu 8 ký tự"
            {...register('password')}
            className="w-full rounded-xl border border-border bg-background py-2.5 pr-10 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
          />
          <Icon name="lock" size="sm" className="absolute top-3 left-3 text-muted-foreground" />
          <button
            type="button"
            aria-label="Ẩn hiện mật khẩu"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
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
        disabled={registerMutation.isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-98 disabled:opacity-50"
      >
        {registerMutation.isPending ? (
          <span className="inline-flex items-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
            <span>Đang tạo tài khoản...</span>
          </span>
        ) : (
          <>
            <span>Tạo Tài Khoản Mới</span>
            <Icon name="arrow-right" size="sm" />
          </>
        )}
      </button>
    </form>
  );
}
