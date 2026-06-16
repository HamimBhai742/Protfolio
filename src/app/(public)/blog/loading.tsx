import CardSkeleton from '@/components/shared/CardSkelton/CardSkleton';
import React from 'react';

const BlogCardLoading = () => {
  return (
    <div className='pt-16'>
      <CardSkeleton/>
    </div>
  );
};

export default BlogCardLoading;