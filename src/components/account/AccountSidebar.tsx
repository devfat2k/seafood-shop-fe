'use client';

import { Icon } from '@/components/common/Icon';
import type { UserProfile } from '@/types/user';

type AccountTab = 'profile' | 'orders' | 'addresses' | 'security';

type AccountSidebarProps = {
  profile?: UserProfile | null;
  activeTab: AccountTab;
  onSelectTab: (tab: AccountTab) => void;
};

export function AccountSidebar(props: AccountSidebarProps) {
  const { profile, activeTab, onSelectTab } = props;

  const displayName = profile?.fullName ?? 'Thành viên';
  const rank = profile?.rank ?? 'Thành viên Mới';
  const rewardPoints = profile?.rewardPoints ?? 0;
  const avatar = profile?.avatarUrl ?? '';

  const menuItems: { id: AccountTab; label: string; icon: string }[] = [
    { id: 'orders', label: 'Đơn hàng của tôi', icon: 'shopping-bag' },
    { id: 'profile', label: 'Thông tin cá nhân', icon: 'user' },
    { id: 'addresses', label: 'Sổ địa chỉ nhận hàng', icon: 'map-pin' },
    { id: 'security', label: 'Mật khẩu & Đăng nhập', icon: 'lock' },
  ];

  return (
    <aside className="rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      {/* User Header Profile Card */}
      <div className="flex items-center gap-4 border-b border-[#E2E8F0] pb-6">
        <div className="relative">
          {avatar ? (
            <img
              src={avatar}
              alt={displayName}
              className="h-14 w-14 rounded-full border-2 border-[#1E3A8A] object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#1E3A8A] text-lg font-extrabold text-white">
              {displayName.slice(0, 1)}
            </div>
          )}
          <span className="absolute right-0 bottom-0 flex h-4 w-4 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">{displayName}</h2>
          <div className="mt-1 flex items-center gap-2">
            <span className="rounded-full bg-[#FEF3C7] px-2.5 py-0.5 text-[10px] font-bold text-[#D97706]">
              ★ {rank}
            </span>
            <span className="text-[11px] font-semibold text-text-secondary">
              {rewardPoints} điểm
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Links List */}
      <nav className="mt-6 space-y-1.5">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#1E3A8A] text-white shadow-md'
                  : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`}
            >
              <Icon name={item.icon} size="sm" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
