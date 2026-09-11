'use client';

import * as React from 'react';
import { SystemMonitoringPanel } from '@/components/admin/system/SystemMonitoringPanel';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { CategoryDonutChart } from './CategoryDonutChart';
import { DashboardKpiCards } from './DashboardKpiCards';
import { RevenueTrendChart } from './RevenueTrendChart';
import { TopBuyProductsTable } from './TopBuyProductsTable';
import { TopProductsBarChart } from './TopProductsBarChart';

type DashboardTab = 'analytics' | 'system';

export function DashboardTabs() {
  const [activeTab, setActiveTab] = React.useState<DashboardTab>('analytics');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 border-b border-border pb-3">
        <Button
          size="sm"
          variant={activeTab === 'analytics' ? 'default' : 'ghost'}
          className="gap-2 text-xs font-semibold"
          onClick={() => {
            setActiveTab('analytics');
          }}
        >
          <Icon name="sparkles" size="xs" />
          Tổng Quan Kinh Doanh
        </Button>
        <Button
          size="sm"
          variant={activeTab === 'system' ? 'default' : 'ghost'}
          className="gap-2 text-xs font-semibold"
          onClick={() => {
            setActiveTab('system');
          }}
        >
          <Icon name="server" size="xs" />
          Hệ Thống & Bộ Nhớ Đệm
        </Button>
      </div>

      {activeTab === 'analytics' ? (
        <div className="space-y-6">
          <DashboardKpiCards />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <RevenueTrendChart />
            </div>
            <div className="lg:col-span-1">
              <CategoryDonutChart />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <TopProductsBarChart />
            </div>
            <div className="lg:col-span-2">
              <TopBuyProductsTable />
            </div>
          </div>
        </div>
      ) : (
        <SystemMonitoringPanel />
      )}
    </div>
  );
}
