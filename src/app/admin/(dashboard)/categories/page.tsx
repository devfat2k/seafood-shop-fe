'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { CategoryFormDialog } from '@/components/admin/categories/CategoryFormDialog';
import { CategoryHomeConfigDialog } from '@/components/admin/categories/CategoryHomeConfigDialog';
import { CategoryImageDialog } from '@/components/admin/categories/CategoryImageDialog';
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
  useAdminCategoriesQuery,
  useDeleteCategoryMutation,
} from '@/libs/queries/admin/categories';
import type { Category } from '@/types/api';

export default function AdminCategoriesPage() {
  const { data: categories, isLoading, isError, refetch } = useAdminCategoriesQuery();
  const deleteMutation = useDeleteCategoryMutation();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const [imageOpen, setImageOpen] = useState(false);
  const [imageCategory, setImageCategory] = useState<Category | null>(null);

  const [homeConfigOpen, setHomeConfigOpen] = useState(false);
  const [homeConfigCategory, setHomeConfigCategory] = useState<Category | null>(null);

  const handleDelete = async (id: number, name: string) => {
    // eslint-disable-next-line no-alert -- simple admin confirmation dialog
    if (!window.confirm(`Bạn có chắc muốn xóa danh mục "${name}"?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Đã xóa danh mục thành công');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Xóa danh mục thất bại');
    } finally {
      setDeletingId(null);
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
          {/* Loading */}
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

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Không thể tải danh sách danh mục
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
          {!isLoading && !isError && (!categories || categories.length === 0) && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <Icon name="list" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Chưa có danh mục nào</p>
              <p className="mt-1 mb-3 text-[11px] text-muted-foreground">
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

          {/* Data Table */}
          {!isLoading && !isError && categories && categories.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12 text-center">#</TableHead>
                  <TableHead>Tên Danh Mục</TableHead>
                  <TableHead>Mô Tả</TableHead>
                  <TableHead className="text-center">Ảnh</TableHead>
                  <TableHead className="text-center">Hiển Thị Home</TableHead>
                  <TableHead className="text-right">Thao Tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat, index) => (
                  <TableRow key={cat.id}>
                    <TableCell className="text-center text-xs font-bold text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell className="text-xs font-semibold text-foreground">
                      {cat.name ?? cat.categoryName ?? '—'}
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate text-xs text-muted-foreground">
                      {cat.description ?? '—'}
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setImageCategory(cat);
                          setImageOpen(true);
                        }}
                        className="inline-flex items-center gap-1"
                        title="Bấm để upload ảnh danh mục"
                      >
                        {cat.imageUrl ? (
                          <Badge variant="default" className="cursor-pointer text-[10px]">
                            Đã có ảnh
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="cursor-pointer text-[10px]">
                            + Thêm ảnh
                          </Badge>
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        type="button"
                        onClick={() => {
                          setHomeConfigCategory(cat);
                          setHomeConfigOpen(true);
                        }}
                        title="Cấu hình hiển thị Bento Grid trên trang chủ"
                      >
                        {cat.homeDisplayStyle ? (
                          <Badge
                            variant="outline"
                            className="cursor-pointer border-primary text-[10px] text-primary"
                          >
                            Bento: {cat.homeDisplayStyle}
                          </Badge>
                        ) : (
                          <span className="cursor-pointer text-[10px] text-muted-foreground hover:underline">
                            + Cấu hình
                          </span>
                        )}
                      </button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex items-center gap-1">
                        {/* Bento Config */}
                        <button
                          type="button"
                          onClick={() => {
                            setHomeConfigCategory(cat);
                            setHomeConfigOpen(true);
                          }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-primary"
                          title="Cấu hình Bento Grid"
                        >
                          <Icon name="sparkles" size="xs" />
                        </button>

                        {/* Image upload */}
                        <button
                          type="button"
                          onClick={() => {
                            setImageCategory(cat);
                            setImageOpen(true);
                          }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="Upload ảnh danh mục"
                        >
                          <Icon name="camera" size="xs" />
                        </button>

                        {/* Edit */}
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCategory(cat);
                            setFormOpen(true);
                          }}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                          title="Chỉnh sửa danh mục"
                        >
                          <Icon name="edit-3" size="xs" />
                        </button>

                        {/* Delete */}
                        <button
                          type="button"
                          onClick={() => {
                            void handleDelete(cat.id, cat.name ?? '');
                          }}
                          disabled={deletingId === cat.id}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-50"
                          title="Xóa danh mục"
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

      {/* Dialogs */}
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
    </div>
  );
}
