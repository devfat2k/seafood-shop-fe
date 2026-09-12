'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useTopBuyProductsQuery } from '@/libs/queries/admin/dashboard';
import { formatCurrency } from '@/utils/Helpers';
import { ChartFeedbackStates } from './ChartFeedbackStates';

const chartConfig = {
  totalSold: {
    label: 'Số lượng đã bán',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

export function TopProductsBarChart() {
  const { data: products, isLoading, isError, refetch } = useTopBuyProductsQuery(5);

  const chartData = React.useMemo(() => {
    if (!products || products.length === 0) {
      return [];
    }
    return products.map((item) => {
      const shortName = item.name.length > 18 ? `${item.name.slice(0, 18)}...` : item.name;
      const sold = item.mostBuy ?? item.totalSold ?? 0;
      const price = item.price ?? 0;
      return {
        name: item.name,
        shortName,
        totalSold: sold,
        price,
        totalRevenue: item.totalRevenue ?? sold * price,
      };
    });
  }, [products]);

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-bold sm:text-base">Sản Lượng Top 5 Bán Chạy</CardTitle>
        <p className="mt-0.5 text-xs text-muted-foreground">
          So sánh trực quan sản lượng tiêu thụ giữa các mặt hàng chủ lực
        </p>
      </CardHeader>

      <CardContent className="pt-2">
        <ChartFeedbackStates
          isLoading={isLoading}
          isError={isError}
          isEmpty={chartData.length === 0}
          errorTitle="Không thể tải biểu đồ sản phẩm bán chạy"
          emptyTitle="Chưa có số liệu bán chạy"
          emptyIcon="fish"
          onRetry={() => {
            void refetch();
          }}
          skeleton={
            <div className="space-y-4 py-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-3.5 w-32" />
                  <Skeleton className="h-6 w-full rounded-md" />
                </div>
              ))}
            </div>
          }
        >
          <ChartContainer config={chartConfig} className="h-64 w-full">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 5, right: 16, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} tickMargin={6} />
              <YAxis
                type="category"
                dataKey="shortName"
                tickLine={false}
                axisLine={false}
                width={100}
                tick={{ fontSize: 11 }}
              />
              <ChartTooltip
                cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
                content={
                  <ChartTooltipContent
                    formatter={(val, _, item) => {
                      const totalRev =
                        typeof item.payload?.totalRevenue === 'number'
                          ? item.payload.totalRevenue
                          : 0;

                      return (
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">Đã bán:</span>
                            <span className="font-mono font-bold text-foreground">
                              {val} phần/kg
                            </span>
                          </div>
                          <div className="flex items-center gap-2 font-mono text-[11px]">
                            <span className="text-muted-foreground">Doanh số:</span>
                            <span className="font-bold text-primary">
                              {formatCurrency(totalRev)}
                            </span>
                          </div>
                        </div>
                      );
                    }}
                    labelFormatter={(_, payload) => {
                      const item = payload[0]?.payload as { name?: string } | undefined;
                      return item?.name ?? '';
                    }}
                  />
                }
              />
              <Bar dataKey="totalSold" fill="var(--chart-2)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ChartContainer>
        </ChartFeedbackStates>
      </CardContent>
    </Card>
  );
}
