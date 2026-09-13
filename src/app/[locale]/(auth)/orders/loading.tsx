import { OrdersSkeleton } from '@/components/account/OrdersSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersLoading() {
  return (
    <div
      className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12"
      aria-busy="true"
      aria-label="Đang tải danh sách đơn hàng"
    >
      <div className="mb-6 space-y-2">
        <Skeleton className="h-8 w-56 rounded-xl" />
        <Skeleton className="h-4 w-80 rounded-md" />
      </div>
      <OrdersSkeleton />
    </div>
  );
}
