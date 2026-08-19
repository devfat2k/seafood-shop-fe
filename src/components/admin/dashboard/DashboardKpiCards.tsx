'use client';

import { Icon } from '@/components/common/Icon';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRevenueInMonthQuery, useTopBuyProductsQuery } from '@/libs/queries/admin/dashboard';

export function DashboardKpiCards() {
  const { data: revenueData, isLoading: isRevLoading } = useRevenueInMonthQuery();
  const { data: topBuyData, isLoading: isTopLoading } = useTopBuyProductsQuery(5);

  const isLoading = isRevLoading || isTopLoading;

  // Tính toán tổng doanh thu gần nhất
  const currentMonthData = revenueData?.at(-1);
  const totalRevenue = currentMonthData?.revenue ?? 0;
  const totalOrders = currentMonthData?.orderCount ?? 0;

  const topProduct = topBuyData?.[0];

  const cards = [
    {
      title: 'Doanh Thu Tháng Này',
      value: `${totalRevenue.toLocaleString('vi-VN')}₫`,
      sub: currentMonthData
        ? `Tháng ${currentMonthData.month}/${currentMonthData.year}`
        : 'Tháng hiện tại',
      iconName: 'sparkles',
      color: 'text-primary bg-primary/10',
    },
    {
      title: 'Tổng Đơn Hàng',
      value: totalOrders.toLocaleString('vi-VN'),
      sub: 'Đơn hàng hoàn tất trong tháng',
      iconName: 'truck',
      color: 'text-secondary bg-secondary/10',
    },
    {
      title: 'Sản Phẩm Bán Chạy Nhất',
      value: topProduct?.name ?? 'Chưa có',
      sub: topProduct ? `Đã bán: ${topProduct.totalSold ?? 0}` : 'Chưa có số liệu',
      iconName: 'fish',
      color: 'text-amber-500 bg-amber-500/10',
    },
    {
      title: 'Hệ Thống & Bộ Nhớ Đệm',
      value: 'Sẵn sàng',
      sub: 'Redis Cache & API v1.2.0',
      iconName: 'shield-check',
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
