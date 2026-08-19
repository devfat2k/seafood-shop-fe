'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { BannerFormDialog } from '@/components/admin/content/BannerFormDialog';
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
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Dialog state
  const [formOpen, setFormOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<HeroBanner | null>(null);

  const handleDelete = async (id: number, title: string) => {
    // eslint-disable-next-line no-alert -- simple admin confirmation dialog
    if (!window.confirm(`Bạn có chắc muốn xóa banner "${title}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Đã xóa banner thành công');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Xóa banner thất bại');
    } finally {
      setDeletingId(null);
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
          {/* Loading */}
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

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Không thể tải danh sách banners
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
          {!isLoading && !isError && (!banners || banners.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="camera" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Chưa có banner nào</p>
              <p className="mt-1 mb-3 text-[11px] text-muted-foreground">
                Tạo banner để hiển thị trên trang chủ
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

          {/* Data Table */}
          {!isLoading && !isError && banners && banners.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">STT</TableHead>
                  <TableHead>Tiêu Đề</TableHead>
                  <TableHead>Subtitle</TableHead>
                  <TableHead>CTA</TableHead>
                  <TableHead className="text-center">Thứ Tự</TableHead>
                  <TableHead className="text-center">Trạng Thái</TableHead>
                  <TableHead className="text-right">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((banner, index) => (
                  <TableRow key={banner.id}>
                    <TableCell className="text-center text-xs font-bold text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-foreground">
                      {banner.title}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                      {banner.subtitle ?? '—'}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {banner.ctaText ?? '—'}
                    </TableCell>
                    <TableCell className="text-center text-xs font-medium">
                      {banner.sortOrder ?? '—'}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          void handleToggle(banner.id);
                        }}
                        disabled={toggleMutation.isPending}
                        title="Bấm để bật/tắt hiển thị"
                      >
                        <Badge
                          variant={banner.isActive ? 'default' : 'secondary'}
                          className="cursor-pointer text-[10px]"
                        >
                          {banner.isActive ? 'Hiển thị' : 'Ẩn'}
                        </Badge>
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingBanner(banner);
                            setFormOpen(true);
                          }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="Chỉnh sửa Banner"
                        >
                          <Icon name="edit-3" size="xs" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => {
                            void handleDelete(banner.id, banner.title);
                          }}
                          disabled={deletingId === banner.id}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                          title="Xóa banner"
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

      {/* Banner Form Dialog */}
      <BannerFormDialog open={formOpen} onOpenChange={setFormOpen} bannerToEdit={editingBanner} />
    </div>
  );
}
