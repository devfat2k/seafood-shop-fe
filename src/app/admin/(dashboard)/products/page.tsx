'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { AdminProductsTable } from '@/components/admin/products/AdminProductsTable';
import { ProductComboDialog } from '@/components/admin/products/ProductComboDialog';
import { ProductFormDialog } from '@/components/admin/products/ProductFormDialog';
import { ProductImageDialog } from '@/components/admin/products/ProductImageDialog';
import { ProductStockDialog } from '@/components/admin/products/ProductStockDialog';
import { ConfirmDialog } from '@/components/common/ConfirmDialog';
import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useAdminProductsQuery,
  useDeleteProductMutation,
  useToggleFeaturedMutation,
} from '@/libs/queries/admin/products';
import type { Product } from '@/types/api';

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [stockOpen, setStockOpen] = useState(false);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);

  const [imageOpen, setImageOpen] = useState(false);
  const [imageProduct, setImageProduct] = useState<Product | null>(null);

  const [comboOpen, setComboOpen] = useState(false);
  const [comboProduct, setComboProduct] = useState<Product | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const { data, isLoading, isError, refetch } = useAdminProductsQuery({
    page,
    size: 10,
    search: search || undefined,
  });

  const deleteMutation = useDeleteProductMutation();
  const toggleFeaturedMutation = useToggleFeaturedMutation();

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
      toast.success('Đã xóa sản phẩm thành công');
      setDeleteTarget(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Xóa sản phẩm thất bại');
    }
  };

  const handleToggleFeatured = async (id: number) => {
    try {
      await toggleFeaturedMutation.mutateAsync(id);
      toast.success('Đã cập nhật trạng thái nổi bật');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Cập nhật thất bại');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-heading text-lg font-bold text-foreground">Danh sách sản phẩm</h2>
          <p className="text-xs text-muted-foreground">
            Quản lý toàn bộ sản phẩm hải sản trong cửa hàng
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => {
            setEditingProduct(null);
            setFormOpen(true);
          }}
          className="text-xs font-semibold"
        >
          <Icon name="plus" size="xs" className="mr-1.5" />
          Thêm sản phẩm
        </Button>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-bold">Sản phẩm</CardTitle>
            <div className="flex items-center gap-3">
              <Input
                placeholder="Tìm kiếm sản phẩm..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(0);
                }}
                className="h-8 w-64 text-xs"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {isLoading && (
            <div className="space-y-3">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-border/50 py-2">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
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
                Không thể tải danh sách sản phẩm
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
                <Icon name="fish" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Chưa có sản phẩm nào</p>
              <p className="mt-1 mb-3 text-xs text-muted-foreground">
                Thêm sản phẩm mới để bắt đầu kinh doanh
              </p>
              <Button
                size="sm"
                onClick={() => {
                  setEditingProduct(null);
                  setFormOpen(true);
                }}
              >
                + Thêm sản phẩm đầu tiên
              </Button>
            </div>
          )}

          {!isLoading && !isError && data?.content && data.content.length > 0 && (
            <AdminProductsTable
              products={data.content}
              page={page}
              totalPages={data.totalPages}
              totalElements={data.totalElements}
              isLastPage={data.last}
              onPageChange={setPage}
              onEdit={(p) => {
                setEditingProduct(p);
                setFormOpen(true);
              }}
              onAdjustStock={(p) => {
                setStockProduct(p);
                setStockOpen(true);
              }}
              onUploadImage={(p) => {
                setImageProduct(p);
                setImageOpen(true);
              }}
              onConfigureCombo={(p) => {
                setComboProduct(p);
                setComboOpen(true);
              }}
              onToggleFeatured={handleToggleFeatured}
              onDelete={(p) => {
                setDeleteTarget(p);
              }}
            />
          )}
        </CardContent>
      </Card>

      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        productToEdit={editingProduct}
      />

      <ProductStockDialog open={stockOpen} onOpenChange={setStockOpen} product={stockProduct} />

      <ProductImageDialog open={imageOpen} onOpenChange={setImageOpen} product={imageProduct} />

      <ProductComboDialog open={comboOpen} onOpenChange={setComboOpen} product={comboProduct} />

      <ConfirmDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Xóa sản phẩm"
        description={`Bạn có chắc chắn muốn xóa sản phẩm "${deleteTarget?.name ?? ''}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa sản phẩm"
        isLoading={deleteMutation.isPending}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
