export const SearchSkeleton = () => (
  <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
    {Array.from({ length: 8 }).map((_, idx) => (
      <div
        key={idx}
        className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-xs"
      >
        <div className="aspect-square w-full animate-pulse rounded-xl bg-muted" />
        <div className="mt-4 space-y-2">
          <div className="h-3 w-1/3 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-1/2 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-3">
          <div className="h-5 w-24 animate-pulse rounded-md bg-muted" />
          <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
        </div>
      </div>
    ))}
  </div>
);
