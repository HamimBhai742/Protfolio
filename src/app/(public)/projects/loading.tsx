const LoadingProjectCard = () => {
  return (
    <div className='bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/80 p-5 md:p-6 shadow-sm flex flex-col lg:flex-row gap-6 animate-pulse'>
      {/* Image Placeholder */}
      <div className='max-lg:h-52 lg:w-80 h-40 bg-gray-200 dark:bg-gray-800 rounded-2xl shrink-0' />

      {/* Content Placholder */}
      <div className='flex-1 flex flex-col justify-between space-y-4 min-w-0'>
        <div className='space-y-4'>
          {/* Header row */}
          <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
            <div className='space-y-2.5 w-full sm:w-2/3'>
              {/* Title */}
              <div className='h-7 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4' />
              
              {/* Category & Status badges */}
              <div className='flex gap-2 pt-1'>
                <div className='h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-16' />
                <div className='h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-20' />
              </div>
            </div>
            {/* Date */}
            <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 shrink-0' />
          </div>

          {/* Description paragraphs */}
          <div className='space-y-2'>
            <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-full' />
            <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6' />
          </div>

          {/* Features */}
          <div className='space-y-2 pt-1'>
            <div className='h-3.5 bg-gray-200 dark:bg-gray-800 rounded w-16' />
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
              <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4' />
              <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-2/3' />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-auto'>
          {/* Tech tags */}
          <div className='flex gap-1.5'>
            <div className='h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-12' />
            <div className='h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-16' />
            <div className='h-6 bg-gray-200 dark:bg-gray-800 rounded-lg w-10' />
          </div>
          {/* Details CTA Link */}
          <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 self-end sm:self-center' />
        </div>
      </div>
    </div>
  );
};

export default function LoadingProjectsPage() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950 py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6'>
        {/* Page Title placeholder */}
        <div className='space-y-2.5 pb-4'>
          <div className='h-10 bg-gray-200 dark:bg-gray-800 rounded-xl w-36 animate-pulse' />
          <div className='h-4 bg-gray-200 dark:bg-gray-800 rounded w-64 animate-pulse' />
        </div>

        {/* Multiple loading skeletons */}
        <div className='space-y-6'>
          <LoadingProjectCard />
          <LoadingProjectCard />
          <LoadingProjectCard />
        </div>
      </div>
    </div>
  );
}
