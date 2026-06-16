'use client';
import { useState } from 'react';
import { X, Upload, Link as LinkIcon, Calendar, Tag } from 'lucide-react';
import Image from 'next/image';
import { DatePicker } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import UploadCloudinary from '@/upload/UploadCloudinary';
import toast from 'react-hot-toast';
import { Project } from '@/types/projects.type';
import { ImSpinner9 } from 'react-icons/im';
import { cleanObj } from '@/actions/cleanObj';

interface AddProjectFormProps {
  onClose: () => void;
  onAdd: (project: Project) => void;
}

export default function AddProjectForm({
  onClose,
  onAdd,
}: AddProjectFormProps) {
  const [formData, setFormData] = useState({
    userId: 1,
    title: '',
    description: '',
    technologies: [''],
    liveUrl: '',
    githubUrl: '',
    category: '',
    startDate: '',
    endDate: '',
    status: '',
    features: '',
    thumbnail: null as File | null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const thumbnailUrl = await UploadCloudinary({
      thumbnail: formData.thumbnail,
    });

    try {
      if (thumbnailUrl) {
        formData.thumbnail = thumbnailUrl;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(cleanObj(formData)),
        }
      );
      const data = await res.json();
      if (data?.success) {
        onAdd(data?.data);
        toast.success(data?.message);
      }
      if (!data?.success) {
        toast.error(data?.message);
      }
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700'>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            Add New Project
          </h2>
          <button
            onClick={onClose}
            className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors'
          >
            <X className='h-5 w-5 text-gray-500 dark:text-gray-400' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Project Title *
            </label>
            <input
              type='text'
              required
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              placeholder='Enter project title'
            />
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className='w-full  px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
              placeholder='Describe your project minimum 200 characters'
            />
            <span className='text-xs absolute right-2 bottom-3 ml-4 text-gray-600 dark:text-gray-400 block '>
              {formData?.description?.length || 0}
            </span>
          </div>

          <div className='relative'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Features *
            </label>
            <textarea
              required
              rows={4}
              value={formData.features}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  features: e.target.value,
                }))
              }
              className='w-full  px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
              placeholder='Explain your project features using , separated'
            />
            <span className='text-xs absolute right-2 bottom-3 ml-4 text-gray-600 dark:text-gray-400 block '>
              {formData?.features?.length || 0}
            </span>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Technologies *
              </label>
              <div className='relative'>
                <Tag className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  required
                  value={formData.technologies}
                  onChange={(e) => {
                    const technology = e.target.value
                      .split(',')
                      .map((tech) => tech.trim());
                    setFormData((prev) => ({
                      ...prev,
                      technologies: technology,
                    }));
                  }}
                  className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  placeholder='React, Node.js, MongoDB'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Category *
              </label>
              <select
                value={formData.category}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              >
                <option value=''>Select category</option>
                <option value='web'>Web Application</option>
                <option value='mobile'>Mobile App</option>
                <option value='api'>API/Backend</option>
                <option value='other'>Other</option>
              </select>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Status *
              </label>
              <select
                value={formData.status}
                required
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, status: e.target.value }))
                }
                className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
              >
                <option value=''>Select status</option>
                <option value='completed'>Completed</option>
                <option value='in_progress'>In Progress</option>
                <option value='planned'>Planned</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Start Date *
              </label>
              <div className='relative'>
                <Calendar className='absolute z-50 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <DatePicker
                  required
                  selected={
                    formData.startDate ? new Date(formData.startDate) : null
                  }
                  onChange={(date: Date | null) =>
                    setFormData((prev) => ({
                      ...prev,
                      startDate: date ? date.toISOString().split('T')[0] : '',
                    }))
                  }
                  dateFormat='dd/MM/yyyy'
                  placeholderText='dd/mm/yyyy'
                  className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                />
              </div>
            </div>

            {/* End Date (only if completed) */}
            {formData.status === 'completed' && (
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  End Date
                </label>
                <div className='relative'>
                  <Calendar className='absolute z-50 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <DatePicker
                    selected={
                      formData.endDate ? new Date(formData.endDate) : null
                    }
                    onChange={(date: Date | null) =>
                      setFormData((prev) => ({
                        ...prev,
                        endDate: date ? date.toISOString().split('T')[0] : '',
                      }))
                    }
                    dateFormat='dd/MM/yyyy'
                    placeholderText='dd/mm/yyyy'
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  />
                </div>
              </div>
            )}
          </div>

          {formData.status !== 'planned' && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  Live URL
                </label>
                <div className='relative'>
                  <LinkIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='url'
                    value={formData.liveUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        liveUrl: e.target.value,
                      }))
                    }
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='https://example.com'
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                  GitHub URL
                </label>
                <div className='relative'>
                  <LinkIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                  <input
                    type='url'
                    value={formData.githubUrl}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        githubUrl: e.target.value,
                      }))
                    }
                    className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    placeholder='https://github.com/username/repo'
                  />
                </div>
              </div>
            </div>
          )}

          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Project Thumbnail *
            </label>

            <div className='flex max-sm:flex-col gap-3 items-center justify-between w-full'>
              <label className='flex flex-col items-center justify-center w-full md:w-1/2 lg:w-1/3 h-40 md:h-48 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md'>
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
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setFormData((prev) => ({ ...prev, thumbnail: file }));
                  }}
                />
              </label>

              {formData.thumbnail && (
                <div className='maxsm:mt-3 w-full md:w-1/2 lg:w-1/3'>
                  <Image
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt='Thumbnail Preview'
                    width={200}
                    height={200}
                    className='w-full h-40 md:h-48 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'
                  />
                </div>
              )}
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? (
                <span className='flex items-center justify-center'>
                  <ImSpinner9 className='animate-spin h-5 w-5' />
                  <span className='ml-2'>Creating...</span>
                </span>
              ) : (
                'Create Project'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
