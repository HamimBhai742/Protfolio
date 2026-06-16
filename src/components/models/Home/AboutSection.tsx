/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import Typewriter from '@/components/ui/typewriter';
import { User } from '@/types/user';
export default function AboutSection({ user }: { user: User }) {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center space-y-8'>
          <div>
            <h2 className='text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6'>
              About <span className='text-blue-600 dark:text-blue-400'>Me</span>
            </h2>
            <div className='h-12 mb-6'>
              <span className='text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-300'>
                I'm Expert{' '}
                <Typewriter
                  texts={user.skills}
                  speed={100}
                  deleteSpeed={60}
                  pauseTime={2000}
                />{' '}
              </span>
            </div>
            <p className='text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto'>
              {user?.bio?.slice(0, 146)}...
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto'>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2'>
                {user?.projects?.length || 0} +
              </div>
              <div className='text-gray-600 dark:text-gray-300'>
                Projects Completed
              </div>
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow'>
              <div className='text-3xl font-bold text-green-600 dark:text-green-400 mb-2'>
                {user.experience} +
              </div>
              <div className='text-gray-600 dark:text-gray-300'>
                Years Experience
              </div>
            </div>
          </div>

          <Link
            href='/about'
            className='inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-lg hover:shadow-xl'
          >
            Learn More About Me
            <svg
              className='ml-2 w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
