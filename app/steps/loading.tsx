export default function StepsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav skeleton */}
      <div className="h-16 border-b border-slate-100 flex items-center justify-center">
        <div className="h-8 w-48 bg-slate-100 rounded-full animate-pulse" />
      </div>
      
      {/* Hero skeleton */}
      <div className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="h-6 w-32 bg-slate-100 rounded-full mx-auto animate-pulse" />
          <div className="h-10 w-96 bg-slate-100 rounded mx-auto animate-pulse" />
          <div className="h-4 w-64 bg-slate-100 rounded mx-auto animate-pulse" />
        </div>
      </div>
      
      {/* Steps skeleton */}
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-50 rounded-2xl p-6 animate-pulse">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-slate-200 rounded-full" />
              <div className="h-6 w-48 bg-slate-200 rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
