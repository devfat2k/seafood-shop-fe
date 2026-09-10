'use client';

import { Icon } from '@/components/common/Icon';
import { Button } from '@/components/ui/button';

type ProductTablePaginationProps = {
  page: number;
  totalPages: number;
  totalElements: number;
  isLastPage: boolean;
  onPageChange: (page: number) => void;
};

export const ProductTablePagination = ({
  page,
  totalPages,
  totalElements,
  isLastPage,
  onPageChange,
}: ProductTablePaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  const pages: (number | string)[] = [];
  if (totalPages <= 5) {
    for (let i = 0; i < totalPages; i += 1) {
      pages.push(i);
    }
  } else if (page <= 2) {
    pages.push(0, 1, 2, 3, 'dots-end', totalPages - 1);
  } else if (page >= totalPages - 3) {
    pages.push(0, 'dots-start', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
  } else {
    pages.push(0, 'dots-start', page - 1, page, page + 1, 'dots-end', totalPages - 1);
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
      <span className="text-xs text-muted-foreground">
        Hiển thị {page * 10 + 1} - {Math.min((page + 1) * 10, totalElements)} trong tổng số{' '}
        <strong className="font-semibold text-foreground">{totalElements}</strong> sản phẩm (Trang{' '}
        {page + 1}/{totalPages})
      </span>

      <div className="flex flex-wrap items-center gap-1.5">
        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2.5 text-xs"
          disabled={page === 0}
          onClick={() => {
            onPageChange(0);
          }}
          title="Về trang đầu"
        >
          <Icon name="chevrons-left" size="xs" className="mr-1" />
          <span>Đầu</span>
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2 text-xs"
          disabled={page === 0}
          onClick={() => {
            onPageChange(Math.max(0, page - 1));
          }}
          title="Trang trước"
        >
          <Icon name="chevron-left" size="xs" />
        </Button>

        {pages.map((p, idx) => {
          if (typeof p === 'string') {
            return (
              <span
                key={`dots-${idx}`}
                className="px-1 text-xs font-semibold text-muted-foreground"
              >
                ...
              </span>
            );
          }

          const isActive = p === page;
          return (
            <Button
              key={p}
              size="sm"
              variant={isActive ? 'default' : 'outline'}
              className={`h-8 w-8 p-0 text-xs font-bold ${isActive ? 'shadow-xs' : 'hover:bg-muted'}`}
              onClick={() => {
                onPageChange(p);
              }}
            >
              {p + 1}
            </Button>
          );
        })}

        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2 text-xs"
          disabled={isLastPage || page >= totalPages - 1}
          onClick={() => {
            onPageChange(page + 1);
          }}
          title="Trang sau"
        >
          <Icon name="chevron-right" size="xs" />
        </Button>

        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2.5 text-xs"
          disabled={isLastPage || page >= totalPages - 1}
          onClick={() => {
            onPageChange(totalPages - 1);
          }}
          title="Đến trang cuối"
        >
          <span>Cuối</span>
          <Icon name="chevrons-right" size="xs" className="ml-1" />
        </Button>
      </div>
    </div>
  );
};
