'use client';

import * as React from 'react';
import { Pie, PieChart } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { ChartConfig } from '@/components/ui/chart';
import { Skeleton } from '@/components/ui/skeleton';
import { useRevenueByCategoryQuery } from '@/libs/queries/admin/dashboard';
import { formatCurrency } from '@/utils/Helpers';
import { ChartFeedbackStates } from './ChartFeedbackStates';

const CATEGORY_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
  '#0B4A5C',
  '#8B5CF6',
  '#EC4899',
];

export function CategoryDonutChart() {
  const { data: categories, isLoading, isError, refetch } = useRevenueByCategoryQuery();

  const totalRevenue = React.useMemo(
    () => categories?.reduce((acc, cur) => acc + (cur.revenue ?? 0), 0) ?? 0,
    [categories],
  );

  const { chartData, chartConfig } = React.useMemo(() => {
    if (!categories || categories.length === 0) {
      return { chartData: [], chartConfig: {} as ChartConfig };
    }

    const cfg: ChartConfig = {};
    const data = categories.map((cat, index) => {
      const name = cat.categoryName ?? cat.name ?? `Danh mục ${index + 1}`;
      const color = CATEGORY_COLORS[index % CATEGORY_COLORS.length] ?? 'var(--chart-1)';
      const key = `cat_${index}`;

      cfg[key] = {
        label: name,
        color,
      };

      const percent = totalRevenue > 0 ? Math.round(((cat.revenue ?? 0) / totalRevenue) * 100) : 0;

      return {
        key,
        name,
        revenue: cat.revenue ?? 0,
        percent,
        fill: color,
        color,
      };
    });

    return { chartData: data, chartConfig: cfg };
  }, [categories, totalRevenue]);

  return (
    <Card className="flex flex-col border-border">
      <CardHeader className="pb-1">
        <CardTitle className="text-sm font-bold sm:text-base">
          Tỷ Trọng Doanh Thu Danh Mục
        </CardTitle>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Đóng góp cơ cấu doanh số theo từng nhóm hải sản
        </p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col justify-between pt-2">
        <ChartFeedbackStates
          isLoading={isLoading}
          isError={isError}
          isEmpty={chartData.length === 0}
          errorTitle="Không thể tải cơ cấu danh mục"
          emptyTitle="Chưa có dữ liệu danh mục"
          emptyIcon="fish"
          onRetry={() => {
            void refetch();
          }}
          skeleton={
            <div className="flex flex-col items-center justify-center space-y-4 py-8">
              <Skeleton className="h-44 w-44 rounded-full" />
              <div className="w-full space-y-2">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-4/5" />
              </div>
            </div>
          }
        >
          <div className="flex flex-col gap-4">
            <div className="relative flex items-center justify-center">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[190px] w-full"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        hideLabel
                        formatter={(val, _, item) => {
                          const itemName =
                            typeof item.payload?.name === 'string'
                              ? item.payload.name
                              : String(item.name ?? '');
                          const itemPercent =
                            typeof item.payload?.percent === 'number' ? item.payload.percent : 0;
                          const numericVal = typeof val === 'number' ? val : Number(val ?? 0);

                          return (
                            <div className="flex flex-col gap-1">
                              <span className="font-semibold text-foreground">{itemName}</span>
                              <div className="flex items-center gap-2 font-mono text-xs">
                                <span className="font-bold text-primary">
                                  {formatCurrency(numericVal)}
                                </span>
                                <span className="text-muted-foreground">({itemPercent}%)</span>
                              </div>
                            </div>
                          );
                        }}
                      />
                    }
                  />
                  <Pie
                    data={chartData}
                    dataKey="revenue"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    stroke="var(--card)"
                    strokeWidth={2}
                  />
                </PieChart>
              </ChartContainer>

              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  Tổng Doanh Thu
                </span>
                <span className="font-mono text-xs font-bold text-foreground sm:text-sm">
                  {formatCurrency(totalRevenue)}
                </span>
              </div>
            </div>

            <div className="max-h-36 space-y-2 overflow-y-auto pr-1">
              {chartData.map((item) => (
                <div key={item.key} className="flex items-center justify-between text-xs">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="truncate font-medium text-foreground">{item.name}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 font-mono text-[11px]">
                    <span className="font-bold text-foreground">{item.percent}%</span>
                    <span className="text-muted-foreground">({formatCurrency(item.revenue)})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ChartFeedbackStates>
      </CardContent>
    </Card>
  );
}
