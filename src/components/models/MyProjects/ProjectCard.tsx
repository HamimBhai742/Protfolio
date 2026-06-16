import {
  ExternalLink,
  Github,
  Calendar,
  Tag,
  Edit,
  Trash2,
} from 'lucide-react';
import { ProjectCardProps } from '@/types/projects.type';
import Image from 'next/image';
import { formatStatusLabel } from '@/helpers/status';

const ProjectCard = ({
  project,
  viewMode,
  handleEdit,
  handleDelete,
}: ProjectCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };
  return (
    <div
      key={project.id}
      className={`
              bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden group
              ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}
            `}
    >
      <div>
        <Image
          src={project.thumbnail || ''}
          alt={project.title}
          width={400}
          height={400}
          className={`${
            viewMode === 'list'
              ? 'md:h-full h-48 md:w-64 lg:w-80'
              : 'h-48 md:h-64'
          }`}
        />
      </div>

      <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className='flex items-start justify-between mb-3'>
          <div className='flex-1'>
            <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-1'>
              {project?.title}
            </h3>
            <div className='flex items-center space-x-2'>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                  project?.status
                )}`}
              >
                {project?.status?.replace('-', ' ')}
              </span>
              {project?.category && (
                <span className='px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium'>
                  {project?.category}
                </span>
              )}
            </div>
          </div>

          <div className='flex items-center space-x-1 ml-2'>
            <button
              onClick={() => handleEdit(project)}
              className='p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200'
              title='Edit Project'
            >
              <Edit className='h-4 w-4' />
            </button>
            <button
              onClick={() => handleDelete(project?.id)}
              className='p-2 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all duration-200'
              title='Delete Project'
            >
              <Trash2 className='h-4 w-4' />
            </button>
          </div>
        </div>

        <p className='text-gray-600 dark:text-gray-400 mb-4 line-clamp-3'>
          {project?.description}
        </p>

        <div className='flex flex-wrap gap-2 mb-4'>
          {project?.technologies?.map((tech, index) => (
            <span
              key={index}
              className='inline-flex items-center px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium'
            >
              <Tag className='h-3 w-3 mr-1' />
              {tech}
            </span>
          ))}
        </div>

        <div className='flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400'>
            <Calendar className='h-4 w-4 mr-1' />
            {new Date(project?.startDate).toLocaleDateString('en-GB')} -
            {project?.endDate ? (
              <>
                {' '}
                <Calendar className='h-4 w-4 mr-1' />
                {new Date(project?.endDate).toLocaleDateString('en-GB')}
              </>
            ) : (
              <span className=''>{formatStatusLabel(project?.status)}</span>
            )}
          </div>

          <div
            className={`flex items-center space-x-2 ${
              viewMode === 'list' ? 'max-sm:hidden' : 'hidden'
            }`}
          >
            {project?.liveUrl && (
              <a
                href={project?.liveUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200'
                title='View Live'
              >
                <ExternalLink className='h-4 w-4' />
              </a>
            )}
            {project?.githubUrl && (
              <a
                href={project?.githubUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='p-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200'
                title='View Code'
              >
                <Github className='h-4 w-4' />
              </a>
            )}
          </div>
        </div>
        <div
          className={`flex mt-3 items-center gap-4 ${
            viewMode === 'list' ? 'hidden' : ''
          }`}
        >
          {project?.liveUrl && (
            <a
              href={project?.liveUrl}
              target='_blank'
              rel='noopener noreferrer'
              className=' text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-all duration-200'
              title='View Live'
            >
              <ExternalLink className='h-5 w-5' />
            </a>
          )}
          {project?.githubUrl && (
            <a
              href={project?.githubUrl}
              target='_blank'
              rel='noopener noreferrer'
              className=' text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200'
              title='View Code'
            >
              <Github className='h-5 w-5' />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
