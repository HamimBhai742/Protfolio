import React from 'react';

const Loding = () => {
  return (
    <div className='max-w-4xl mx-auto p-6'>
      <div className='animate-pulse'>
        <div className='h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6'></div>
        <div className='space-y-4'>
          <div className='h-12 bg-gray-200 dark:bg-gray-700 rounded'></div>
          <div className='h-32 bg-gray-200 dark:bg-gray-700 rounded'></div>
          <div className='h-64 bg-gray-200 dark:bg-gray-700 rounded'></div>
        </div>
      </div>
    </div>
  );
};

export default Loding;
