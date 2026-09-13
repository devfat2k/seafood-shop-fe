import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminSystemLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Đang tải trạng thái hệ thống">
      <div className="space-y-1.5">
        <Skeleton className="h-7 w-64 rounded-xl" />
        <Skeleton className="h-4 w-96 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="border-border lg:col-span-2">
          <CardHeader className="flex flex-col gap-2 pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-3.5 w-72" />
            </div>
            <Skeleton className="h-9 w-44 rounded-xl" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-14 w-full rounded-xl" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Skeleton className="h-20 rounded-xl" />
              <Skeleton className="h-20 rounded-xl" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardHeader className="pb-3">
            <Skeleton className="h-5 w-36" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b border-border/50 py-2.5"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-20 rounded-full" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
