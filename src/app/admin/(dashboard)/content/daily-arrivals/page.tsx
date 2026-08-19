'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { DailyArrivalFormDialog } from '@/components/admin/content/DailyArrivalFormDialog';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  useAdminDailyArrivalsQuery,
  useDeleteDailyArrivalMutation,
} from '@/libs/queries/admin/content';
import type { DailyArrival } from '@/types/admin';

function formatToday(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function AdminDailyArrivalsPage() {
  const [date, setDate] = useState(formatToday);
  const { data: arrivals, isLoading, isError, refetch } = useAdminDailyArrivalsQuery(date);
  const deleteMutation = useDeleteDailyArrivalMutation();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Dialog state
  const [formOpen, setFormOpen] = useState(false);
  const [editingArrival, setEditingArrival] = useState<DailyArrival | null>(null);

  const handleDelete = async (id: number, title?: string) => {
    // eslint-disable-next-line no-alert -- simple admin confirmation dialog
    if (!window.confirm(`Bạn có chắc muốn xóa "${title ?? 'mục cập bến'}" này?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Đã xóa khỏi danh sách cập bến');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Xóa thất bại');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Hải sản cập bến</h2>
          <p className="text-xs text-muted-foreground">
            Quản lý danh sách hải sản tươi cập bến theo từng ngày
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditingArrival(null);
            setFormOpen(true);
          }}
          className="text-xs font-semibold"
        >
          <Icon name="plus" size="xs" className="mr-1.5" />
          Thêm cập bến
        </Button>
      </div>

      {/* Date picker */}
      <div className="flex items-center gap-3">
        <label htmlFor="arrival-date" className="text-xs font-semibold text-foreground">
          Ngày:
        </label>
        <Input
          id="arrival-date"
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
          className="h-8 w-48 text-xs"
        />
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold">
            Cập bến ngày {new Date(date).toLocaleDateString('vi-VN')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Loading */}
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border/50 py-2">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
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
                Không thể tải danh sách cập bến
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
          {!isLoading && !isError && (!arrivals || arrivals.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="clock" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Chưa có hải sản cập bến cho ngày này
              </p>
              <p className="mt-1 mb-3 text-[11px] text-muted-foreground">
                Thêm sản phẩm cập bến để hiển thị trên trang chủ
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setEditingArrival(null);
                  setFormOpen(true);
                }}
              >
                + Thêm sản phẩm cập bến
              </Button>
            </div>
          )}

          {/* Data Table */}
          {!isLoading && !isError && arrivals && arrivals.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Tên SP / Tiêu đề</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead>Mô Tả</TableHead>
                  <TableHead className="text-right">Giá</TableHead>
                  <TableHead className="text-right">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {arrivals.map((item, index) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center text-xs font-bold text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-foreground">
                      {item.title ?? item.productName ?? '—'}
                    </TableCell>
                    <TableCell className="text-xs font-medium text-primary">
                      {item.badge ?? '—'}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                      {item.description ?? '—'}
                    </TableCell>
                    <TableCell className="text-right text-xs font-medium text-foreground">
                      {item.price ? `${item.price.toLocaleString('vi-VN')}₫` : '—'}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingArrival(item);
                            setFormOpen(true);
                          }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="Sửa thông tin cập bến"
                        >
                          <Icon name="edit-3" size="xs" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => {
                            void handleDelete(item.id, item.title);
                          }}
                          disabled={deletingId === item.id}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                          title="Xóa khỏi danh sách"
                        >
                          <Icon name="trash-2" size="xs" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Form Dialog */}
      <DailyArrivalFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        arrivalToEdit={editingArrival}
        defaultDate={date}
      />
    </div>
  );
}
