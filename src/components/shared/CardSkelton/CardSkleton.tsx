import React from 'react';

export default function CardSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <div className='p-4 max-w-sm w-full mx-auto animate-pulse'>
        <div className='bg-gray-300 dark:bg-gray-700 h-48 w-full rounded-lg mb-4' />
        <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2' />
        <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4' />
        <div className='flex space-x-2 mb-4'>
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
        </div>
        <div className='flex space-x-2'>
          <div className='h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded' />
        </div>
      </div>
      <div className='p-4 max-w-sm w-full mx-auto animate-pulse'>
        <div className='bg-gray-300 dark:bg-gray-700 h-48 w-full rounded-lg mb-4' />
        <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2' />
        <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4' />
        <div className='flex space-x-2 mb-4'>
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
        </div>
        <div className='flex space-x-2'>
          <div className='h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded' />
        </div>
      </div>
      <div className='p-4 max-w-sm w-full mx-auto animate-pulse'>
        <div className='bg-gray-300 dark:bg-gray-700 h-48 w-full rounded-lg mb-4' />
        <div className='h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2' />
        <div className='h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4' />
        <div className='flex space-x-2 mb-4'>
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-6 w-16 bg-gray-300 dark:bg-gray-700 rounded' />
        </div>
        <div className='flex space-x-2'>
          <div className='h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded' />
          <div className='h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded' />
        </div>
      </div>
    </div>
  );
}
