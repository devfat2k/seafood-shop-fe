'use client';

import { useState } from 'react';
import { AccountAddressesTab } from '@/components/account/AccountAddressesTab';
import { AccountOrdersTab } from '@/components/account/AccountOrdersTab';
import { AccountProfileTab } from '@/components/account/AccountProfileTab';
import { AccountSecurityTab } from '@/components/account/AccountSecurityTab';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import { MOCK_USER_PROFILE } from '@/data/account-mock';

type AccountTab = 'profile' | 'orders' | 'addresses' | 'security';

export function AccountContainer(props: { defaultTab?: AccountTab }) {
  const [activeTab, setActiveTab] = useState<AccountTab>(props.defaultTab ?? 'orders');

  return (
    <div className="mx-auto max-w-[1280px] py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cột Trái: Sidebar Menu (4/12 desktop) */}
        <div className="lg:col-span-4">
          <AccountSidebar
            profile={MOCK_USER_PROFILE}
            activeTab={activeTab}
            onSelectTab={(tab) => {
              setActiveTab(tab);
            }}
          />
        </div>

        {/* Cột Phải: Nội Dung Tab Động (8/12 desktop) */}
        <div className="lg:col-span-8">
          {activeTab === 'orders' && <AccountOrdersTab />}
          {activeTab === 'profile' && <AccountProfileTab />}
          {activeTab === 'addresses' && <AccountAddressesTab />}
          {activeTab === 'security' && <AccountSecurityTab />}
        </div>
      </div>
    </div>
  );
}
