import { ProductCatalogSkeleton } from '@/components/products/ProductCatalogSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductsLoading() {
  return (
    <div
      className="min-h-screen bg-background"
      aria-busy="true"
      aria-label="Đang tải danh mục hải sản"
    >
      <div className="border-b border-border/80 bg-card py-6 sm:py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="mt-2 h-8 w-64 rounded-xl" />
          <Skeleton className="mt-2 h-4 w-96 rounded-md" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4 lg:gap-8">
          <div className="hidden space-y-6 lg:block">
            <div className="space-y-4 rounded-2xl border border-border/80 bg-card p-4">
              <Skeleton className="h-5 w-28" />
              <div className="space-y-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-full rounded-xl" />
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <Skeleton className="h-8 w-40 rounded-xl" />
              <Skeleton className="h-8 w-32 rounded-xl" />
            </div>
            <ProductCatalogSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
