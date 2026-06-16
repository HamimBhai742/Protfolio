import { BlogPost } from '@/types/blog.types';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface BlogListItemProps {
  blog: BlogPost;
}

export const BlogListItem = ({ blog }: BlogListItemProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group">
      <div className="flex flex-col lg:flex-row">
        {/* Thumbnail */}
        <Link href={`/blog/${blog.slug}`} className="block lg:w-80 flex-shrink-0">
          <div className="relative h-48 lg:h-full overflow-hidden">
            <Image
              src={blog.thumbnail || '/placeholder-blog.jpg'}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="flex flex-col h-full">
            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(blog.createdAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{blog.readTime} min read</span>
              </div>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-medium rounded-full">
                {blog.category.replace('_', ' ')}
              </span>
            </div>

            {/* Title */}
            <Link href={`/blog/${blog.slug}`}>
              <h3 className="font-bold text-xl lg:text-2xl text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {blog.title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed flex-grow">
              {blog.description}
            </p>

            {/* Tags and Read More */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {blog.tags.slice(0, 4).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                  >
                    #{tag}
                  </span>
                ))}
                {blog.tags.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-md">
                    +{blog.tags.length - 4} more
                  </span>
                )}
              </div>

              {/* Read More */}
              <Link
                href={`/blog/${blog.slug}`}
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group/link flex-shrink-0"
              >
                Read More
                <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
