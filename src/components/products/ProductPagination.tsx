'use client';

import { Icon } from '@/components/common/Icon';

type ProductPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function ProductPagination(props: ProductPaginationProps) {
  const { currentPage, totalPages, onPageChange } = props;

  if (totalPages <= 1) {
    return null;
  }

  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const getPageNumbers = (): (number | string)[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (safeCurrentPage <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }

    if (safeCurrentPage >= totalPages - 2) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }

    return [1, '...', safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, '...', totalPages];
  };

  const pages = getPageNumbers();

  return (
    <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-6">
      {/* Nút Trang Trước */}
      <button
        type="button"
        disabled={safeCurrentPage <= 1}
        onClick={() => {
          if (safeCurrentPage > 1) {
            onPageChange(safeCurrentPage - 1);
          }
        }}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-xs transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
      >
        <Icon name="chevron-left" size="xs" />
        <span>Trang trước</span>
      </button>

      {/* Danh sách số trang */}
      <div className="flex items-center gap-1.5">
        {pages.map((page, idx) => {
          if (typeof page === 'string') {
            return (
              <span key={`dots-${idx}`} className="px-1 text-xs font-bold text-muted-foreground">
                ...
              </span>
            );
          }

          const isActive = page === safeCurrentPage;
          return (
            <button
              key={page}
              type="button"
              onClick={() => {
                onPageChange(page);
              }}
              aria-label={`Trang ${page}`}
              className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? 'bg-secondary text-secondary-foreground shadow-xs'
                  : 'border border-border bg-card text-foreground hover:bg-muted'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Nút Trang Sau */}
      <button
        type="button"
        disabled={safeCurrentPage >= totalPages}
        onClick={() => {
          if (safeCurrentPage < totalPages) {
            onPageChange(safeCurrentPage + 1);
          }
        }}
        className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-card px-4 py-2 text-xs font-bold text-foreground shadow-xs transition-all hover:bg-muted disabled:cursor-not-allowed disabled:opacity-40"
      >
        <span>Trang sau</span>
        <Icon name="chevron-right" size="xs" />
      </button>
    </div>
  );
}
