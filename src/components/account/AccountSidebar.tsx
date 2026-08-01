'use client';

import { Icon } from '@/components/common/Icon';
import type { IconName } from '@/components/common/Icon';
import type { UserProfile } from '@/data/account-mock';

type AccountTab = 'profile' | 'orders' | 'addresses' | 'security';

type AccountSidebarProps = {
  profile: UserProfile;
  activeTab: AccountTab;
  onSelectTab: (tab: AccountTab) => void;
};

export function AccountSidebar(props: AccountSidebarProps) {
  const { profile, activeTab, onSelectTab } = props;

  const menuItems: { id: AccountTab; label: string; icon: IconName }[] = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: 'user' },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: 'shopping-bag' },
    { id: 'addresses', label: 'Địa chỉ giao hàng', icon: 'map-pin' },
    { id: 'security', label: 'Đổi mật khẩu', icon: 'lock' },
  ];

  return (
    <div className="w-full rounded-3xl border border-[#E2E8F0] bg-white p-6 shadow-sm">
      {/* Header Profile Box */}
      <div className="flex items-center gap-4 border-b border-[#E2E8F0] pb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-16 w-16 rounded-full border-2 border-[#1E3A8A] object-cover"
        />
        <div>
          <h2 className="text-base font-extrabold text-[#0F172A]">{profile.name}</h2>
          <p className="mt-1 text-xs font-semibold text-[#475569]">
            {profile.rank} • <span className="text-[#F97316]">{profile.rewardPoints} Điểm</span>
          </p>
        </div>
      </div>

      {/* Menu Tabs Navigation */}
      <nav aria-label="Account navigation" className="mt-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
              }}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#EDF2F7] text-[#1E3A8A] shadow-sm ring-1 ring-[#1E3A8A]/10'
                  : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
              }`}
            >
              <Icon name={item.icon} size="sm" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Link */}
      <div className="mt-8 border-t border-[#E2E8F0] pt-4">
        <button
          type="button"
          onClick={() => {
            console.log('Đăng xuất tài khoản');
          }}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
        >
          <Icon name="log-out" size="sm" />
          <span>Đăng xuất tài khoản</span>
        </button>
      </div>
    </div>
  );
}
