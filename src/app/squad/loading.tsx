export default function SquadLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header skeleton */}
      <div className="skeleton h-8 w-40 rounded-lg mb-2" />
      <div className="skeleton h-4 w-72 rounded mb-8" />

      {/* Filter buttons skeleton */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="skeleton h-9 w-28 rounded-lg" />
        ))}
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="skeleton h-48 w-full" />
            <div className="p-4 space-y-2">
              <div className="skeleton h-4 w-16 rounded" />
              <div className="skeleton h-4 w-32 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
