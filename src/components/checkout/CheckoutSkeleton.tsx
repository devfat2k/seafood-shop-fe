export function CheckoutSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-64 rounded-lg bg-muted" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="h-40 rounded-2xl bg-muted/60" />
            <div className="h-64 rounded-2xl bg-muted/60" />
          </div>
          <div className="h-72 rounded-2xl bg-muted/60" />
        </div>
      </div>
    </div>
  );
}
