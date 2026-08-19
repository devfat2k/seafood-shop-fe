'use client';

import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { useRef } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { useLogoutMutation } from '@/libs/queries/auth';
import { useUploadAvatarMutation } from '@/libs/queries/users';
import type { UserProfile } from '@/types/user';

export type AccountTab = 'profile' | 'orders' | 'addresses' | 'security';

type AccountSidebarProps = {
  profile?: UserProfile | null;
  activeTab: AccountTab;
  onSelectTab: (tab: AccountTab) => void;
  onLogout?: () => void;
};

export function AccountSidebar(props: AccountSidebarProps) {
  const { profile, activeTab, onSelectTab, onLogout } = props;
  const logoutMutation = useLogoutMutation();
  const uploadAvatarMutation = useUploadAvatarMutation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayName = profile?.fullName ?? 'Khách hàng';
  const email = profile?.email ?? 'khachhang@haisanphanthiet.vn';
  const avatar =
    profile?.avatarUrl ??
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  const menuItems: { id: AccountTab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: 'user' },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: 'shopping-bag' },
    { id: 'addresses', label: 'Sổ địa chỉ nhận hàng', icon: 'map-pin' },
    { id: 'security', label: 'Mật khẩu & Bảo mật', icon: 'lock' },
  ];

  const handleAvatarFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Dung lượng ảnh tối đa 5MB');
      return;
    }

    try {
      const res = await uploadAvatarMutation.mutateAsync(file);
      toast.success(res.message || 'Cập nhật ảnh đại diện thành công!');
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Tải ảnh thất bại';
      toast.error(msg);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else {
      logoutMutation.mutate();
    }
  };

  return (
    <aside className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-primary/40 shadow-xs">
              <Image src={avatar} alt={displayName} fill unoptimized className="object-cover" />
            </div>
            <button
              type="button"
              onClick={() => {
                fileInputRef.current?.click();
              }}
              disabled={uploadAvatarMutation.isPending}
              aria-label="Tải ảnh đại diện mới"
              title="Đổi ảnh đại diện"
              className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
            >
              <Icon name="camera" size="xs" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              aria-label="Tải ảnh đại diện từ máy tính"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleAvatarFileChange}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate font-sans text-sm font-bold text-foreground">{displayName}</h2>
            <p className="truncate text-xs text-muted-foreground">{email}</p>
            <div className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-bold text-secondary">
              <Icon name="shield-check" size="xs" />
              <span>Đã kích hoạt</span>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectTab(item.id);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? 'border-l-4 border-primary bg-primary/10 text-primary shadow-xs'
                    : 'text-foreground hover:bg-muted/70 hover:text-foreground'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    name={item.icon}
                    size="sm"
                    className={isActive ? 'text-primary' : 'text-muted-foreground'}
                  />
                  <span>{item.label}</span>
                </div>
                <Icon
                  name="chevron-right"
                  size="xs"
                  className={isActive ? 'text-primary' : 'text-muted-foreground/60'}
                />
              </button>
            );
          })}

          <div className="my-1 border-t border-border/60" />

          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-xs font-bold text-destructive transition-colors hover:bg-destructive/10"
          >
            <Icon name="log-out" size="sm" className="text-destructive" />
            <span>Đăng xuất tài khoản</span>
          </button>
        </nav>
      </div>
    </aside>
  );
}
