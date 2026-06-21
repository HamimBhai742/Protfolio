export default function LoadingProjectDetailsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation skeleton */}
        <div className="w-32 h-5 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8 animate-pulse" />

        {/* Hero Section Banner skeleton */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/30 dark:border-gray-800/80 shadow-xl overflow-hidden mb-12 animate-pulse">
          <div className="relative w-full h-[300px] sm:h-[450px] bg-gray-250 dark:bg-gray-850 flex flex-col justify-end p-8 sm:p-12 space-y-4">
            <div className="flex gap-3">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-16" />
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-24" />
            </div>
            <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded-xl w-1/2" />
          </div>
        </div>

        {/* Split Grid skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-pulse">
          
          {/* Main Info Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Overview / Brief description skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-8 shadow-md space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 border-b border-gray-100 dark:border-gray-800 pb-3" />
              <div className="space-y-2.5">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
              </div>
            </div>

            {/* Detailed specifications skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-8 shadow-md space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2 border-b border-gray-100 dark:border-b-gray-800 pb-3" />
              <div className="space-y-2.5">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/5" />
              </div>
            </div>

            {/* Features skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-8 shadow-md space-y-5">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/3 border-b border-gray-100 dark:border-b-gray-800 pb-3" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-2/3" />
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              </div>
            </div>
          </div>

          {/* Quick Specifications Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Quick Details Card skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-6 shadow-md space-y-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-1/2 border-b border-gray-100 dark:border-b-gray-800 pb-3" />
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3.5">
                  <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-12" />
                    <div className="h-4 bg-gray-250 dark:bg-gray-750 rounded w-20" />
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-12" />
                    <div className="h-5 bg-gray-250 dark:bg-gray-750 rounded-full w-24" />
                  </div>
                </div>

                <div className="flex items-center space-x-3.5">
                  <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-800" />
                  <div className="space-y-1.5 flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-20" />
                    <div className="h-4 bg-gray-250 dark:bg-gray-750 rounded w-32" />
                  </div>
                </div>
              </div>

              {/* Action Links skeleton */}
              <div className="space-y-3 pt-4 border-t border-gray-150 dark:border-gray-800">
                <div className="h-11 bg-gray-300 dark:bg-gray-700 rounded-xl w-full" />
                <div className="h-11 bg-gray-300 dark:bg-gray-700 rounded-xl w-full" />
              </div>
            </div>

            {/* Tech Stack Tags Card skeleton */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/50 p-6 shadow-md space-y-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-2/3 border-b border-gray-100 dark:border-b-gray-800 pb-3" />
              <div className="flex flex-wrap gap-2">
                <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-12" />
                <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-16" />
                <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-10" />
                <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-14" />
                <div className="h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-8" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
