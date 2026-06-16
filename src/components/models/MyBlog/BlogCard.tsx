'use client';
import { BlogCardProps  } from '@/types/blog.types';
import { Calendar, Clock, Edit, Trash2, Eye } from 'lucide-react';
import { format } from 'timeago.js';
import Image from 'next/image';



export const BlogCard = ({ blog, onEdit, onDelete }: BlogCardProps) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all duration-300 group'>
      {/* Thumbnail */}
      <div className='relative h-48 overflow-hidden'>
        <Image
          src={blog.thumbnail || '/placeholder-blog.jpg'}
          alt={blog.title}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300'
        />
        <div className='absolute top-3 left-3'>
          <span
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              blog.status === 'published'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}
          >
            {blog.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className='p-5'>
        <div className='flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2'>
          <Calendar className='w-4 h-4' />
          <span>{formatDate(blog.createdAt)}</span>
          <Clock className='w-4 h-4 ml-2' />
          <span>{format(blog.updatedAt)}</span>
        </div>

        <h3 className='font-semibold text-lg text-gray-900 dark:text-white mb-2 line-clamp-2'>
          {blog.title}
        </h3>

        <p className='text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2'>
          {blog.description}
        </p>

        <div className='flex items-center justify-between'>
          <div className='flex flex-wrap gap-1'>
            <span className='px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs rounded-full'>
              {blog.category}
            </span>
          </div>

          <div className='flex items-center gap-2'>
            <button
              className='p-2 flex gap-2 items-center  text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors'
              title='View'
            >
              <span className='text-sm'>{blog.views}</span>
              <Eye className='w-4 h-4' />
            </button>
            <button
              onClick={() => onEdit(blog)}
              className='p-2 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400 transition-colors'
              title='Edit'
            >
              <Edit className='w-4 h-4' />
            </button>
            <button
              onClick={() => onDelete(Number(blog.id))}
              className='p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors'
              title='Delete'
            >
              <Trash2 className='w-4 h-4' />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
