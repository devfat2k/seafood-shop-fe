'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminOrdersQuery, useUpdateOrderStatusMutation } from '@/libs/queries/admin/orders';
import type { AdminOrderStatus } from '@/types/admin';

const STATUS_OPTIONS: { value: AdminOrderStatus; label: string; color: string }[] = [
  { value: 'PENDING', label: 'Chờ xác nhận', color: 'bg-amber-100 text-amber-800' },
  { value: 'CONFIRMED', label: 'Đã xác nhận', color: 'bg-blue-100 text-blue-800' },
  { value: 'SHIPPED', label: 'Đang giao', color: 'bg-purple-100 text-purple-800' },
  { value: 'DONE', label: 'Hoàn tất', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'CANCELLED', label: 'Đã hủy', color: 'bg-red-100 text-red-800' },
];

function getStatusBadge(status: string) {
  const found = STATUS_OPTIONS.find((s) => s.value === status);
  return found ?? { label: status, color: 'bg-muted text-muted-foreground' };
}

const NEXT_STATUS: Record<string, AdminOrderStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['SHIPPED', 'CANCELLED'],
  SHIPPED: ['DONE'],
  DONE: [],
  CANCELLED: [],
};

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

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <Button
          size="sm"
          variant={statusFilter === undefined ? 'default' : 'outline'}
          onClick={() => {
            setStatusFilter(undefined);
            setPage(0);
          }}
          className="text-xs"
        >
          Tất cả
        </Button>
        {STATUS_OPTIONS.map((s) => (
          <Button
            key={s.value}
            size="sm"
            variant={statusFilter === s.value ? 'default' : 'outline'}
            onClick={() => {
              setStatusFilter(s.value);
              setPage(0);
            }}
            className="text-xs"
          >
            {s.label}
          </Button>
        ))}
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold">Đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Loading */}
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

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Không thể tải danh sách đơn hàng
              </p>
              <p className="mt-1 mb-3 text-[11px] text-muted-foreground">
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

          {/* Empty */}
          {!isLoading && !isError && (!data?.content || data.content.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="shopping-bag" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Không có đơn hàng nào</p>
              <p className="mt-1 text-[11px] text-muted-foreground">
                Đơn hàng sẽ xuất hiện khi khách đặt mua
              </p>
            </div>
          )}

          {/* Data Table */}
          {!isLoading && !isError && data?.content && data.content.length > 0 && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mã Đơn</TableHead>
                    <TableHead>Ngày Đặt</TableHead>
                    <TableHead className="text-center">Trạng Thái</TableHead>
                    <TableHead className="text-right">Tổng Tiền</TableHead>
                    <TableHead>Thanh Toán</TableHead>
                    <TableHead className="text-center">Chuyển Trạng Thái</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.content.map((order) => {
                    const badge = getStatusBadge(order.status);
                    const nextStatuses = NEXT_STATUS[order.status] ?? [];
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="text-xs font-bold text-foreground">
                          {order.code}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(order.orderDate).toLocaleDateString('vi-VN')}
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge className={`text-[10px] ${badge.color}`}>{badge.label}</Badge>
                        </TableCell>
                        <TableCell className="text-right text-xs font-semibold text-foreground">
                          {order.totalPrice.toLocaleString('vi-VN')}₫
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {order.paymentMethod ?? '—'}
                        </TableCell>
                        <TableCell className="text-center">
                          {nextStatuses.length > 0 ? (
                            <div className="flex items-center justify-center gap-1">
                              {nextStatuses.map((ns) => {
                                const nsBadge = getStatusBadge(ns);
                                return (
                                  <button
                                    key={ns}
                                    type="button"
                                    onClick={() => {
                                      void handleUpdateStatus(order.id, ns);
                                    }}
                                    className={`rounded-md px-2 py-1 text-[10px] font-semibold transition-colors hover:opacity-80 ${nsBadge.color}`}
                                    disabled={updateStatusMutation.isPending}
                                  >
                                    → {nsBadge.label}
                                  </button>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-[10px] text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">
                  Trang {page + 1} / {data.totalPages} · Tổng {data.totalElements} đơn hàng
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={page === 0}
                    onClick={() => {
                      setPage((p) => Math.max(0, p - 1));
                    }}
                  >
                    Trước
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={data.last}
                    onClick={() => {
                      setPage((p) => p + 1);
                    }}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
