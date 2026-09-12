'use client';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { toast } from 'sonner';
import { SystemMonitoringPanel } from '@/components/admin/system/SystemMonitoringPanel';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { adminDashboardKeys } from '@/libs/queries/admin/dashboard';
import { adminOrderKeys } from '@/libs/queries/admin/orders';
import { CategoryDonutChart } from './CategoryDonutChart';
import { DashboardKpiCards } from './DashboardKpiCards';
import { RevenueTrendChart } from './RevenueTrendChart';
import { TopBuyProductsTable } from './TopBuyProductsTable';
import { TopProductsBarChart } from './TopProductsBarChart';

type DashboardTab = 'analytics' | 'system';

export function DashboardTabs() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = React.useState<DashboardTab>('analytics');
  const [lastUpdated, setLastUpdated] = React.useState<string>(() =>
    new Date().toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    }),
  );

  const isFetchingDashboard = useIsFetching({ queryKey: adminDashboardKeys.all }) > 0;
  const isFetchingOrders = useIsFetching({ queryKey: adminOrderKeys.all }) > 0;
  const isRefreshing = isFetchingDashboard || isFetchingOrders;

  const handleRefresh = React.useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: adminDashboardKeys.all }),
      queryClient.invalidateQueries({ queryKey: adminOrderKeys.all }),
    ]);
    setLastUpdated(
      new Date().toLocaleTimeString('vi-VN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }),
    );
    toast.success('Đã cập nhật dữ liệu thống kê mới nhất');
  }, [queryClient]);

  React.useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;

    if (activeTab === 'analytics') {
      interval = setInterval(() => {
        void queryClient.invalidateQueries({ queryKey: adminDashboardKeys.all });
        void queryClient.invalidateQueries({ queryKey: adminOrderKeys.all });
        setLastUpdated(
          new Date().toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
        );
      }, 30 * 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeTab, queryClient]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 border-b border-border pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
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
            Trạng Thái & Đồng Bộ
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-muted-foreground">
            Cập nhật lúc: <strong className="font-mono text-foreground">{lastUpdated}</strong>
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={isRefreshing}
            className="h-8 gap-1.5 text-xs font-medium"
            onClick={() => {
              void handleRefresh();
            }}
          >
            <Icon name="rotate-cw" size="xs" className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Đang tải...' : 'Làm mới'}
          </Button>
        </div>
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
