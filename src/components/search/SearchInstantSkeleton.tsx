import { Skeleton } from '@/components/ui/skeleton';

export function SearchInstantSkeleton() {
  return (
    <div
      className="divide-y divide-border/60 p-2"
      aria-busy="true"
      aria-label="Đang tìm kiếm sản phẩm"
    >
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 p-2">
          <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
          <div className="flex-1 space-y-1.5">
            <Skeleton className="h-3.5 w-3/4" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-12" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
