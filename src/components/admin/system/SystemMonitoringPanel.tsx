'use client';

import * as React from 'react';
import { toast } from 'sonner';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEvictCacheMutation } from '@/libs/queries/admin/dashboard';
import { CACHE_PARTITIONS, SYSTEM_SERVICES } from './constants';

export function SystemMonitoringPanel() {
  const evictMutation = useEvictCacheMutation();
  const [confirmOpen, setConfirmOpen] = React.useState(false);
  const [lastEvicted, setLastEvicted] = React.useState<string | null>(null);

  const handleEvictCache = async () => {
    try {
      await evictMutation.mutateAsync();
      const now = new Date();
      setLastEvicted(now.toLocaleTimeString('vi-VN'));
      setConfirmOpen(false);
      toast.success('Đã đồng bộ toàn bộ dữ liệu mới nhất lên trang chủ cửa hàng!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Đồng bộ dữ liệu thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardHeader className="flex flex-col gap-2 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-sm font-bold sm:text-base">
                Đồng Bộ Hiển Thị Trang Chủ
              </CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Đồng bộ ngay các thay đổi về giá, sản phẩm, danh mục và banner lên website để khách
                hàng thấy ngay
              </p>
            </div>

            <Button
              size="sm"
              disabled={evictMutation.isPending}
              onClick={() => {
                setConfirmOpen(true);
              }}
              className="shrink-0 gap-2"
            >
              <Icon
                name="sparkles"
                size="xs"
                className={evictMutation.isPending ? 'animate-spin' : ''}
              />
              {evictMutation.isPending ? 'Đang đồng bộ...' : 'Đồng Bộ Lên Cửa Hàng Ngay'}
            </Button>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-muted/30 p-3.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                <span className="font-semibold text-foreground">Trạng thái hiển thị:</span>
                <span className="text-muted-foreground">
                  Dữ liệu đang được phân phối ổn định tới khách mua
                </span>
              </div>
              {lastEvicted && (
                <span className="font-mono text-muted-foreground">
                  Đồng bộ gần nhất: {lastEvicted}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-foreground">
                Các khu vực nội dung được đồng bộ:
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {CACHE_PARTITIONS.map((partition) => (
                  <div
                    key={partition.key}
                    className="flex flex-col justify-between rounded-xl border border-border p-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-foreground">{partition.name}</span>
                      <Badge
                        variant="outline"
                        className="border-emerald-200 text-[10px] font-medium text-emerald-600 dark:border-emerald-800/40 dark:text-emerald-400"
                      >
                        Đã kết nối
                      </Badge>
                    </div>
                    <p className="mt-1 text-[11px] text-muted-foreground">{partition.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-bold sm:text-base">Trạng Thái Dịch Vụ</CardTitle>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Kết nối và tình trạng hạ tầng kỹ thuật
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            {SYSTEM_SERVICES.map((service) => (
              <div
                key={service.name}
                className="space-y-1.5 rounded-xl border border-border p-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-foreground">{service.name}</span>
                  <span className="flex items-center gap-1.5 font-medium text-emerald-600 dark:text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    {service.status}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{service.protocol}</span>
                  <span className="font-mono">{service.version}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Xác nhận đồng bộ hệ thống"
        description="Thao tác này sẽ làm mới cache toàn bộ danh mục, sản phẩm và trang chủ trên toàn hệ thống để khách hàng thấy ngay dữ liệu mới nhất. Bạn có muốn tiếp tục?"
        confirmText="Đồng bộ ngay"
        variant="default"
        isLoading={evictMutation.isPending}
        onConfirm={handleEvictCache}
      />
    </div>
  );
}
