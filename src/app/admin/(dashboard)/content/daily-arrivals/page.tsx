'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { DailyArrivalFormDialog } from '@/components/admin/content/DailyArrivalFormDialog';
import { DailyArrivalsTable } from '@/components/admin/content/DailyArrivalsTable';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
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

  const [formOpen, setFormOpen] = useState(false);
  const [editingArrival, setEditingArrival] = useState<DailyArrival | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DailyArrival | null>(null);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa khỏi danh sách cập bến');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Xóa thất bại');
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
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border/50 py-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-40 flex-1" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          )}

          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">Không thể tải dữ liệu cập bến</p>
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

          {!isLoading && !isError && (!arrivals || arrivals.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="calendar" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Chưa có thông tin cập bến trong ngày này
              </p>
              <p className="mt-1 mb-3 text-xs text-muted-foreground">
                Thêm mẻ hải sản mới vừa về cảng
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setEditingArrival(null);
                  setFormOpen(true);
                }}
              >
                + Thêm cập bến
              </Button>
            </div>
          )}

          {!isLoading && !isError && arrivals && arrivals.length > 0 && (
            <DailyArrivalsTable
              arrivals={arrivals}
              deletingId={deleteMutation.isPending && deleteTarget ? deleteTarget.id : null}
              onEdit={(arr) => {
                setEditingArrival(arr);
                setFormOpen(true);
              }}
              onDelete={(arr) => {
                setDeleteTarget(arr);
              }}
            />
          )}
        </CardContent>
      </Card>

      <DailyArrivalFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        arrivalToEdit={editingArrival}
        defaultDate={date}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Xóa mục cập bến"
        description={`Bạn có chắc muốn xóa "${deleteTarget?.productName ?? deleteTarget?.title ?? 'mục cập bến'}"?`}
        confirmText="Xóa"
        isLoading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
