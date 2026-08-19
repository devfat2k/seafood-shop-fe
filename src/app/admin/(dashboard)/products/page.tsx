'use client';

import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { ProductComboDialog } from '@/components/admin/products/ProductComboDialog';
import { ProductFormDialog } from '@/components/admin/products/ProductFormDialog';
import { ProductImageDialog } from '@/components/admin/products/ProductImageDialog';
import { ProductStockDialog } from '@/components/admin/products/ProductStockDialog';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
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
  useAdminProductsQuery,
  useDeleteProductMutation,
  useToggleFeaturedMutation,
} from '@/libs/queries/admin/products';
import type { Product } from '@/types/api';

export default function AdminProductsPage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  // Dialog states
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [stockOpen, setStockOpen] = useState(false);
  const [stockProduct, setStockProduct] = useState<Product | null>(null);

  const [imageOpen, setImageOpen] = useState(false);
  const [imageProduct, setImageProduct] = useState<Product | null>(null);

  const [comboOpen, setComboOpen] = useState(false);
  const [comboProduct, setComboProduct] = useState<Product | null>(null);

  const { data, isLoading, isError, refetch } = useAdminProductsQuery({
    page,
    size: 10,
    search: search || undefined,
  });

  const deleteMutation = useDeleteProductMutation();
  const toggleFeaturedMutation = useToggleFeaturedMutation();
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleDelete = async (id: number, name: string) => {
    // eslint-disable-next-line no-alert -- simple admin confirmation dialog
    if (!window.confirm(`Bạn có chắc muốn xóa sản phẩm "${name}"?`)) {
      return;
    }
    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Đã xóa sản phẩm thành công');
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
          {/* Loading */}
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

          {/* Error */}
          {isError && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                <Icon name="x" size="sm" />
              </div>
              <p className="text-xs font-semibold text-foreground">
                Không thể tải danh sách sản phẩm
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
                <Icon name="fish" size="md" />
              </div>
              <p className="text-xs font-semibold text-foreground">Chưa có sản phẩm nào</p>
              <p className="mt-1 mb-3 text-[11px] text-muted-foreground">
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

          {/* Data Table */}
          {!isLoading && !isError && data?.content && data.content.length > 0 && (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10 text-center">#</TableHead>
                    <TableHead>Sản Phẩm</TableHead>
                    <TableHead className="text-right">Giá Bán</TableHead>
                    <TableHead className="text-center">Tồn Kho</TableHead>
                    <TableHead className="text-center">Trạng Thái</TableHead>
                    <TableHead className="text-center">Nổi Bật</TableHead>
                    <TableHead className="text-right">Thao Tác</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.content.map((product, index) => {
                    const imgErr = imageErrors[product.id];
                    return (
                      <TableRow key={product.id}>
                        <TableCell className="text-center text-xs font-bold text-muted-foreground">
                          {page * 10 + index + 1}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => {
                                setImageProduct(product);
                                setImageOpen(true);
                              }}
                              className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted transition-transform hover:scale-105"
                              title="Nhấn để đổi ảnh sản phẩm"
                            >
                              {product.imageUrl && !imgErr ? (
                                <Image
                                  src={product.imageUrl}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  unoptimized
                                  onError={() => {
                                    setImageErrors((prev) => ({ ...prev, [product.id]: true }));
                                  }}
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                                  <Icon name="camera" size="xs" />
                                </div>
                              )}
                            </button>
                            <div>
                              <span className="line-clamp-1 text-xs font-semibold text-foreground">
                                {product.name}
                              </span>
                              <div className="mt-0.5 flex items-center gap-1.5">
                                {product.categoryName && (
                                  <span className="text-[10px] text-muted-foreground">
                                    {product.categoryName}
                                  </span>
                                )}
                                {product.productType === 'COMBO' && (
                                  <Badge
                                    variant="outline"
                                    className="h-4 border-amber-500 px-1 py-0 text-[9px] text-amber-600"
                                  >
                                    COMBO
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-right text-xs font-medium text-foreground">
                          {product.price.toLocaleString('vi-VN')}₫
                        </TableCell>
                        <TableCell className="text-center text-xs font-medium">
                          <button
                            type="button"
                            onClick={() => {
                              setStockProduct(product);
                              setStockOpen(true);
                            }}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 transition-colors hover:bg-muted"
                            title="Bấm để điều chỉnh tồn kho (+/-)"
                          >
                            <span
                              className={
                                product.stock <= 0
                                  ? 'font-bold text-destructive'
                                  : 'font-semibold text-foreground'
                              }
                            >
                              {product.stock}
                            </span>
                            <Icon name="package" size="xs" className="text-muted-foreground" />
                          </button>
                        </TableCell>
                        <TableCell className="text-center">
                          <Badge
                            variant={product.active ? 'default' : 'secondary'}
                            className="text-[10px]"
                          >
                            {product.active ? 'Đang bán' : 'Ẩn'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                          <button
                            type="button"
                            onClick={() => {
                              void handleToggleFeatured(product.id);
                            }}
                            className="inline-flex items-center justify-center"
                            title={product.featured ? 'Bỏ ghim' : 'Ghim nổi bật'}
                          >
                            <Icon
                              name="star"
                              size="xs"
                              className={
                                product.featured
                                  ? 'fill-amber-500 text-amber-500'
                                  : 'text-muted-foreground/40'
                              }
                            />
                          </button>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="inline-flex items-center gap-1">
                            {/* Combo config button */}
                            <button
                              type="button"
                              onClick={() => {
                                setComboProduct(product);
                                setComboOpen(true);
                              }}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-amber-600"
                              title="Cấu hình gói Combo Trang Chủ"
                            >
                              <Icon name="sparkles" size="xs" />
                            </button>

                            {/* Image upload button */}
                            <button
                              type="button"
                              onClick={() => {
                                setImageProduct(product);
                                setImageOpen(true);
                              }}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              title="Upload ảnh"
                            >
                              <Icon name="camera" size="xs" />
                            </button>

                            {/* Edit button */}
                            <button
                              type="button"
                              onClick={() => {
                                setEditingProduct(product);
                                setFormOpen(true);
                              }}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                              title="Chỉnh sửa thông tin"
                            >
                              <Icon name="edit-3" size="xs" />
                            </button>

                            {/* Delete button */}
                            <button
                              type="button"
                              onClick={() => {
                                void handleDelete(product.id, product.name);
                              }}
                              className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                              title="Xóa sản phẩm"
                            >
                              <Icon name="trash-2" size="xs" />
                            </button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                <span className="text-xs text-muted-foreground">
                  Trang {page + 1} / {data.totalPages} · Tổng {data.totalElements} sản phẩm
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

      {/* Dialogs */}
      <ProductFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        productToEdit={editingProduct}
      />

      <ProductStockDialog open={stockOpen} onOpenChange={setStockOpen} product={stockProduct} />

      <ProductImageDialog open={imageOpen} onOpenChange={setImageOpen} product={imageProduct} />

      <ProductComboDialog open={comboOpen} onOpenChange={setComboOpen} product={comboProduct} />
    </div>
  );
}
