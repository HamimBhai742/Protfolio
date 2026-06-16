
export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Card */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-pulse">
          <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full mx-auto mb-4" />
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-40 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-56 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
          <div className="mt-6 space-y-2">
            <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="flex space-x-3">
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-6 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="md:col-span-2 space-y-6">
          {/* About Section */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-pulse">
            <div className="h-5 w-28 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
            <div className="h-4 w-72 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-pulse">
            <div className="h-5 w-48 bg-gray-300 dark:bg-gray-700 rounded mb-4" />
            <div className="flex flex-wrap gap-3">
              <div className="h-6 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
              <div className="h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-pulse">
              <div className="h-8 w-10 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-2" />
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-pulse">
              <div className="h-8 w-10 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-2" />
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow animate-pulse">
              <div className="h-8 w-10 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-2" />
              <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
