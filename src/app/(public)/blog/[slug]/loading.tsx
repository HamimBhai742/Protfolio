// components/SkeletonCard.jsx

const LoadingBlogDetails = () => {
  return (
    <div className="animate-pulse bg-gray-800 p-4 rounded-md max-w-3xl mx-auto">
      {/* Image Placeholder */}
      <div className="h-60 bg-gray-700 rounded-md mb-4"></div>

      {/* Date + Category */}
      <div className="flex space-x-4 mb-2">
        <div className="h-4 w-24 bg-gray-700 rounded"></div>
        <div className="h-4 w-16 bg-gray-700 rounded"></div>
        <div className="h-4 w-28 bg-gray-700 rounded"></div>
      </div>

      {/* Title */}
      <div className="h-6 bg-gray-700 rounded w-2/3 mb-2"></div>
      <div className="h-6 bg-gray-700 rounded w-1/3"></div>
    </div>
  );
};

export default LoadingBlogDetails;
