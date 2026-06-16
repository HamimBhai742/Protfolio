// components/SkeletonProjectCard.jsx

const LoadingProectCard = () => {
  return (
    <div className="container mx-auto pt-16">
      <div className='animate-pulse  bg-gray-800 p-4 rounded-lg flex gap-4 mb-6'>
        {/* Image Placeholder */}
        <div className='h-40 w-40 bg-gray-700 rounded-md flex-shrink-0'></div>

        {/* Content */}
        <div className='flex flex-col w-full space-y-3'>
          {/* Title & Tags */}
          <div className='flex justify-between items-center'>
            <div className='h-5 w-1/3 bg-gray-700 rounded'></div>
            <div className='h-4 w-24 bg-gray-700 rounded'></div>
          </div>

          {/* Tags */}
          <div className='flex gap-2'>
            <div className='h-6 w-14 bg-gray-700 rounded-full'></div>
            <div className='h-6 w-20 bg-gray-700 rounded-full'></div>
          </div>

          {/* Description */}
          <div className='h-4 bg-gray-700 rounded w-full'></div>
          <div className='h-4 bg-gray-700 rounded w-5/6'></div>
          <div className='h-4 bg-gray-700 rounded w-2/3'></div>

          {/* Features */}
          <div className='mt-2'>
            <div className='h-4 w-24 bg-gray-700 rounded mb-1'></div>
            <div className='h-4 w-1/2 bg-gray-700 rounded'></div>
          </div>

          {/* Technologies */}
          <div className='flex gap-2 mt-2'>
            <div className='h-6 w-12 bg-gray-700 rounded-full'></div>
            <div className='h-6 w-16 bg-gray-700 rounded-full'></div>
            <div className='h-6 w-10 bg-gray-700 rounded-full'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingProectCard;
