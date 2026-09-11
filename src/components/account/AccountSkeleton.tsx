export function AccountSkeleton() {
  return (
    <div className="min-h-screen animate-pulse bg-background pb-16">
      <div className="bg-muted/60 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="h-4 w-32 rounded bg-muted" />
          <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div className="space-y-3">
              <div className="h-6 w-40 rounded bg-muted" />
              <div className="h-8 w-64 rounded bg-muted" />
              <div className="h-4 w-96 rounded bg-muted" />
            </div>
            <div className="h-16 w-48 rounded-xl bg-muted" />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="h-80 rounded-2xl border border-border bg-card p-6" />
          </div>
          <div className="lg:col-span-8">
            <div className="h-96 rounded-2xl border border-border bg-card p-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
