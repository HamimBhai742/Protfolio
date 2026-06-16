'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { BlogFormData, blogCategories } from '@/types/blog.types';
import toast from 'react-hot-toast';
import { Save, X, Plus, Upload } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getMyUpdateBlog } from '@/actions/myBlogs';
import { updateMyBlog } from '@/actions/myBlogUpById';
import Loding from './Loding';
import UploadCloudinary from '@/upload/UploadCloudinary';
import { ImSpinner9 } from 'react-icons/im';

interface UpdateBlogFormProps {
  blogId: string;
}

export const UpdateBlogForm = ({ blogId }: UpdateBlogFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BlogFormData>();

  // Load blog data
  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await getMyUpdateBlog(blogId);
        if (data?.success) {
          // setBlog(data?.data);
          reset(data?.data);
          setTags(data?.data?.tags);
          setThumbnailPreview(data?.data?.thumbnail);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        toast.error('Failed to load blog');
        router.push('/dashboard/my-blogs');
      } finally {
        setIsLoading(false);
      }
    };

    loadBlog();
  }, [blogId, reset, router]);

  const addTag = () => {
    if (
      tagInput.trim() &&
      !tags.includes(tagInput.trim()) &&
      tags.length < 10
    ) {
      const newTags = [...tags, tagInput.trim()];
      setTags(newTags);
      setValue('tags', newTags);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags(newTags);
    setValue('tags', newTags);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue('thumbnail', [file]);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    console.log(data);
    setIsSubmitting(true);
    try {
      if (data?.thumbnail && typeof data?.thumbnail !== 'string') {
        data.thumbnail = await UploadCloudinary({
          thumbnail: data.thumbnail[0],
        });
      }

      const result = await updateMyBlog(blogId, data);
      if (result?.success) {
        toast.success(result?.message);
        router.push('/dashboard/my-blogs');
      }
      if (!result?.success) {
        toast.error(result?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to update blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Loding />;
  }

  return (
    <div className='max-w-7xl'>
      {/* Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-4'>
          <div>
            <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
              Update Blog
            </h1>
            <p className='text-gray-600 dark:text-gray-400 mt-1'>
              Edit and update your blog post
            </p>
          </div>
        </div>

        <div className='flex max-sm:hidden  items-center gap-3'>
          <button
            onClick={() => router.back()}
            className='px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50'
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50'
          >
            <Save className='w-4 h-4' />
            {isSubmitting ? 'Updating...' : 'Update Blog'}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-6'>
            {/* Title */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Blog Title *
              </label>
              <input
                {...register('title', { required: 'Title is required' })}
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Enter your blog title...'
              />
              {errors.title && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Description *
              </label>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                })}
                rows={3}
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                placeholder='Brief description of your blog...'
              />
              {errors.description && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Content */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Content *
              </label>
              <textarea
                {...register('content', { required: 'Content is required' })}
                rows={20}
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm'
                placeholder='Write your blog content in Markdown...'
              />
              {errors.content && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.content.message}
                </p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Thumbnail */}
            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Thumbnail
              </h3>

              {thumbnailPreview ? (
                <div className='relative'>
                  <Image
                    src={thumbnailPreview}
                    alt='Thumbnail preview'
                    width={300}
                    height={200}
                    className='w-full h-48 object-cover rounded-lg'
                  />
                  <button
                    type='button'
                    onClick={() => {
                      setThumbnailPreview('');
                      setValue('thumbnail', null);
                    }}
                    className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
                  >
                    <X className='w-4 h-4' />
                  </button>
                </div>
              ) : (
                <label className='flex flex-col items-center justify-center w-full h-48 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors'>
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                    <Upload className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400' />
                    <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                      <span className='font-semibold'>Click to upload</span>
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      PNG, JPG or WEBP (MAX. 5MB)
                    </p>
                  </div>
                  <input
                    type='file'
                    className='hidden'
                    accept='image/*'
                    onChange={handleThumbnailChange}
                  />
                </label>
              )}
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-1 gap-4'>
              {/* status */}
              <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Status
                </h3>
                <select
                  {...register('status', {
                    required: 'Category is required',
                  })}
                  className='w-full select px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value=''>Select Status</option>
                  <option value='published'>Published</option>
                  <option value='draft'>Draft</option>
                </select>
                {errors.status && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.status.message}
                  </p>
                )}
              </div>
              {/* Category */}
              <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                  Category
                </h3>
                <select
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  className='w-full select px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                >
                  <option value=''>Select Category</option>
                  {blogCategories.map((category) => (
                    <option key={category} value={category}>
                      {category.replace('_', ' ')}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className='text-red-500 text-sm mt-1'>
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className='bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
                Tags
              </h3>

              <div className='flex gap-2 mb-3'>
                <input
                  type='text'
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && (e.preventDefault(), addTag())
                  }
                  placeholder='Add tag...'
                  className='flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                />
                <button
                  type='button'
                  onClick={addTag}
                  className='px-3 lg:hidden py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                >
                  <Plus className='w-4 h-4' />
                </button>
              </div>

              <div className='flex flex-wrap gap-2'>
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full'
                  >
                    {tag}
                    <button
                      type='button'
                      onClick={() => removeTag(tag)}
                      className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200'
                    >
                      <X className='w-3 h-3' />
                    </button>
                  </span>
                ))}
              </div>

              {tags.length === 0 && (
                <p className='text-gray-500 dark:text-gray-400 text-sm'>
                  No tags added yet
                </p>
              )}
            </div>

            <div className='flex md:hidden items-center gap-3'>
              <button
                onClick={() => router.back()}
                className='px-4 py-2 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50'
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50'
              >
                <Save className='w-4 h-4' />
                {isSubmitting ? (
                  <span className='flex items-center gap-2'>
                    <ImSpinner9 className='animate-spin h-5 w-5' />
                    <span>Updating...</span>
                  </span>
                ) : (
                  'Update Blog'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
