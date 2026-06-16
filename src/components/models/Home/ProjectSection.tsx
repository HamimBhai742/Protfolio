/* eslint-disable react/no-unescaped-entities */
import { Project } from '@/types/project';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

export default function ProjectSection({ projects }: { projects: Project[] }) {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Latest Projects
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300'>
            Some of my recent work that I'm proud of
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {projects.map((project, index) => (
            <div
              key={index}
              className='bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow'
            >
              <div className='relative h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center'>
                <Image src={project.thumbnail} alt={project.title} fill />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                  {project.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-300 mb-4'>
                  {project.description.slice(0, 120)}
                </p>
                <div>
                  <span className='text-blue-600  dark:text-blue-400 font-semibold'>
                    Features:
                  </span>{' '}
                  <ul className='list-disc ml-8 mt-2 text-sm space-y-2'>
                    {project.features
                      .split(',')
                      .map((item) => item.trim())
                      .filter(Boolean)
                      .map((feature, index) => (
                        <li
                          key={index}
                          className='text-gray-600 list-disc  dark:text-gray-300'
                        >
                          {feature}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className='flex flex-wrap gap-2 my-4'>
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className='px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.status !== 'planned' && (
                  <div className='flex items-center gap-4 pl-3 mt-3'>
                    <Link
                      href={project?.liveUrl || '#'}
                      target='_blank'
                      className='text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors'
                      title='Live Demo'
                    >
                      <FiExternalLink className='w-5 h-5' />
                    </Link>
                    <Link
                      href={project?.githubUrl || '#'}
                      target='_blank'
                      className='text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors'
                      title='GitHub Repository'
                    >
                      <FiGithub className='w-5 h-5' />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className='text-center'>
          <Link
            href='/projects'
            className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
