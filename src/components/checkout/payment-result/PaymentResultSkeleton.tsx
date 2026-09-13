import { Skeleton } from '@/components/ui/skeleton';

export function PaymentResultSkeleton() {
  return (
    <div
      className="min-h-[80vh] bg-background py-10 lg:py-16"
      aria-busy="true"
      aria-label="Đang kiểm tra kết quả thanh toán"
    >
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="flex flex-col items-center overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-10">
          <Skeleton className="h-16 w-16 rounded-full" />
          <Skeleton className="mt-4 h-6 w-48 rounded-lg" />
          <Skeleton className="mt-2 h-4 w-64 rounded-md" />

          <div className="mt-8 w-full space-y-3 rounded-2xl border border-border/80 bg-muted/20 p-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>

          <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
            <Skeleton className="h-11 w-full rounded-xl sm:w-40" />
            <Skeleton className="h-11 w-full rounded-xl sm:w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
