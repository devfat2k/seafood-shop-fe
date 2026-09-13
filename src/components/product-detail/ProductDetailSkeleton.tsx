'use client';

export function ProductDetailSkeleton() {
  return (
    <div
      className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6"
      aria-busy="true"
      aria-label="Đang tải chi tiết sản phẩm"
    >
      <div className="mb-6 flex h-5 w-64 animate-pulse rounded bg-muted" />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-4 lg:col-span-6">
          <div className="aspect-4/3 w-full animate-pulse rounded-2xl bg-muted sm:aspect-4/5 lg:aspect-4/5 lg:min-h-[680px]" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 w-20 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>

        <div className="space-y-4 lg:col-span-6">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-8 w-3/4 animate-pulse rounded-lg bg-muted" />
          <div className="h-5 w-40 animate-pulse rounded bg-muted" />
          <div className="h-10 w-48 animate-pulse rounded-xl bg-muted" />
          <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />
          <div className="flex gap-4">
            <div className="h-12 flex-1 animate-pulse rounded-xl bg-muted" />
            <div className="h-12 flex-1 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </div>

      <div className="mt-12 h-64 w-full animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}
