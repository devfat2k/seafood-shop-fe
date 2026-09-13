import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminRbacLoading() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Đang tải dữ liệu phân quyền">
      <div className="flex items-center justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-7 w-48 rounded-xl" />
          <Skeleton className="h-3.5 w-72 rounded-md" />
        </div>
        <Skeleton className="h-9 w-36 rounded-xl" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <Skeleton className="h-5 w-32" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="border-border">
              <CardContent className="space-y-2 p-4">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
                <Skeleton className="h-3 w-40" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          <Card className="border-border">
            <CardHeader className="pb-3">
              <Skeleton className="h-5 w-44" />
            </CardHeader>
            <CardContent className="space-y-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b border-border/50 py-3"
                >
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-60" />
                  </div>
                  <Skeleton className="h-6 w-12 rounded-full" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
