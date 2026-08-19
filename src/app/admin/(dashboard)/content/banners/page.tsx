'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { BannerFormDialog } from '@/components/admin/content/BannerFormDialog';
import { BannersTable } from '@/components/admin/content/BannersTable';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useAdminBannersQuery,
  useDeleteBannerMutation,
  useToggleBannerMutation,
} from '@/libs/queries/admin/content';
import type { HeroBanner } from '@/types/admin';

export default function AdminBannersPage() {
  const { data: banners, isLoading, isError, refetch } = useAdminBannersQuery();
  const deleteMutation = useDeleteBannerMutation();
  const toggleMutation = useToggleBannerMutation();

  const [formOpen, setFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<HeroBanner | null>(null);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa banner thành công');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Xóa banner thất bại');
    }
  };

  const handleToggle = async (id: number) => {
    try {
      await toggleMutation.mutateAsync(id);
      toast.success('Đã cập nhật trạng thái banner');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Cập nhật trạng thái thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Hero Banners</h2>
          <p className="text-xs text-muted-foreground">
            Quản lý các banner hiển thị trên trang chủ Storefront
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditingBanner(null);
            setFormOpen(true);
          }}
          className="text-xs font-semibold"
        >
          <Icon name="plus" size="xs" className="mr-1.5" />
          Thêm Banner
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold">Danh sách Banners</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border/50 py-2">
                  <Skeleton className="h-12 w-20 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-64" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
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
                Không thể tải danh sách banners
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

          {!isLoading && !isError && (!banners || banners.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="image" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Chưa có banner nào</p>
              <p className="mt-1 mb-3 text-xs text-muted-foreground">
                Tạo banner để làm nổi bật ưu đãi trên trang chủ
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setEditingBanner(null);
                  setFormOpen(true);
                }}
              >
                + Thêm banner đầu tiên
              </Button>
            </div>
          )}

          {!isLoading && !isError && banners && banners.length > 0 && (
            <BannersTable
              banners={banners}
              deletingId={deleteMutation.isPending && deleteTarget ? deleteTarget.id : null}
              onEdit={(banner) => {
                setEditingBanner(banner);
                setFormOpen(true);
              }}
              onToggle={(id) => void handleToggle(id)}
              onDelete={(banner) => {
                setDeleteTarget(banner);
              }}
            />
          )}
        </CardContent>
      </Card>

      <BannerFormDialog open={formOpen} onOpenChange={setFormOpen} bannerToEdit={editingBanner} />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Xóa Banner"
        description={`Bạn có chắc muốn xóa banner "${deleteTarget?.title ?? ''}"?`}
        confirmText="Xóa Banner"
        isLoading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
