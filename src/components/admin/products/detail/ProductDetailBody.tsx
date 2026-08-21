'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
import type { Product } from '@/types/api';
import { formatCurrency } from '@/utils/Helpers';

type ProductDetailBodyProps = {
  product: Product;
};

const getStockColor = (stock: number) => {
  if (stock <= 0) {
    return 'text-destructive';
  }
  if (stock < 10) {
    return 'text-amber-500';
  }
  return 'text-foreground';
};

export const ProductDetailBody = ({ product }: ProductDetailBodyProps) => {
  const [imgErr, setImgErr] = useState(false);

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;

  return (
    <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-12">
      <div className="space-y-4 md:col-span-5">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-2xs">
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
            <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-muted-foreground">
              <Icon name="camera" size="lg" />
              <span className="text-xs font-medium">Chưa có ảnh sản phẩm</span>
            </div>
          )}
        </div>

        <div className="space-y-3 rounded-2xl border border-border/80 bg-muted/30 p-4">
          <div>
            <span className="text-xs font-semibold text-muted-foreground">Giá bán niêm yết</span>
            <div className="mt-0.5 flex items-baseline gap-2">
              <span className="font-heading text-2xl font-bold text-primary">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
            {discountPercent && (
              <span className="mt-1 inline-block rounded-md bg-destructive/10 px-2 py-0.5 text-xs font-bold text-destructive">
                Tiết kiệm {discountPercent}% so với giá gốc
              </span>
            )}
          </div>

          <div className="border-t border-border/80 pt-3">
            <span className="text-xs font-semibold text-muted-foreground">Tồn kho hiện có</span>
            <div className="mt-0.5 flex items-center gap-2">
              <span
                className={`font-heading text-2xl font-bold ${getStockColor(product.stock ?? 0)}`}
              >
                {product.stock}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {product.unit ?? 'đơn vị'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:col-span-7">
        <div>
          <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Thông số & Quy cách
          </h4>
          <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
            <div className="rounded-xl border border-border bg-card p-3">
              <span className="text-muted-foreground">Đơn vị tính</span>
              <p className="mt-1 font-semibold text-foreground">{product.unit ?? 'Chưa rõ'}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <span className="text-muted-foreground">Quy cách size</span>
              <p className="mt-1 font-semibold text-foreground">{product.spec ?? 'Chưa rõ'}</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-3">
              <span className="text-muted-foreground">Xuất xứ</span>
              <p className="mt-1 font-semibold text-foreground">{product.origin ?? 'Chưa rõ'}</p>
            </div>
          </div>
        </div>

        {product.weightOptions && product.weightOptions.length > 0 && (
          <div>
            <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Tùy chọn trọng lượng
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.weightOptions.map((opt, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center rounded-lg border border-border bg-card px-2.5 py-1 text-xs font-semibold text-foreground shadow-2xs"
                >
                  {typeof opt === 'string' ? opt : (opt.label ?? opt.value)}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
            Mô tả chi tiết sản phẩm
          </h4>
          <div className="mt-2 max-h-48 overflow-y-auto rounded-xl border border-border bg-card p-3.5 text-xs leading-relaxed text-muted-foreground">
            {product.description ?? 'Chưa có mô tả chi tiết cho sản phẩm này.'}
          </div>
        </div>
      </div>
    </div>
  );
};
