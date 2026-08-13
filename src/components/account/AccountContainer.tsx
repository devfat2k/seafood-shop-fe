'use client';

import { useState } from 'react';
import { AccountAddressesTab } from '@/components/account/AccountAddressesTab';
import { AccountOrdersTab } from '@/components/account/AccountOrdersTab';
import { AccountProfileTab } from '@/components/account/AccountProfileTab';
import { AccountSecurityTab } from '@/components/account/AccountSecurityTab';
import { AccountSidebar } from '@/components/account/AccountSidebar';
import type { OrderResponse } from '@/types/order';
import type { UserAddress, UserProfile } from '@/types/user';

type AccountTab = 'profile' | 'orders' | 'addresses' | 'security';

type AccountContainerProps = {
  defaultTab?: AccountTab;
  initialProfile?: UserProfile | null;
  initialOrders?: OrderResponse[];
  initialAddresses?: UserAddress[];
};

export function AccountContainer(props: AccountContainerProps) {
  const { defaultTab = 'orders', initialProfile, initialOrders, initialAddresses } = props;
  const [activeTab, setActiveTab] = useState<AccountTab>(defaultTab);

  return (
    <div className="mx-auto max-w-[1280px] py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Cột Trái: Sidebar Menu (4/12 desktop) */}
        <div className="lg:col-span-4">
          <AccountSidebar
            profile={initialProfile}
            activeTab={activeTab}
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        </div>

        {/* Cột Phải: Nội Dung Tab Động (8/12 desktop) */}
        <div className="lg:col-span-8">
          {activeTab === 'orders' && <AccountOrdersTab orders={initialOrders} />}
          {activeTab === 'profile' && <AccountProfileTab profile={initialProfile} />}
          {activeTab === 'addresses' && <AccountAddressesTab addresses={initialAddresses} />}
          {activeTab === 'security' && <AccountSecurityTab />}
        </div>
      </div>
    </div>
  );
}
