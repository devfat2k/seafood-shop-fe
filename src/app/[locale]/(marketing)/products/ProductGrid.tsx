'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { getProducts } from '@/libs/api/products';

export default function ProductGrid() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    // oxlint-disable-next-line typescript/promise-function-async -- queryFn signature does not accept async
    queryFn: () => getProducts(),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-8 text-center text-red-500">Có lỗi xảy ra khi tải danh sách sản phẩm.</div>
    );
  }

  if (!data?.content || data.content.length === 0) {
    return <div className="py-8 text-center text-muted-foreground">Chưa có sản phẩm nào.</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.content.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardHeader className="p-4">
            <CardTitle className="text-lg font-bold">{product.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-base font-semibold text-emerald-600">
              {product.price.toLocaleString('vi-VN')}₫
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
