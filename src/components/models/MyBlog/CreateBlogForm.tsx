'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BlogFormData, blogCategories } from '@/types/blog.types';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Plus, X, Image as FileText, Upload } from 'lucide-react';
import UploadCloudinary from '@/upload/UploadCloudinary';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ImSpinner9 } from 'react-icons/im';

export default function CreateBlogForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [thumb, setThumb] = useState<File | null>(null);
  const [tagInput, setTagInput] = useState('');
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<BlogFormData>({
    defaultValues: {
      tags: [],
    },
  });

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

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      const thumbnailUrl = await UploadCloudinary({
        thumbnail: thumb,
      });
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/blog/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({
            ...data,
            thumbnail: thumbnailUrl,
            userId: 1,
          }),
        }
      );
      const result = await res.json();
      if (result?.success) {
        toast.success(result?.message);
        reset();
        setTags([]);
        setThumb(null);
        router.push('/dashboard/my-blogs');
      }
      if (!result?.success) {
        toast.error(result?.message);
      }
    } catch {
      toast.error('Failed to create blog');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-4 px-4'>
      <div className='max-w-7xl'>
        {/* Header */}
        <div className='text-center mb-8'>
          <div className='inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full mb-4'>
            <FileText className='w-8 h-8 text-blue-600 dark:text-blue-400' />
          </div>
          <h1 className='md:text-4xl text-2xl font-bold text-gray-900 dark:text-white mb-2'>
            Create New Blog Post
          </h1>
          <p className='text-gray-600 dark:text-gray-400'>
            Share your thoughts and ideas with the world
          </p>
        </div>

        <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden'>
          <form onSubmit={handleSubmit(onSubmit)} className='p-8 space-y-8'>
            <div className='space-y-4 grid grid-cols-1 lg:grid-cols-4 gap-4'>
              {/* Title */}
              <div className='space-y-2 col-span-3'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Title *
                </label>
                <input
                  {...register('title', {
                    required: 'Title is required',
                    minLength: {
                      value: 5,
                      message: 'Title must be at least 5 characters',
                    },
                  })}
                  className='w-full px-4 py-3 text-lg border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200'
                  placeholder='Enter an engaging title...'
                />
                {errors.title && (
                  <p className='text-red-500 text-sm'>{errors.title.message}</p>
                )}
              </div>

              {/* Category */}
              <div className='space-y-2 col-span-1'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Category *
                </label>
                <select
                  {...register('category', {
                    required: 'Category is required',
                  })}
                  className='max-sm:w-full max-md:w-fit lg:w-full select select-md h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2  focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200'
                >
                  <option value=''>Select a category</option>
                  {blogCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className='text-red-500 text-sm'>
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                Description *
              </label>
              <textarea
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 50,
                    message: 'Description must be at least 50 characters',
                  },
                  maxLength: {
                    value: 200,
                    message: 'Description must be at less than 200 characters',
                  },
                })}
                rows={3}
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-all duration-200'
                placeholder='Write a compelling description that summarizes your blog...'
              />
              {errors.description && (
                <p className='text-red-500 text-sm'>
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Tags and Thumbnail */}
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-6'>
              <div className='col-span-3 space-y-4'>
                {/* Tags */}
                <div className='space-y-3'>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                    Tags ({tags.length}/10)
                  </label>

                  {tags.length > 0 && (
                    <div className='flex flex-wrap gap-2'>
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className='inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-blue-700'
                        >
                          {tag}
                          <button
                            type='button'
                            onClick={() => removeTag(tag)}
                            className='ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 transition-colors'
                          >
                            <X className='w-4 h-4' />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className='flex gap-2 items-center'>
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === 'Enter' && (e.preventDefault(), addTag())
                      }
                      disabled={tags.length >= 10}
                      className='flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white disabled:opacity-50 transition-all duration-200'
                      placeholder={
                        tags.length >= 10
                          ? 'Maximum tags reached'
                          : 'Add a tag and press Enter...'
                      }
                    />
                    <Button
                      type='button'
                      onClick={addTag}
                      disabled={!tagInput.trim() || tags.length >= 10}
                      variant='outline'
                      className='px-4'
                    >
                      <Plus className='w-4 h-4' />
                    </Button>
                  </div>
                </div>

                {/* Status */}
                <div className='space-y-2'>
                  <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                    Status
                  </label>
                  <select
                    {...register('status')}
                    className=' lg:w-fit select select-md h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2  focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-200'
                  >
                    <option value=''>Select a Status</option>
                    <option value='published'>Published</option>
                    <option value='draft'>Draft</option>
                  </select>
                </div>
              </div>
              {/* Thumbnail */}
              <div className='space-y-3 col-span-2'>
                <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Thumbnail *
                </label>
                <div className='flex max-sm:flex-col gap-3 items-center justify-between w-full'>
                  {thumb === null ? (
                    <label className='flex flex-col items-center justify-center w-full  h-40 md:h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md'>
                      <div className='flex flex-col gap-3 items-center justify-center pointer-events-none'>
                        <Upload className='h-10 w-10 text-gray-400' />
                        <p className='text-sm text-gray-400 dark:text-gray-400 text-center px-2'>
                          Drag & drop or click to upload
                        </p>
                      </div>

                      <input
                        required
                        type='file'
                        accept='image/*'
                        className='hidden'
                        {...register('thumbnail', {
                          required: 'Thumbnail is required',
                        })}
                        onChange={(e) => setThumb(e.target.files?.[0] || null)}
                      />
                    </label>
                  ) : (
                    <div className=' w-full relative'>
                      <Image
                        src={URL.createObjectURL(thumb || new Blob())}
                        alt='Thumbnail Preview'
                        width={200}
                        height={200}
                        className='w-full h-40 md:h-48 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'
                      />

                      <span
                        onClick={() => setThumb(null)}
                        className='absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors'
                      >
                        <X className='w-4 h-4 text-white' />
                      </span>
                    </div>
                  )}
                </div>

                {errors.thumbnail && (
                  <p className='text-red-500 text-sm'>
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className='space-y-2'>
              <label className='block text-sm font-semibold text-gray-700 dark:text-gray-300'>
                Content *
              </label>
              <textarea
                {...register('content', {
                  required: 'Content is required',
                  minLength: {
                    value: 100,
                    message: 'Content must be at least 100 characters',
                  },
                })}
                rows={15}
                className='w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none transition-all duration-200 font-mono text-sm leading-relaxed'
                placeholder='Write your blog content here miminum 100 characters...'
              />
              {errors.content && (
                <p className='text-red-500 text-sm'>{errors.content.message}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className=' gap-4 pt-6 border-t border-gray-200 dark:border-gray-700'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold p-6 rounded-lg transition-all duration-200 transform hover:scale-105 text-lg'
              >
                {isSubmitting ? (
                  <div className='flex items-center justify-center'>
                    <ImSpinner9 className='animate-spin h-5 w-5' />
                    <span className='ml-2'>Posting...</span>
                  </div>
                ) : (
                  ' Blog Post'
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
