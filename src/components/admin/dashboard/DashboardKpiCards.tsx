'use client';

import { useMemo } from 'react';
import { Icon } from '@/components/common/Icon';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRevenueInMonthQuery, useTopBuyProductsQuery } from '@/libs/queries/admin/dashboard';
import { useAdminOrdersQuery } from '@/libs/queries/admin/orders';
import { formatCurrency } from '@/utils/Helpers';
import { parseRevenueInMonth } from './dashboard-utils';

export function DashboardKpiCards() {
  const { data: revenueData, isLoading: isRevLoading } = useRevenueInMonthQuery();
  const { data: topBuyData, isLoading: isTopLoading } = useTopBuyProductsQuery(5);
  const { data: ordersData, isLoading: isOrdersLoading } = useAdminOrdersQuery({
    page: 0,
    size: 100,
  });

  const isLoading = isRevLoading || isTopLoading || isOrdersLoading;

  const latestMonthData = useMemo(() => {
    if (!revenueData || revenueData.length === 0) {
      return null;
    }
    return revenueData
      .map(parseRevenueInMonth)
      .toSorted((a, b) => (a.year === b.year ? b.month - a.month : b.year - a.year))[0];
  }, [revenueData]);

  const totalRevenue = latestMonthData?.revenue ?? 0;
  const totalOrders = ordersData?.totalElements ?? 0;

  const topProduct = topBuyData?.[0];
  const topProductSold = topProduct ? (topProduct.mostBuy ?? topProduct.totalSold ?? 0) : 0;

  const cards = [
    {
      title: 'Doanh Thu Tháng Này',
      value: formatCurrency(totalRevenue),
      sub: latestMonthData ? latestMonthData.fullMonth : 'Tháng hiện tại',
      iconName: 'sparkles',
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'Tổng Đơn Hàng',
      value: totalOrders.toLocaleString('vi-VN'),
      sub: totalOrders > 0 ? `${totalOrders} đơn hàng trên hệ thống` : 'Chưa có đơn hàng',
      iconName: 'truck',
      color: 'text-secondary bg-secondary/10',
    },
    {
      title: 'Sản Phẩm Bán Chạy Nhất',
      value: topProduct?.name ?? 'Chưa có',
      sub: topProduct ? `Đã bán: ${topProductSold} phần/kg` : 'Chưa có số liệu',
      iconName: 'fish',
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      title: 'Giá Trị Đơn Trung Bình',
      value: totalOrders > 0 ? formatCurrency(Math.round(totalRevenue / totalOrders)) : '0₫',
      sub: totalOrders > 0 ? 'AOV trung bình mỗi đơn' : 'Chưa có đơn hàng',
      iconName: 'shopping-bag',
      color: 'text-emerald-500 bg-emerald-500/10',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="border-border">
            <CardContent className="p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <Skeleton className="h-3.5 w-24" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-10 w-10 rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card) => (
        <Card key={card.title} className="border-border transition-all hover:border-primary/30">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1">
                <p className="text-xs font-medium text-muted-foreground">{card.title}</p>
                <p className="max-w-45 truncate font-heading text-lg font-bold text-foreground sm:text-xl">
                  {card.value}
                </p>
                <p className="text-[11px] text-muted-foreground">{card.sub}</p>
              </div>

              <div
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon name={card.iconName} size="md" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
