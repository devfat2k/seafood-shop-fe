'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAdminAccessToken } from '@/libs/AdminApiClient';
import { useAdminLoginMutation } from '@/libs/queries/admin/auth';
import type { AdminLoginFormValues } from '@/validations/admin';
import { adminLoginSchema } from '@/validations/admin';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useAdminLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (getAdminAccessToken()) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  const onSubmit = async (values: AdminLoginFormValues) => {
    try {
      await loginMutation.mutateAsync(values);
      toast.success('Đăng nhập thành công! Đang chuyển hướng...');
      router.push('/admin/dashboard');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Đăng nhập không thành công');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4 sm:p-6">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl sm:p-8">
        {/* Branding header */}
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
            <Icon name="fish" size="xl" />
          </div>
          <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
            Quản Trị Hệ Thống
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            Đăng nhập tài khoản có quyền Quản trị viên (ROLE_ADMIN)
          </p>
        </div>

        {/* Login form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground" htmlFor="email">
              Email quản trị
            </label>
            <Input
              id="email"
              type="email"
              placeholder="admin@seafood.vn"
              {...register('email')}
              className={errors.email ? 'border-destructive' : ''}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-[11px] font-medium text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground" htmlFor="password">
              Mật khẩu
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Nhập mật khẩu quản trị"
                {...register('password')}
                className={errors.password ? 'border-destructive pr-9' : 'pr-9'}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword((prev) => !prev);
                }}
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
              >
                <Icon name={showPassword ? 'eye-off' : 'eye'} size="xs" />
              </button>
            </div>
            {errors.password && (
              <p className="text-[11px] font-medium text-destructive">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={loginMutation.isPending}
            className="mt-2 h-10 w-full font-bold"
          >
            {loginMutation.isPending ? (
              <span className="flex items-center gap-2">
                <Icon name="sparkles" size="xs" className="animate-spin" />
                Đang xác thực...
              </span>
            ) : (
              'Đăng Nhập Quản Trị'
            )}
          </Button>
        </form>

        <div className="mt-6 border-t border-border pt-4 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Icon name="arrow-left" size="xs" />
            Quay lại Cửa hàng
          </Link>
        </div>
      </div>
    </div>
  );
}
