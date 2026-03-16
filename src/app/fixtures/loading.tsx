export default function FixturesLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="skeleton h-8 w-48 rounded-lg mb-2" />
      <div className="skeleton h-4 w-56 rounded mb-6" />

      {/* Tabs skeleton */}
      <div className="flex gap-2 mb-8 border-b border-border pb-0">
        {[1, 2, 3].map((i) => (
          <div key={i} className="skeleton h-10 w-32 rounded-t-lg" />
        ))}
      </div>

      {/* Match cards skeleton */}
      <div className="flex flex-col gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-lg p-4 flex items-center gap-4"
          >
            <div className="skeleton h-4 w-16 rounded hidden sm:block" />
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="skeleton h-4 w-24 rounded" />
                <div className="skeleton w-7 h-7 rounded-full" />
              </div>
              <div className="flex items-center gap-2 px-3">
                <div className="skeleton h-7 w-6 rounded" />
                <div className="skeleton h-4 w-3 rounded" />
                <div className="skeleton h-7 w-6 rounded" />
              </div>
              <div className="flex items-center gap-2 flex-1">
                <div className="skeleton h-4 w-28 rounded" />
              </div>
            </div>
            <div className="skeleton h-4 w-20 rounded hidden sm:block" />
          </div>
        ))}
      </div>
    </div>
  );
}
