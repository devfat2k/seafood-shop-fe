'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

type ProductTableRowProps = {
  product: Product;
  index: number;
  page: number;
  onViewDetail: (product: Product) => void;
  onEdit: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
  onUploadImage: (product: Product) => void;
  onConfigureCombo: (product: Product) => void;
  onToggleFeatured: (id: number) => void;
  onDelete: (product: Product) => void;
};

const getStockTextColor = (stock: number) => {
  if (stock <= 0) {
    return 'font-bold text-destructive';
  }
  if (stock < 10) {
    return 'font-bold text-amber-500';
  }
  return 'text-foreground';
};

export const ProductTableRow = ({
  product,
  index,
  page,
  onViewDetail,
  onEdit,
  onAdjustStock,
  onUploadImage,
  onConfigureCombo,
  onToggleFeatured,
  onDelete,
}: ProductTableRowProps) => {
  const [imgErr, setImgErr] = useState(false);

  return (
    <TableRow className="group transition-colors hover:bg-muted/40">
      <TableCell className="text-center font-mono text-xs font-semibold text-muted-foreground">
        {page * 10 + index + 1}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => {
              onViewDetail(product);
            }}
            className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-border bg-muted shadow-2xs transition-transform group-hover:scale-105"
            title="Nhấn để xem chi tiết sản phẩm"
          >
            {product.imageUrl && !imgErr ? (
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                unoptimized
                onError={() => {
                  setImgErr(true);
                }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                <Icon name="camera" size="xs" />
              </div>
            )}
          </button>
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => {
                onViewDetail(product);
              }}
              className="line-clamp-1 text-left text-sm font-semibold text-foreground transition-colors hover:text-primary"
            >
              {product.name}
            </button>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {product.categoryName ?? 'Chưa phân loại'}
              </span>
              {product.productType === 'COMBO' && (
                <Badge
                  variant="outline"
                  className="border-amber-500 px-1.5 py-0 text-[11px] font-bold text-amber-600"
                >
                  COMBO
                </Badge>
              )}
              {product.unit && (
                <span className="text-[11px] text-muted-foreground/80">({product.unit})</span>
              )}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div className="flex flex-col items-end">
          <span className="text-sm font-bold text-foreground">{formatCurrency(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.originalPrice)}
            </span>
          )}
        </div>
      </TableCell>
      <TableCell className="text-center">
        <button
          type="button"
          onClick={() => {
            onAdjustStock(product);
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-background px-2.5 py-1 text-xs font-semibold shadow-2xs transition-colors hover:bg-muted"
          title="Bấm để điều chỉnh tồn kho"
        >
          <span className={getStockTextColor(product.stock ?? 0)}>{product.stock}</span>
          <Icon name="package" size="xs" className="text-muted-foreground" />
        </button>
      </TableCell>
      <TableCell className="text-center">
        <Badge variant={product.active ? 'default' : 'secondary'} className="text-xs">
          {product.active ? 'Đang bán' : 'Đã ẩn'}
        </Badge>
      </TableCell>
      <TableCell className="text-center">
        <button
          type="button"
          onClick={() => {
            onToggleFeatured(product.id);
          }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted"
          title={product.featured ? 'Bỏ ghim' : 'Ghim nổi bật'}
        >
          <Icon
            name="star"
            size="sm"
            className={
              product.featured ? 'fill-amber-500 text-amber-500' : 'text-muted-foreground/30'
            }
          />
        </button>
      </TableCell>
      <TableCell className="text-right">
        <div className="inline-flex items-center gap-1.5">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              onViewDetail(product);
            }}
            className="h-8 px-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground"
            title="Xem chi tiết"
          >
            <Icon name="eye" size="xs" className="mr-1" />
            <span>Xem</span>
          </Button>

          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onEdit(product);
            }}
            className="h-8 px-2.5 text-xs font-semibold"
            title="Chỉnh sửa"
          >
            <Icon name="edit-3" size="xs" className="mr-1" />
            <span>Sửa</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted">
              <Icon name="more-horizontal" size="sm" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem
                onClick={() => {
                  onUploadImage(product);
                }}
                className="cursor-pointer gap-2 text-xs"
              >
                <Icon name="camera" size="xs" />
                <span>Upload hình ảnh</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onAdjustStock(product);
                }}
                className="cursor-pointer gap-2 text-xs"
              >
                <Icon name="package" size="xs" />
                <span>Điều chỉnh tồn kho</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  onConfigureCombo(product);
                }}
                className="cursor-pointer gap-2 text-xs text-amber-600"
              >
                <Icon name="sparkles" size="xs" />
                <span>Cấu hình gói Combo</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  onDelete(product);
                }}
                className="cursor-pointer gap-2 text-xs text-destructive focus:bg-destructive/10 focus:text-destructive"
              >
                <Icon name="trash-2" size="xs" />
                <span>Xóa sản phẩm</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </TableCell>
    </TableRow>
  );
};
