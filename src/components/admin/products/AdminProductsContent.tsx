'use client';

import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import type { PageResponse, Product } from '@/types/api';
import { AdminProductsTable } from './AdminProductsTable';

type AdminProductsContentProps = {
  isLoading: boolean;
  isError: boolean;
  data?: PageResponse<Product>;
  page: number;
  debouncedSearch: string;
  onPageChange: (page: number) => void;
  onClearSearch: () => void;
  onRefetch: () => void;
  onAddNew: () => void;
  onViewDetail: (product: Product) => void;
  onEdit: (product: Product) => void;
  onAdjustStock: (product: Product) => void;
  onUploadImage: (product: Product) => void;
  onConfigureCombo: (product: Product) => void;
  onToggleFeatured: (id: number) => void;
  onDelete: (product: Product) => void;
};

export function AdminProductsContent({
  isLoading,
  isError,
  data,
  page,
  debouncedSearch,
  onPageChange,
  onClearSearch,
  onRefetch,
  onAddNew,
  onViewDetail,
  onEdit,
  onAdjustStock,
  onUploadImage,
  onConfigureCombo,
  onToggleFeatured,
  onDelete,
}: AdminProductsContentProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-border/60 p-3.5">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-28" />
            </div>
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-6 w-16 rounded-lg" />
            <Skeleton className="h-8 w-28 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
          <Icon name="x" size="md" />
        </div>
        <p className="text-sm font-bold text-foreground">Không thể tải danh sách sản phẩm</p>
        <p className="mt-1 mb-4 text-xs text-muted-foreground">
          Vui lòng kiểm tra kết nối mạng và thử tải lại
        </p>
        <Button size="sm" variant="outline" onClick={onRefetch}>
          Thử lại
        </Button>
      </div>
    );
  }

  if (!data?.content || data.content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <Icon name={debouncedSearch ? 'search' : 'fish'} size="lg" />
        </div>
        <p className="text-sm font-bold text-foreground">
          {debouncedSearch
            ? `Không tìm thấy sản phẩm khớp với "${debouncedSearch}"`
            : 'Chưa có sản phẩm nào trong kho'}
        </p>
        <p className="mt-1 mb-4 text-xs text-muted-foreground">
          {debouncedSearch
            ? 'Vui lòng thử lại với từ khóa khác hoặc xóa bộ lọc tìm kiếm'
            : 'Bắt đầu thêm sản phẩm đầu tiên để mở bán'}
        </p>
        {debouncedSearch ? (
          <Button size="sm" variant="outline" onClick={onClearSearch}>
            Xóa bộ lọc tìm kiếm
          </Button>
        ) : (
          <Button size="sm" onClick={onAddNew}>
            <Icon name="plus" size="xs" className="mr-1.5" />
            Thêm sản phẩm đầu tiên
          </Button>
        )}
      </div>
    );
  }

  return (
    <AdminProductsTable
      products={data.content}
      page={page}
      totalPages={data.totalPages}
      totalElements={data.totalElements}
      isLastPage={data.last}
      onPageChange={onPageChange}
      onViewDetail={onViewDetail}
      onEdit={onEdit}
      onAdjustStock={onAdjustStock}
      onUploadImage={onUploadImage}
      onConfigureCombo={onConfigureCombo}
      onToggleFeatured={onToggleFeatured}
      onDelete={onDelete}
    />
  );
}
