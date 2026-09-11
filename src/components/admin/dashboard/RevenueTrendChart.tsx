'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useRevenueInMonthQuery } from '@/libs/queries/admin/dashboard';
import { formatCurrency } from '@/utils/Helpers';
import { ChartFeedbackStates } from './ChartFeedbackStates';

const chartConfig = {
  revenue: {
    label: 'Doanh thu',
    color: 'var(--chart-1)',
  },
  orderCount: {
    label: 'Số đơn hàng',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig;

type MetricMode = 'revenue' | 'orderCount';

function formatYAxisValue(val: number, mode: MetricMode): string {
  if (mode === 'revenue') {
    if (val >= 1_000_000) {
      return `${(val / 1_000_000).toFixed(0)}Tr`;
    }
    return `${val}`;
  }
  return `${val}`;
}

export function RevenueTrendChart() {
  const { data, isLoading, isError, refetch } = useRevenueInMonthQuery();
  const [mode, setMode] = React.useState<MetricMode>('revenue');

  const chartData = React.useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }
    return [...data]
      .toSorted((a, b) => (a.year === b.year ? a.month - b.month : a.year - b.year))
      .map((item) => ({
        monthLabel: `T${item.month}/${item.year.toString().slice(-2)}`,
        fullMonth: `Tháng ${item.month}/${item.year}`,
        revenue: item.revenue ?? 0,
        orderCount: item.orderCount ?? 0,
      }));
  }, [data]);

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-col gap-3 pb-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-sm font-bold sm:text-base">
            Xu Hướng Doanh Thu & Đơn Hàng
          </CardTitle>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Hiệu quả kinh doanh thực tế theo các tháng gần nhất
          </p>
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-border bg-muted/30 p-1">
          <Button
            size="sm"
            variant={mode === 'revenue' ? 'default' : 'ghost'}
            className="h-7 px-3 text-xs"
            onClick={() => {
              setMode('revenue');
            }}
          >
            Doanh thu
          </Button>
          <Button
            size="sm"
            variant={mode === 'orderCount' ? 'default' : 'ghost'}
            className="h-7 px-3 text-xs"
            onClick={() => {
              setMode('orderCount');
            }}
          >
            Số lượng đơn
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-2">
        <ChartFeedbackStates
          isLoading={isLoading}
          isError={isError}
          isEmpty={chartData.length === 0}
          errorTitle="Không thể tải dữ liệu xu hướng doanh thu"
          emptyTitle="Chưa có dữ liệu xu hướng doanh thu"
          emptySubtitle="Số liệu sẽ tự động biểu diễn khi có các đơn hàng hoàn tất"
          emptyIcon="sparkles"
          onRetry={() => {
            void refetch();
          }}
          skeleton={
            <div className="space-y-4 py-6">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-20" />
              </div>
              <Skeleton className="h-64 w-full rounded-xl" />
            </div>
          }
        >
          <ChartContainer config={chartConfig} className="h-72 w-full">
            <AreaChart data={chartData} margin={{ top: 10, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="fillOrderCount" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="monthLabel" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(val: number) => formatYAxisValue(val, mode)}
              />
              <ChartTooltip
                cursor={{ stroke: 'var(--border)', strokeWidth: 1 }}
                content={
                  <ChartTooltipContent
                    formatter={(val, name) => (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">
                          {name === 'revenue' ? 'Doanh thu:' : 'Đơn hàng:'}
                        </span>
                        <span className="font-mono font-bold text-foreground">
                          {name === 'revenue' ? formatCurrency(Number(val) || 0) : `${val} đơn`}
                        </span>
                      </div>
                    )}
                    labelFormatter={(_, payload) => {
                      const item = payload[0]?.payload as { fullMonth?: string } | undefined;
                      return item?.fullMonth ?? '';
                    }}
                  />
                }
              />
              {mode === 'revenue' ? (
                <Area
                  type="natural"
                  dataKey="revenue"
                  stroke="var(--chart-1)"
                  strokeWidth={2.5}
                  fill="url(#fillRevenue)"
                />
              ) : (
                <Area
                  type="natural"
                  dataKey="orderCount"
                  stroke="var(--chart-2)"
                  strokeWidth={2.5}
                  fill="url(#fillOrderCount)"
                />
              )}
            </AreaChart>
          </ChartContainer>
        </ChartFeedbackStates>
      </CardContent>
    </Card>
  );
}
