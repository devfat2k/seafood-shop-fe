'use client';

import { Icon } from '@/components/common/Icon';

type ProductCatalogEmptyProps = {
  onReset: () => void;
};

export function ProductCatalogEmpty({ onReset }: ProductCatalogEmptyProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/15 text-secondary">
        <Icon name="fish" size="xl" />
      </div>
      <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
        Không tìm thấy sản phẩm phù hợp
      </h3>
      <p className="mt-1 max-w-md text-xs text-muted-foreground">
        Hãy thử thay đổi tiêu chí lọc hoặc xóa bộ lọc để tìm kiếm các loại hải sản khác.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-opacity hover:opacity-90"
      >
        Xóa Tất Cả Bộ Lọc
      </button>
    </div>
  );
}
