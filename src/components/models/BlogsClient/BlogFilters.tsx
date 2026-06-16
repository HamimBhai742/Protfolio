import { Grid, List } from 'lucide-react';
interface BlogFiltersProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  totalBlogs: number;
}

export const BlogFilters = ({
  viewMode,
  onViewModeChange,
  totalBlogs,
}: BlogFiltersProps) => {
  return (
    <div className='space-y-6 pt-8'>
      {/* Results Header */}
      <div className='flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
            All Blogs
          </h2>
          <p className='text-gray-500 dark:text-gray-400 text-sm mt-2'>
            {totalBlogs} blogs found
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className='flex items-center bg-white dark:bg-gray-800 rounded-lg p-1 border border-gray-200 dark:border-gray-700'>
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'grid'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Grid className='w-4 h-4' />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-md transition-colors ${
              viewMode === 'list'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <List className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};
