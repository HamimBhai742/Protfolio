export default function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 mt-2 animate-pulse"></div>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Blog Stats Skeleton */}
        <div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Views Stats Skeleton */}
        <div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16 mt-2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Skeleton */}
        <div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-32 mt-2 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
