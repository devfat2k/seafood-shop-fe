export function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2].map((i) => (
        <div
          key={i}
          className="animate-pulse rounded-2xl border border-border bg-card p-6 shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div className="h-5 w-32 rounded-lg bg-muted" />
            <div className="h-5 w-24 rounded-full bg-muted" />
          </div>
          <div className="my-4 h-16 rounded-xl bg-muted/60" />
          <div className="flex items-center justify-between pt-2">
            <div className="h-4 w-20 rounded bg-muted" />
            <div className="h-8 w-28 rounded-lg bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}
