'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { ProfileGuaranteesCard } from '@/components/account/ProfileGuaranteesCard';
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

      <ProfileGuaranteesCard />
    </div>
  );
}
