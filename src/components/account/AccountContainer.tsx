'use client';

import { useState } from 'react';
import { AccountAddressesTab } from '@/components/account/AccountAddressesTab';
import { AccountOrdersTab } from '@/components/account/AccountOrdersTab';
import { AccountProfileTab } from '@/components/account/AccountProfileTab';
import { AccountSecurityTab } from '@/components/account/AccountSecurityTab';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import type { AccountTab } from '@/components/account/AccountSidebar';
import { Icon } from '@/components/common/Icon';
import { Link } from '@/libs/I18nNavigation';
import { useCurrentUserQuery } from '@/libs/queries/auth';
import type { UserProfile } from '@/types/user';

type AccountContainerProps = {
  defaultTab?: AccountTab;
  initialProfile?: UserProfile | null;
};

export function AccountContainer(props: AccountContainerProps) {
  const { defaultTab = 'profile', initialProfile } = props;
  const [activeTab, setActiveTab] = useState<AccountTab>(defaultTab);

  const { data: currentUser } = useCurrentUserQuery();
  const profile = currentUser ?? initialProfile;

  const displayName = profile?.fullName ?? 'Khách Hàng Hải Sản';
  const userEmail = profile?.email ?? 'khachhang@haisanphanthiet.vn';

  return (
    <div className="min-h-screen bg-background pb-16">
      <section className="relative overflow-hidden bg-gradient-to-r from-foreground via-secondary/80 to-secondary py-8 text-white sm:py-12">
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <nav className="flex items-center gap-2 text-xs text-white/70">
            <Link href="/" className="transition-colors hover:text-white">
              Trang chủ
            </Link>
            <Icon name="chevron-right" size="xs" />
            <span className="font-semibold text-white">Tài khoản cá nhân</span>
          </nav>

          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold text-white shadow-xs backdrop-blur-md">
                <Icon name="shield-check" size="xs" className="text-secondary-foreground" />
                <span>Tài khoản Khách hàng</span>
              </div>
              <h1 className="mt-2 font-heading text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                Xin chào, {displayName}
              </h1>
              <p className="mt-1 max-w-xl text-xs text-white/80 sm:text-sm">
                Quản lý thông tin tài khoản, theo dõi đơn hàng hải sản tươi sống và sổ địa chỉ giao
                hàng.
              </p>
            </div>

            <div className="rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-md">
              <span className="block text-xs font-medium text-white/70">Email đăng nhập</span>
              <span className="mt-0.5 block font-mono text-xs font-bold text-white">
                {userEmail}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <AccountSidebar
              profile={profile}
              activeTab={activeTab}
              onSelectTab={(tab) => {
                setActiveTab(tab);
              }}
            />
          </div>

          <div className="lg:col-span-8">
            {activeTab === 'profile' && <AccountProfileTab profile={profile} />}
            {activeTab === 'orders' && <AccountOrdersTab />}
            {activeTab === 'addresses' && <AccountAddressesTab />}
            {activeTab === 'security' && <AccountSecurityTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
