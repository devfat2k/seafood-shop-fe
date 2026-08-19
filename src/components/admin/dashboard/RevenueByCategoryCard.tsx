'use client';

import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useRevenueByCategoryQuery } from '@/libs/queries/admin/dashboard';

export function RevenueByCategoryCard() {
  const { data: categories, isLoading, isError, refetch } = useRevenueByCategoryQuery();

  const totalRevenue = categories?.reduce((acc, cur) => acc + (cur.revenue || 0), 0) ?? 0;

  return (
    <Card className="border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold sm:text-base">Doanh Thu Theo Danh Mục</CardTitle>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Tỷ trọng đóng góp doanh thu theo từng nhóm hàng hải sản
        </p>
      </CardHeader>

      <CardContent>
        {/* Loading */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-3.5 w-28" />
                  <Skeleton className="h-3.5 w-20" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <Icon name="x" size="sm" />
            </div>
            <p className="text-xs font-semibold text-foreground">
              Không thể tải doanh thu theo danh mục
            </p>
            <Button
              size="sm"
              variant="outline"
              className="mt-3"
              onClick={() => {
                void refetch();
              }}
            >
              Thử lại
            </Button>
          </div>
        )}

        {/* Empty */}
        {!isLoading && !isError && (!categories || categories.length === 0) && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-xs text-muted-foreground">
              Chưa có dữ liệu phân bổ doanh thu danh mục
            </p>
          </div>
        )}

        {/* Data list */}
        {!isLoading && !isError && categories && categories.length > 0 && (
          <div className="space-y-4">
            {categories.map((cat) => {
              const percentage =
                totalRevenue > 0 ? Math.round(((cat.revenue || 0) / totalRevenue) * 100) : 0;

              return (
                <div key={cat.categoryId} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{cat.categoryName}</span>
                    <span className="font-medium text-muted-foreground">
                      {(cat.revenue || 0).toLocaleString('vi-VN')}₫ ({percentage}%)
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-500"
                      style={{ width: `${Math.max(percentage, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
