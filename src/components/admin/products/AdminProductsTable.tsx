'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

type AdminProductsTableProps = {
  products: Product[];
  page: number;
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
  onEdit: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
  onUploadImage: (product: Product) => void;
  onConfigureCombo: (product: Product) => void;
  onToggleFeatured: (id: number) => void;
  onDelete: (product: Product) => void;
};

export const AdminProductsTable = ({
  products,
  page,
  totalPages,
  totalElements,
  isLastPage,
  onPageChange,
  onEdit,
  onAdjustStock,
  onUploadImage,
  onConfigureCombo,
  onToggleFeatured,
  onDelete,
}: AdminProductsTableProps) => {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  return (
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
          {products.map((product, index) => {
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
                        onUploadImage(product);
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
                          <span className="text-xs text-muted-foreground">
                            {product.categoryName}
                          </span>
                        )}
                        {product.productType === 'COMBO' && (
                          <Badge
                            variant="outline"
                            className="h-4 border-amber-500 px-1 py-0 text-xs text-amber-600"
                          >
                            COMBO
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right text-xs font-medium text-foreground">
                  {formatCurrency(product.price)}
                </TableCell>
                <TableCell className="text-center text-xs font-medium">
                  <button
                    type="button"
                    onClick={() => {
                      onAdjustStock(product);
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
                  <Badge variant={product.active ? 'default' : 'secondary'} className="text-xs">
                    {product.active ? 'Đang bán' : 'Ẩn'}
                  </Badge>
                </TableCell>
                <TableCell className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      onToggleFeatured(product.id);
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
                    <button
                      type="button"
                      onClick={() => {
                        onConfigureCombo(product);
                      }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-amber-600"
                      title="Cấu hình gói Combo Trang Chủ"
                    >
                      <Icon name="sparkles" size="xs" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onUploadImage(product);
                      }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      title="Upload ảnh"
                    >
                      <Icon name="camera" size="xs" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onEdit(product);
                      }}
                      className="inline-flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      title="Chỉnh sửa thông tin"
                    >
                      <Icon name="edit-3" size="xs" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onDelete(product);
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

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <span className="text-xs text-muted-foreground">
          Trang {page + 1} / {totalPages} · Tổng {totalElements} sản phẩm
        </span>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 0}
            onClick={() => {
              onPageChange(Math.max(0, page - 1));
            }}
          >
            Trước
          </Button>
          <Button
            size="sm"
            variant="outline"
            disabled={isLastPage}
            onClick={() => {
              onPageChange(page + 1);
            }}
          >
            Sau
          </Button>
        </div>
      </div>
    </>
  );
};
