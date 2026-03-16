export default function NewsLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="skeleton h-8 w-32 rounded-lg mb-2" />
      <div className="skeleton h-4 w-64 rounded mb-8" />

      <div className="flex flex-col gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-surface border border-border rounded-xl overflow-hidden md:flex"
          >
            <div className={`skeleton flex-shrink-0 ${i === 0 ? "h-48 md:h-auto md:w-80" : "h-32 md:h-auto md:w-48"}`} />
            <div className="p-5 flex flex-col gap-3 flex-1">
              <div className="flex items-center gap-2">
                <div className="skeleton h-5 w-20 rounded-full" />
                <div className="skeleton h-4 w-28 rounded" />
              </div>
              <div className="skeleton h-5 w-3/4 rounded" />
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-2/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
