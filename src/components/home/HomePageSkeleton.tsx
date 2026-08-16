'use client';

export function HomePageSkeleton() {
  return (
    <div
      className="flex min-h-screen flex-col bg-background"
      aria-busy="true"
      aria-label="Đang tải trang chủ"
    >
      {/* 1. Hero Skeleton */}
      <div className="relative h-[480px] w-full animate-pulse bg-muted sm:h-[560px] lg:h-[620px]">
        <div className="mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6">
          <div className="h-6 w-36 rounded-full bg-muted-foreground/20" />
          <div className="mt-4 h-12 w-3/4 max-w-lg rounded-xl bg-muted-foreground/20 sm:h-16" />
          <div className="mt-4 h-16 w-full max-w-md rounded-lg bg-muted-foreground/15" />
          <div className="mt-6 flex gap-3">
            <div className="h-12 w-36 rounded-xl bg-muted-foreground/25" />
            <div className="h-12 w-32 rounded-xl bg-muted-foreground/15" />
          </div>
        </div>
      </div>

      {/* 2. Bento Categories Skeleton */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-col items-center gap-2">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-8 w-64 animate-pulse rounded-lg bg-muted" />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6">
          <div className="h-[280px] animate-pulse rounded-xl bg-muted sm:col-span-2 sm:h-[360px]" />
          <div className="h-[170px] animate-pulse rounded-xl bg-muted" />
          <div className="h-[170px] animate-pulse rounded-xl bg-muted" />
        </div>
      </div>

      {/* 3. Daily Arrivals Skeleton */}
      <div className="w-full bg-card py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-6 flex justify-between">
            <div className="space-y-2">
              <div className="h-4 w-24 animate-pulse rounded bg-muted" />
              <div className="h-7 w-48 animate-pulse rounded bg-muted" />
            </div>
            <div className="h-6 w-20 animate-pulse rounded bg-muted" />
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="space-y-3 rounded-xl border border-border bg-background p-4"
              >
                <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Featured Products Skeleton */}
      <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
        <div className="mb-6 space-y-2">
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
          <div className="h-8 w-56 animate-pulse rounded bg-muted" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="space-y-3 rounded-xl border border-border bg-card p-4">
              <div className="aspect-square w-full animate-pulse rounded-lg bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
              <div className="h-5 w-1/3 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
