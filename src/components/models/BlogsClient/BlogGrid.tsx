import { BlogPost } from '@/types/blog.types';
import { BlogCard } from './BlogCard';
import { BlogListItem } from './BlogListItem';
import { BookOpen } from 'lucide-react';

interface BlogGridProps {
  blogs: BlogPost[];
  viewMode: 'grid' | 'list';
}

export const BlogGrid = ({ blogs, viewMode }: BlogGridProps) => {
  if (blogs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No articles found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your search terms or filters to find what you are looking for.
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-6 mt-8">
        {blogs.map((blog) => (
          <BlogListItem key={blog.id} blog={blog} />
        ))}
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};
