'use client';

import { BlogPost } from '@/types/blog.types';
import { Calendar,  Share2, Bookmark, Tag, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

interface SingleBlogClientProps {
  blog: BlogPost;
}

export const SingleBlogClient = ({ blog }: SingleBlogClientProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically save to localStorage or send to API
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900'>
      {/* Article */}
      <article className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:pt-20'>
        {/* Hero Image */}
        <div className='relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8'>
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className='object-cover'
            priority
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
        </div>

        {/* Article Header */}
        <header className='mb-8'>
          {/* Meta Info */}
          <div className='flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4'>
            <div className='flex items-center gap-1'>
              <Calendar className='w-4 h-4' />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Eye className='w-4 h-4' />
              <span>{blog.views}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Tag className='w-4 h-4' />
              <span>{blog.category.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight'>
            {blog.title}
          </h1>

          {/* Description */}
          <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed'>
            {blog.description}
          </p>

          {/* Actions */}
          <div className='flex items-center justify-between'>
            {/* Tags */}
            <div className='flex flex-wrap gap-2'>
              {blog.tags.map((tag, index) => (
                <span
                  key={index}
                  className='px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full'
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className='flex items-center gap-2'>
              <button
                onClick={handleShare}
                className='p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors'
                title='Share article'
              >
                <Share2 className='w-5 h-5' />
              </button>
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                    : 'text-gray-500 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
                }`}
                title={isBookmarked ? 'Remove bookmark' : 'Bookmark article'}
              >
                <Bookmark
                  className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`}
                />
              </button>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 lg:p-12 shadow-sm border border-gray-200 dark:border-gray-700'>
          <div className='prose prose-lg dark:prose-invert max-w-none'>
            <div
              className='whitespace-pre-wrap text-gray-800 dark:text-gray-200 leading-relaxed'
              style={{
                fontFamily:
                  'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
                lineHeight: '1.75',
              }}
            >
              {blog.content.split('\n').map((paragraph, index) => {
                // Handle headers
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1
                      key={index}
                      className='text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 first:mt-0'
                    >
                      {paragraph.replace('# ', '')}
                    </h1>
                  );
                }
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2
                      key={index}
                      className='text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4'
                    >
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3
                      key={index}
                      className='text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3'
                    >
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }

                // Handle code blocks
                if (paragraph.startsWith('```')) {
                  return null; // Handle in a more sophisticated way if needed
                }

                // Handle lists
                if (paragraph.startsWith('- ')) {
                  return (
                    <li
                      key={index}
                      className='text-gray-700 dark:text-gray-300 mb-2'
                    >
                      {paragraph.replace('- ', '')}
                    </li>
                  );
                }

                // Handle bold text
                const boldText = paragraph.replace(
                  /\*\*(.*?)\*\*/g,
                  '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>'
                );

                // Handle inline code
                const codeText = boldText.replace(
                  /`(.*?)`/g,
                  '<code class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm font-mono">$1</code>'
                );

                // Regular paragraphs
                if (paragraph.trim()) {
                  return (
                    <p
                      key={index}
                      className='text-gray-700 dark:text-gray-300 mb-4 leading-relaxed'
                      dangerouslySetInnerHTML={{ __html: codeText }}
                    />
                  );
                }

                return <br key={index} />;
              })}
            </div>
          </div>
        </div>

        {/* Article Footer */}
        <footer className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
            <div className='text-sm text-gray-500 dark:text-gray-400'>
              Last updated: {formatDate(blog.updatedAt)}
            </div>

            <div className='flex items-center gap-4'>
              <button
                onClick={handleShare}
                className='inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors'
              >
                <Share2 className='w-4 h-4' />
                Share Article
              </button>

              <Link
                href='/blog'
                className='inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors'
              >
                More Articles
              </Link>
            </div>
          </div>
        </footer>
      </article>
    </div>
  );
};
