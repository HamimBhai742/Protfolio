/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import { X, Save, Link as LinkIcon, Calendar, Tag, Upload } from 'lucide-react';
import { Project } from '@/types/projects.type';
import { cleanObj } from '@/actions/cleanObj';
import Image from 'next/image';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import UploadCloudinary from '@/upload/UploadCloudinary';
import { ImSpinner9 } from 'react-icons/im';

interface UpdateProjectFormProps {
  project: Project;
  onClose: () => void;
  onUpdate: (updatedProject: Project) => void;
}

export default function UpdateProjectForm({
  project,
  onClose,
  onUpdate,
}: UpdateProjectFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    thumbnail: null as File | null,
    description: '',
    features: '',
    technologies: [''],
    liveUrl: '',
    githubUrl: '',
    category: '',
    startDate: '',
    endDate: '',
    status: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (formData.thumbnail && typeof formData.thumbnail !== 'string') {
        const thumbnailUrl = await UploadCloudinary({
          thumbnail: formData.thumbnail,
        });
        formData.thumbnail = thumbnailUrl;
      }
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/update/${project?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(cleanObj(formData)),
        }
      );
      const data = await res.json();
      if (data?.success) {
        toast.success(data?.message);
      }
      if (!data?.success) {
        toast.error(data?.message);
      }
      onUpdate(data?.data);
      onClose();
    } catch (error) {
      console.error('Error updating project:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4'>
      <div className='bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700'>
        <div className='flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20'>
          <h2 className='text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent'>
            Update Project
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
              Project Title
            </label>
            <input
              type='text'
              defaultValue={project.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200'
              placeholder='Enter project title'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Description
            </label>
            <textarea
              rows={4}
              defaultValue={project.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none'
              placeholder='Describe your project'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Features
            </label>
            <textarea
              rows={4}
              defaultValue={project.features}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  features: e.target.value,
                }))
              }
              className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 resize-none'
              placeholder='Explain your project features'
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Technologies
              </label>
              <div className='relative'>
                <Tag className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type='text'
                  defaultValue={project.technologies.join(', ')}
                  onChange={(e) => {
                    const tecnology = e.target.value
                      .split(',')
                      .map((tech) => tech.trim());
                    setFormData((prev) => ({
                      ...prev,
                      technologies: tecnology,
                    }));
                  }}
                  className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200'
                  placeholder='React, Node.js, MongoDB'
                />
              </div>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Category
              </label>
              <select
                defaultValue={project.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200'
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
                Live URL
              </label>
              <div className='relative'>
                <LinkIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <input
                  type='url'
                  defaultValue={project.liveUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      liveUrl: e.target.value,
                    }))
                  }
                  className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200'
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
                  defaultValue={project.githubUrl}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      githubUrl: e.target.value,
                    }))
                  }
                  className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200'
                  placeholder='https://github.com/username/repo'
                />
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Status
              </label>
              <select
                defaultValue={project.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as any,
                  }))
                }
                className='w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200'
              >
                <option value='completed'>Completed</option>
                <option value='in_progress'>In Progress</option>
                <option value='planned'>Planned</option>
              </select>
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Start Date
              </label>
              <div className='relative'>
                <Calendar className='absolute z-50 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <DatePicker
                  selected={
                    formData.startDate
                      ? new Date(formData.startDate)
                      : new Date(project.startDate as string)
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

            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                End Date
              </label>
              <div className='relative'>
                <Calendar className='absolute z-50 left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400' />
                <DatePicker
                  selected={
                    formData.endDate
                      ? new Date(formData.endDate)
                      : project?.endDate
                      ? new Date(project.endDate as string)
                      : null
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
                {/* <input
                  type='date'
                  defaultValue={project?.endDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      endDate: e.target.value,
                    }))
                  }
                  className='w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200'
                /> */}
              </div>
            </div>
          </div>

          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Project Thumbnail
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
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null;
                    setFormData((prev) => ({ ...prev, thumbnail: file }));
                  }}
                />
              </label>

              <div className='maxsm:mt-3 w-full md:w-1/2 lg:w-1/3'>
                {formData.thumbnail ? (
                  <Image
                    src={URL.createObjectURL(formData.thumbnail)}
                    alt='Thumbnail Preview'
                    width={200}
                    height={200}
                    className='w-100% h-auto md:h-auto object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'
                  />
                ) : (
                  <Image
                    src={project.thumbnail || ''}
                    alt='Thumbnail Preview'
                    width={200}
                    height={200}
                    className='w-100% h-auto md:h-auto object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm'
                  />
                )}
              </div>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700'>
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
              className='flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed'
            >
              <Save className='h-5 w-5' />
              <span>
                {isSubmitting ? (
                  <span className='flex items-center gap-2'>
                    <ImSpinner9 className='animate-spin h-5 w-5' />
                    <span>Updating...</span>
                  </span>
                ) : (
                  'Update Project'
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
