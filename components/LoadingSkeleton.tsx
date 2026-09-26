export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl bg-fit-card border border-fit-border overflow-hidden flex flex-col h-[340px]"
        >
          {/* Image skeleton */}
          <div className="aspect-[16/10] bg-fit-surface w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
          </div>

          {/* Content skeleton */}
          <div className="p-5 flex flex-col justify-between flex-grow space-y-4">
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="h-4 w-16 bg-fit-surface rounded" />
                <div className="h-4 w-12 bg-fit-surface rounded" />
              </div>
              <div className="h-6 w-3/4 bg-fit-surface rounded" />
              <div className="h-4 w-1/2 bg-fit-surface rounded" />
            </div>

            <div className="pt-3 border-t border-fit-border flex justify-between">
              <div className="h-4 w-14 bg-fit-surface rounded" />
              <div className="h-4 w-14 bg-fit-surface rounded" />
              <div className="h-4 w-10 bg-fit-surface rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
