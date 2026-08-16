'use client';

export function ProductCatalogSkeleton() {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
      aria-busy="true"
      aria-label="Đang tải danh sách hải sản"
    >
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-3.5 shadow-xs sm:p-4"
        >
          <div>
            <div className="aspect-square w-full animate-pulse rounded-xl bg-muted" />
            <div className="mt-3 space-y-2">
              <div className="flex justify-between">
                <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-3">
            <div className="h-5 w-24 animate-pulse rounded bg-muted" />
            <div className="h-9 w-9 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
