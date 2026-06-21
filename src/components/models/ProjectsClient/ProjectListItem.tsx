import { formatStatusLabel } from '@/helpers/status';
import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';
import { FiExternalLink, FiGithub, FiCalendar, FiFolder, FiCheckCircle, FiClock } from 'react-icons/fi';

interface ProjectListItemProps {
  project: Project;
}

const ProjectListItem = ({ project }: ProjectListItemProps) => {
  const statusColors = {
    completed: 'bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-450 border border-green-200/50 dark:border-green-900/30',
    in_progress: 'bg-yellow-50 dark:bg-yellow-950/30 text-yellow-700 dark:text-yellow-450 border border-yellow-200/50 dark:border-yellow-900/30',
    planned: 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-450 border border-blue-200/50 dark:border-blue-900/30',
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const features = project?.features
    ? project.features.split(',').map((item) => item.trim()).filter(Boolean)
    : [];

  const categoryName = project?.category
    ? project.category.charAt(0).toUpperCase() + project.category.slice(1)
    : '';

  return (
    <div className='group bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl border border-gray-200/50 dark:border-gray-800/80 p-5 md:p-6 transition-all duration-300 hover:-translate-y-1'>
      <div className='flex flex-col lg:flex-row gap-6 lg:gap-8'>
        
        {/* Left: Thumbnail container */}
        <div className='relative max-lg:h-52 lg:w-80 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-400/20 to-purple-500/20 border border-gray-100 dark:border-gray-800/50'>
          {project?.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={project?.title || 'Project Thumbnail'}
              fill
              className='object-cover group-hover:scale-103 transition-transform duration-500'
            />
          )}
          <div className='absolute inset-0 bg-gradient-to-t from-gray-950/30 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
        </div>

        {/* Right: Content details */}
        <div className='flex-1 flex flex-col justify-between min-w-0 space-y-4'>
          <div className='space-y-3.5'>
            {/* Header info row */}
            <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3'>
              <div className='space-y-2'>
                <div className='flex flex-wrap items-center gap-3.5'>
                  <h3 className='text-2xl font-black tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                    {project?.title}
                  </h3>
                  
                  {/* Action links */}
                  {project?.status !== 'planned' && (
                    <div className='flex items-center gap-2.5 shrink-0'>
                      {project?.liveUrl && (
                        <Link
                          href={project.liveUrl}
                          target='_blank'
                          className='text-gray-450 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors'
                          title='Live Demo'
                        >
                          <FiExternalLink className='w-5 h-5' />
                        </Link>
                      )}
                      {project?.githubUrl && (
                        <Link
                          href={project.githubUrl}
                          target='_blank'
                          className='text-gray-450 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors'
                          title='GitHub Repository'
                        >
                          <FiGithub className='w-5 h-5' />
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                {/* Tags row */}
                <div className='flex flex-wrap items-center gap-2'>
                  <span className='inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 dark:bg-gray-800 text-gray-650 dark:text-gray-350 text-[10px] font-extrabold uppercase tracking-wider rounded-xl border border-gray-150 dark:border-gray-700/50 shadow-sm'>
                    <FiFolder className='w-3.5 h-3.5 text-gray-400' />
                    {categoryName}
                  </span>
                  
                  {project?.status && (
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-sm capitalize ${statusColors[project.status as 'completed' | 'in_progress' | 'planned'] || 'bg-gray-500 text-white'}`}>
                      <FiClock className='w-3.5 h-3.5' />
                      {formatStatusLabel(project.status)}
                    </span>
                  )}
                </div>
              </div>

              {/* Date Metadata */}
              <div className='text-xs font-semibold text-gray-450 dark:text-gray-550 flex items-center gap-1.5 shrink-0 sm:text-right sm:self-start'>
                <FiCalendar className='w-4 h-4' />
                <span>
                  {formatDate(project?.startDate)} - {project?.endDate ? formatDate(project.endDate) : 'Present'}
                </span>
              </div>
            </div>

            {/* Description */}
            <p className='text-gray-650 dark:text-gray-405 text-sm sm:text-base leading-relaxed line-clamp-2'>
              {project?.description}
            </p>

            {/* Core Features list */}
            {features.length > 0 && (
              <div className='space-y-1.5'>
                <h4 className='text-xs font-bold text-gray-400 dark:text-gray-550 uppercase tracking-wider'>
                  Key Features
                </h4>
                <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2 pl-1'>
                  {features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className='flex items-start gap-2 text-xs text-gray-600 dark:text-gray-350'>
                      <FiCheckCircle className='w-4 h-4 mt-0.5 text-blue-600 dark:text-blue-400 shrink-0' />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer element containing tech stack and dynamic details link */}
          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-auto'>
            {/* Tech Stack tags */}
            {project?.technologies && project.technologies.length > 0 && (
              <div className='flex flex-wrap gap-1.5'>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className='px-2.5 py-1 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded-lg border border-blue-100/50 dark:border-blue-900/20'
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Link to Full Project Detail Page */}
            <Link
              href={`/projects/${project?.id}`}
              className='inline-flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-750 dark:hover:text-blue-300 transition-colors self-end sm:self-center gap-1 group/btn'
            >
              View Full Details <span className='transform group-hover/btn:translate-x-0.5 transition-transform'>→</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectListItem;
