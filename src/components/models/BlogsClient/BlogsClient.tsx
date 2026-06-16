'use client';
import { useState } from 'react';
import { BlogPost } from '@/types/blog.types';
import { BlogGrid } from './BlogGrid';
import { BlogFilters } from './BlogFilters';

interface BlogsClientProps {
  blogs: BlogPost[];
}

export type SortOption = 'newest' | 'oldest' | 'popular' | 'title';

const BlogsClient = ({ blogs }: BlogsClientProps) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  return (
    <div className=' bg-gray-50 dark:bg-gray-900'>
      {/* Filters Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-16'>
        <BlogFilters
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalBlogs={blogs.length}
        />

        {/* Blog Grid */}
        <BlogGrid blogs={blogs} viewMode={viewMode} />
      </div>
    </div>
  );
};

export default BlogsClient;
