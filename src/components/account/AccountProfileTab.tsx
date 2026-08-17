'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { useUpdateProfileMutation } from '@/libs/queries/users';
import type { UpdateProfileRequest, UserProfile } from '@/types/user';
import { updateProfileSchema } from '@/types/user';

type AccountProfileTabProps = {
  profile?: UserProfile | null;
};

export function AccountProfileTab(props: AccountProfileTabProps) {
  const { profile } = props;
  const updateProfileMutation = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateProfileRequest>({
    resolver: zodResolver(updateProfileSchema),
    values: {
      fullName: profile?.fullName ?? '',
      phoneNumber: profile?.phoneNumber ?? '',
    },
  });

  const onSubmit = async (data: UpdateProfileRequest) => {
    try {
      const res = await updateProfileMutation.mutateAsync(data);
      toast.success(res.message || 'Cập nhật thông tin cá nhân thành công!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Cập nhật thất bại';
      toast.error(msg);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Profile Form Container */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="border-b border-border pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary/10 text-secondary">
              <Icon name="user" size="sm" />
            </div>
            <div>
              <h1 className="font-heading text-xl font-bold text-foreground sm:text-2xl">
                Thông Tin Cá Nhân
              </h1>
              <p className="text-xs text-muted-foreground">
                Quản lý và cập nhật thông tin tài khoản mua sắm của bạn.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Họ và tên */}
            <div>
              <label htmlFor="profile-fullname" className="block text-xs font-bold text-foreground">
                Họ và tên <span className="text-destructive">*</span>
              </label>
              <div className="relative mt-1.5">
                <input
                  id="profile-fullname"
                  type="text"
                  placeholder="Nhập họ và tên đầy đủ"
                  {...register('fullName')}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <Icon
                  name="user"
                  size="sm"
                  className="absolute top-3 left-3 text-muted-foreground"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-[11px] font-medium text-destructive">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Số điện thoại */}
            <div>
              <label htmlFor="profile-phone" className="block text-xs font-bold text-foreground">
                Số điện thoại <span className="text-destructive">*</span>
              </label>
              <div className="relative mt-1.5">
                <input
                  id="profile-phone"
                  type="tel"
                  placeholder="0912345678"
                  {...register('phoneNumber')}
                  className="w-full rounded-xl border border-border bg-background py-2.5 pr-4 pl-10 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none"
                />
                <Icon
                  name="phone"
                  size="sm"
                  className="absolute top-3 left-3 text-muted-foreground"
                />
              </div>
              {errors.phoneNumber && (
                <p className="mt-1 text-[11px] font-medium text-destructive">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Email (Readonly with Verified Badge) */}
            <div className="sm:col-span-2">
              <div className="flex items-center justify-between">
                <label htmlFor="profile-email" className="block text-xs font-bold text-foreground">
                  Địa chỉ Email
                </label>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-tertiary">
                  <Icon name="shield-check" size="xs" />
                  <span>Đã xác thực</span>
                </span>
              </div>
              <div className="relative mt-1.5">
                <input
                  id="profile-email"
                  type="email"
                  aria-label="Địa chỉ Email của tài khoản"
                  readOnly
                  disabled
                  value={profile?.email ?? 'khachhang@haisanphanthiet.vn'}
                  className="w-full cursor-not-allowed rounded-xl border border-border/80 bg-muted/40 py-2.5 pr-4 pl-10 text-xs text-muted-foreground select-none"
                />
                <Icon
                  name="mail"
                  size="sm"
                  className="absolute top-3 left-3 text-muted-foreground"
                />
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={updateProfileMutation.isPending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3 text-xs font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 active:scale-98 disabled:opacity-50"
            >
              {updateProfileMutation.isPending ? (
                <span className="inline-flex items-center gap-2">
                  <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  <span>Đang lưu...</span>
                </span>
              ) : (
                <>
                  <span>Lưu Thay Đổi</span>
                  <Icon name="check" size="sm" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Service Guarantees Card */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="font-sans text-xs font-bold tracking-wider text-secondary uppercase">
          Cam Kết Chất Lượng Hải Sản Phan Thiết
        </h3>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-background p-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon name="truck" size="sm" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Giao Nhanh Chuỗi Lạnh 2H</h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Giao hàng hoả tốc giữ trọn độ tươi sống từ cảng biển.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-background p-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
              <Icon name="fish" size="sm" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Đóng Thùng Oxy Tươi Sống</h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Đóng thùng xốp nén oxy tiêu chuẩn xuất khẩu.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-background p-3.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-tertiary/10 text-tertiary">
              <Icon name="shield-check" size="sm" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-foreground">Cam Kết 1 Đổi 1</h4>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Đổi mới miễn phí nếu hải sản không đạt chuẩn tươi ngon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
