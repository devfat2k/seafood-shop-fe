import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Đang tải tổng quan quản trị">
      <div className="space-y-2">
        <Skeleton className="h-7 w-48 rounded-xl" />
        <Skeleton className="h-4 w-72 rounded-md" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i} className="border-border">
            <CardContent className="flex items-center justify-between p-4">
              <div className="space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-10 w-10 rounded-xl" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-border">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full rounded-xl" />
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-40" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full rounded-xl" />
          </CardContent>
        </Card>
      </div>

      <Card className="border-border">
        <CardHeader className="pb-2">
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 border-b border-border/50 py-2">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
