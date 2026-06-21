import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiExternalLink, FiGithub, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { formatStatusLabel } from '@/helpers/status';

export default function ProjectSection({ projects }: { projects: Project[] }) {
  const statusColors = {
    completed: 'bg-green-600 dark:bg-green-500 text-white',
    in_progress: 'bg-yellow-600 dark:bg-yellow-500 text-white',
    planned: 'bg-blue-600 dark:bg-blue-500 text-white',
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
    });
  };

  return (
    <section className='py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-950 border-t border-gray-200/50 dark:border-gray-900/50'>
      <div className='max-w-7xl mx-auto'>
        
        {/* Header */}
        <div className='text-center mb-16 space-y-3'>
          <h2 className='text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight'>
            Latest Projects
          </h2>
          <div className='w-16 h-1 bg-blue-600 dark:bg-blue-500 mx-auto rounded-full' />
          <p className='text-lg text-gray-650 dark:text-gray-400 max-w-xl mx-auto pt-1'>
            Explore some of my recent work, showcase projects, and open-source contributions
          </p>
        </div>

        {/* Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {(projects || []).slice(0, 3).map((project, index) => {
            const features = project?.features
              ? project.features.split(',').map((item) => item.trim()).filter(Boolean)
              : [];

            const categoryName = project?.category
              ? project.category.charAt(0).toUpperCase() + project.category.slice(1)
              : '';

            return (
              <div
                key={project?.id || index}
                className='group relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200/50 dark:border-gray-800/80 shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col h-full'
              >
                {/* Thumbnail Header */}
                <div className='relative h-52 w-full overflow-hidden bg-gradient-to-br from-blue-400/20 to-purple-500/20 shrink-0 border-b border-gray-100 dark:border-gray-800/50'>
                  {project?.thumbnail && (
                    <Image
                      src={project.thumbnail}
                      alt={project?.title || 'Project Thumbnail'}
                      fill
                      className='object-cover group-hover:scale-103 transition-transform duration-500'
                    />
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-gray-950/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300' />
                  
                  {/* Category Overlays */}
                  {project?.category && (
                    <span className='absolute top-4 left-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md text-gray-800 dark:text-gray-200 text-[10px] font-bold px-3 py-1 rounded-xl uppercase tracking-wider shadow border border-white/20 dark:border-gray-800/50'>
                      {categoryName}
                    </span>
                  )}
                  
                  {project?.status && (
                    <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-1 rounded-xl uppercase tracking-wider shadow-sm ${statusColors[project.status as 'completed' | 'in_progress' | 'planned'] || 'bg-gray-500 text-white'}`}>
                      {formatStatusLabel(project.status)}
                    </span>
                  )}
                </div>

                {/* Card Body */}
                <div className='p-6 flex flex-col flex-1 space-y-4'>
                  {/* Meta Dates */}
                  <div className='flex items-center gap-1.5 text-xs font-semibold text-gray-450 dark:text-gray-500'>
                    <FiCalendar className='w-3.5 h-3.5 shrink-0' />
                    <span>
                      {formatDate(project?.startDate)} - {project?.endDate ? formatDate(project.endDate) : 'Present'}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div className='space-y-2'>
                    <h3 className='text-xl font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors'>
                      {project?.title}
                    </h3>
                    <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2 h-10'>
                      {project?.description}
                    </p>
                  </div>

                  {/* Core Features */}
                  {features.length > 0 && (
                    <div className='space-y-1.5 flex-1'>
                      <span className='text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider'>
                        Key Features
                      </span>
                      <ul className='space-y-1.5'>
                        {features.slice(0, 2).map((feature, idx) => (
                          <li key={idx} className='flex items-start gap-2 text-xs text-gray-600 dark:text-gray-350'>
                            <FiCheckCircle className='w-3.5 h-3.5 mt-0.5 text-blue-600 dark:text-blue-400 shrink-0' />
                            <span className='line-clamp-1'>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Tech stack tags */}
                  {project?.technologies && project.technologies.length > 0 && (
                    <div className='flex flex-wrap gap-1.5 pt-2'>
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className='px-2.5 py-1 bg-blue-50/50 dark:bg-blue-950/20 text-blue-700 dark:text-blue-400 text-[10px] font-bold rounded-lg border border-blue-100/50 dark:border-blue-900/20'
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className='px-2.5 py-1 bg-gray-50 dark:bg-gray-800 text-gray-450 dark:text-gray-500 text-[10px] font-bold rounded-lg border border-gray-150 dark:border-gray-700/50'>
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800/80 mt-auto'>
                    <Link
                      href={`/projects/${project?.id}`}
                      className='text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-750 dark:hover:text-blue-300 transition-colors inline-flex items-center gap-1 group/btn'
                    >
                      View details <span className='transform group-hover/btn:translate-x-0.5 transition-transform'>→</span>
                    </Link>

                    {project?.status !== 'planned' && (
                      <div className='flex items-center gap-3'>
                        {project?.liveUrl && (
                          <Link
                            href={project.liveUrl}
                            target='_blank'
                            className='text-gray-450 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors'
                            title='Live Demo'
                          >
                            <FiExternalLink className='w-4.5 h-4.5' />
                          </Link>
                        )}
                        {project?.githubUrl && (
                          <Link
                            href={project.githubUrl}
                            target='_blank'
                            className='text-gray-450 hover:text-blue-600 dark:text-gray-500 dark:hover:text-blue-400 transition-colors'
                            title='GitHub Repository'
                          >
                            <FiGithub className='w-4.5 h-4.5' />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className='text-center'>
          <Link
            href='/projects'
            className='inline-flex items-center justify-center bg-blue-600 hover:bg-blue-750 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 font-bold text-sm hover:cursor-pointer'
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
