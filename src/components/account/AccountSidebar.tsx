'use client';

import type { UserProfile } from '@/data/account-mock';

type AccountTab = 'profile' | 'orders' | 'addresses' | 'security';

type AccountSidebarProps = {
  profile: UserProfile;
  activeTab: AccountTab;
  onSelectTab: (tab: AccountTab) => void;
};

export function AccountSidebar(props: AccountSidebarProps) {
  const { profile, activeTab, onSelectTab } = props;

  const menuItems: { id: AccountTab; label: string; icon: string }[] = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: '👤' },
    { id: 'orders', label: 'Đơn hàng của tôi', icon: '🛍️' },
    { id: 'addresses', label: 'Địa chỉ giao hàng', icon: '📍' },
    { id: 'security', label: 'Đổi mật khẩu', icon: '🔑' },
  ];

  return (
    <div className="w-full rounded-3xl border border-[#E4E0D8] bg-white p-6 shadow-sm">
      {/* Header Profile Box */}
      <div className="flex items-center gap-4 border-b border-[#E4E0D8] pb-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={profile.avatar}
          alt={profile.name}
          className="h-16 w-16 rounded-full border-2 border-[#0E3D34] object-cover"
        />
        <div>
          <h2 className="text-base font-extrabold text-[#26312D]">{profile.name}</h2>
          <p className="mt-1 text-xs font-semibold text-[#5B6B63]">
            {profile.rank} • <span className="text-[#D9A441]">{profile.rewardPoints} Điểm</span>
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
                  ? 'bg-[#F5F1E8] text-[#0E3D34] shadow-sm ring-1 ring-[#0E3D34]/10'
                  : 'text-[#5B6B63] hover:bg-[#FBF8F3] hover:text-[#26312D]'
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout Link */}
      <div className="mt-8 border-t border-[#E4E0D8] pt-4">
        <button
          type="button"
          onClick={() => {
            console.log('Đăng xuất tài khoản');
          }}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-xs font-bold text-red-600 transition-colors hover:bg-red-50"
        >
          <span className="text-base">🚪</span>
          <span>Đăng xuất tài khoản</span>
        </button>
      </div>
    </div>
  );
}
