import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

type AdminTableSkeletonProps = {
  title?: string;
  hasToolbar?: boolean;
  rows?: number;
};

export function AdminTableSkeleton({
  title = 'Quản lý dữ liệu',
  hasToolbar = true,
  rows = 8,
}: AdminTableSkeletonProps) {
  return (
    <div className="space-y-6" aria-busy="true" aria-label={`Đang tải ${title}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-7 w-48 rounded-xl" />
          <Skeleton className="h-3.5 w-72 rounded-md" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>

      {hasToolbar && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-full rounded-xl sm:w-72" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>
        </div>
      )}

      <Card className="border-border">
        <CardHeader className="border-b border-border/60 pb-3">
          <div className="flex items-center justify-between">
            <Skeleton className="h-5 w-36" />
            <Skeleton className="h-4 w-20" />
          </div>
        </CardHeader>
        <CardContent className="divide-y divide-border/50 p-0">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-3.5">
              <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
              <div className="flex-1 space-y-1.5">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/5" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-6 w-16" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-lg" />
                <Skeleton className="h-8 w-8 rounded-lg" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
