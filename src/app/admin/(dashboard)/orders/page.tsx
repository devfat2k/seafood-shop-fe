'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AdminOrdersTable } from '@/components/admin/orders/AdminOrdersTable';
import { AdminOrdersToolbar, getStatusBadge } from '@/components/admin/orders/AdminOrdersToolbar';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAdminOrdersQuery, useUpdateOrderStatusMutation } from '@/libs/queries/admin/orders';
import type { AdminOrderStatus } from '@/types/admin';

export default function AdminOrdersPage() {
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState<AdminOrderStatus>();

  const { data, isLoading, isError, refetch } = useAdminOrdersQuery({
    page,
    size: 10,
    sort: 'createdAt,desc',
    status: statusFilter,
  });

  const updateStatusMutation = useUpdateOrderStatusMutation();

  const handleUpdateStatus = async (id: number, status: AdminOrderStatus) => {
    try {
      await updateStatusMutation.mutateAsync({ id, data: { status } });
      toast.success(`Đã cập nhật trạng thái → ${getStatusBadge(status).label}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Cập nhật trạng thái thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-lg font-bold text-foreground">Quản lý đơn hàng</h2>
        <p className="text-xs text-muted-foreground">
          Theo dõi và xử lý toàn bộ đơn hàng trong hệ thống
        </p>
      </div>

      <AdminOrdersToolbar
        statusFilter={statusFilter}
        onSelectStatus={(status) => {
          setStatusFilter(status);
          setPage(0);
        }}
      />

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold">Đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border/50 py-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32 flex-1" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Không thể tải danh sách đơn hàng
              </p>
              <p className="mt-1 mb-3 text-xs text-muted-foreground">
                Vui lòng kiểm tra kết nối và thử lại
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  void refetch();
                }}
              >
                Thử lại
              </Button>
            </div>
          )}

          {!isLoading && !isError && (!data?.content || data.content.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="shopping-bag" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Không có đơn hàng nào</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Đơn hàng sẽ xuất hiện khi khách đặt mua
              </p>
            </div>
          )}

          {!isLoading && !isError && data?.content && data.content.length > 0 && (
            <AdminOrdersTable
              orders={data.content}
              page={page}
              totalPages={data.totalPages}
              totalElements={data.totalElements}
              isLastPage={data.last}
              isUpdating={updateStatusMutation.isPending}
              onPageChange={setPage}
              onUpdateStatus={(id, status) => void handleUpdateStatus(id, status)}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
