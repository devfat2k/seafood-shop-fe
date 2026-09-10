'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Icon } from '@/components/common/Icon';
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
import { useTopBuyProductsQuery } from '@/libs/queries/admin/dashboard';
import { formatCurrency } from '@/utils/Helpers';

export function TopBuyProductsTable() {
  const { data: products, isLoading, isError, refetch } = useTopBuyProductsQuery(6);
  const [imageErrors, setImageErrors] = useState<Record<string | number, boolean>>({});

  return (
    <Card className="border-border">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-sm font-bold sm:text-base">
            Top Sản Phẩm Bán Chạy Nhất
          </CardTitle>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Xếp hạng theo sản lượng đã bán ra từ các đơn hoàn tất
          </p>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading && (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 border-b border-border/50 py-2"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-1.5">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <Icon name="x" size="sm" />
            </div>
            <p className="text-xs font-semibold text-foreground">
              Không thể tải danh sách sản phẩm bán chạy
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

        {!isLoading && !isError && (!products || products.length === 0) && (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
              <Icon name="fish" size="md" />
            </div>
            <p className="text-xs font-semibold text-foreground">
              Chưa có số liệu sản phẩm bán chạy
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Dữ liệu sẽ hiển thị khi có đơn hàng được hoàn tất
            </p>
          </div>
        )}

        {!isLoading && !isError && products && products.length > 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12 text-center">#</TableHead>
                <TableHead>Sản Phẩm</TableHead>
                <TableHead className="text-right">Đơn Giá</TableHead>
                <TableHead className="text-right">Đã Bán</TableHead>
                <TableHead className="text-right">Tồn Kho</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((item, index) => {
                const itemKey = item.id ?? item.productId ?? `top-product-${index}`;
                const isImgError = imageErrors[itemKey];
                return (
                  <TableRow key={itemKey}>
                    <TableCell className="text-center text-xs font-bold text-muted-foreground">
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-muted">
                          {item.imageUrl && !isImgError ? (
                            <Image
                              src={item.imageUrl}
                              alt={item.name}
                              fill
                              className="object-cover"
                              unoptimized
                              onError={() => {
                                setImageErrors((prev) => ({ ...prev, [itemKey]: true }));
                              }}
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                              <Icon name="fish" size="xs" />
                            </div>
                          )}
                        </div>
                        <span className="line-clamp-1 max-w-[200px] text-xs font-semibold text-foreground">
                          {item.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right text-xs font-medium text-foreground">
                      {formatCurrency(item.price)}
                    </TableCell>
                    <TableCell className="text-right text-xs font-bold text-primary">
                      {item.totalSold ?? 0}
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {item.stock ?? '—'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
