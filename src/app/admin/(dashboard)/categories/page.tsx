'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AdminCategoriesTable } from '@/components/admin/categories/AdminCategoriesTable';
import { CategoryFormDialog } from '@/components/admin/categories/CategoryFormDialog';
import { CategoryHomeConfigDialog } from '@/components/admin/categories/CategoryHomeConfigDialog';
import { CategoryImageDialog } from '@/components/admin/categories/CategoryImageDialog';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useAdminCategoriesQuery,
  useDeleteCategoryMutation,
} from '@/libs/queries/admin/categories';
import type { Category } from '@/types/api';

export default function AdminCategoriesPage() {
  const { data: categories, isLoading, isError, refetch } = useAdminCategoriesQuery();
  const deleteMutation = useDeleteCategoryMutation();

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [imageOpen, setImageOpen] = useState(false);
  const [imageCategory, setImageCategory] = useState<Category | null>(null);

  const [homeConfigOpen, setHomeConfigOpen] = useState(false);
  const [homeConfigCategory, setHomeConfigCategory] = useState<Category | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa danh mục thành công');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Xóa danh mục thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Quản lý danh mục</h2>
          <p className="text-xs text-muted-foreground">
            Tạo và quản lý các danh mục sản phẩm hải sản
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditingCategory(null);
            setFormOpen(true);
          }}
          className="text-xs font-semibold"
        >
          <Icon name="plus" size="xs" className="mr-1.5" />
          Thêm danh mục
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold">Danh mục sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border/50 py-2">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-40" />
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
                Không thể tải danh sách danh mục
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

          {!isLoading && !isError && (!categories || categories.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="list" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Chưa có danh mục nào</p>
              <p className="mt-1 mb-3 text-xs text-muted-foreground">
                Tạo danh mục để phân loại sản phẩm
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setEditingCategory(null);
                  setFormOpen(true);
                }}
              >
                + Thêm danh mục đầu tiên
              </Button>
            </div>
          )}

          {!isLoading && !isError && categories && categories.length > 0 && (
            <AdminCategoriesTable
              categories={categories}
              deletingId={deleteMutation.isPending && deleteTarget ? deleteTarget.id : null}
              onEdit={(cat) => {
                setEditingCategory(cat);
                setFormOpen(true);
              }}
              onUploadImage={(cat) => {
                setImageCategory(cat);
                setImageOpen(true);
              }}
              onConfigHome={(cat) => {
                setHomeConfigCategory(cat);
                setHomeConfigOpen(true);
              }}
              onDelete={(cat) => {
                setDeleteTarget(cat);
              }}
            />
          )}
        </CardContent>
      </Card>

      <CategoryFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        categoryToEdit={editingCategory}
      />

      <CategoryImageDialog open={imageOpen} onOpenChange={setImageOpen} category={imageCategory} />

      <CategoryHomeConfigDialog
        open={homeConfigOpen}
        onOpenChange={setHomeConfigOpen}
        category={homeConfigCategory}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Xóa danh mục"
        description={`Bạn có chắc chắn muốn xóa danh mục "${deleteTarget?.name ?? deleteTarget?.categoryName ?? ''}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa danh mục"
        isLoading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
