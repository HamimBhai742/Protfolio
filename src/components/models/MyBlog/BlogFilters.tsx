/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  BlogFilters as BlogFiltersType,
  blogCategories,
} from '@/types/blog.types';
import { Search, Filter } from 'lucide-react';

interface BlogFiltersProps {
  filters: BlogFiltersType;
  onFiltersChange: (filters: BlogFiltersType) => void;
}

export const BlogFilters = ({ filters, onFiltersChange }: BlogFiltersProps) => {
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700 mb-6'>
      <div className='flex flex-col lg:flex-row gap-4'>
        {/* Search */}
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4' />
          <input
            type='text'
            placeholder='Search blogs...'
            value={filters.search || ''}
            onChange={(e) =>
              onFiltersChange({ ...filters, search: e.target.value })
            }
            className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          />
        </div>

        <div className='flex md:items-center gap-4 flex-row justify-between'>
          {/* Category Filter */}
          <div className='flex items-center gap-2'>
            <Filter className='w-4 h-4 text-gray-500' />
            <select
              value={filters.category || ''}
              onChange={(e) =>
                onFiltersChange({ ...filters, category: e.target.value })
              }
              className='px-3 select py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            >
              <option value=''>All Categories</option>
              {blogCategories.map((category) => (
                <option key={category} value={category}>
                  {category.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
         <div>
           <select
            value={filters.status || 'all'}
            onChange={(e) =>
              onFiltersChange({ ...filters, status: e.target.value as any })
            }
            className='px-3 select py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          >
            <option value='all'>All Status</option>
            <option value='published'>Published</option>
            <option value='draft'>Draft</option>
          </select>
         </div>
        </div>
      </div>
    </div>
  );
};
