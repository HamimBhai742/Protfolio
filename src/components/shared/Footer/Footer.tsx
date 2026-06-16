import { getMe } from '@/helpers/getMe';
import Link from 'next/link';

const Footer = async () => {
  const me = await getMe();
  return (
    <footer className='bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {/* Brand Section */}
          <div className='lg:col-span-2'>
            <h3 className='text-2xl font-bold text-gray-900 dark:text-white mb-4'>
              {me.name}
            </h3>
            <p className='text-gray-600 dark:text-gray-300 mb-6 max-w-md'>
              Full-stack developer passionate about creating innovative
              solutions and beautiful user experiences.
            </p>

            {/* Social Links */}
            <div className='flex space-x-4'>
              <a
                href={me.facebookUrl}
                target='_blank'
                className='text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M22.675 0h-21.35C.597 0 0 .598 0 1.333v21.333C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.098 2.795.142v3.24h-1.918c-1.505 0-1.797.715-1.797 1.763v2.312h3.588l-.467 3.622h-3.121V24h6.116C23.403 24 24 23.403 24 22.667V1.333C24 .598 23.403 0 22.675 0z' />
                </svg>
              </a>
              <a
                href={me?.linkedInUrl}
                target='_blank'
                className='text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' />
                </svg>
              </a>
              <a
                href={me?.githubUrl}
                target='_blank'
                className='text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors'
              >
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Quick Links
            </h4>
            <ul className='space-y-2'>
              <li>
                <Link
                  href='/about'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors'
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href='projects'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors'
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href='/blog'
                  className='text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors'
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold text-gray-900 dark:text-white mb-4'>
              Contact
            </h4>
            <div className='space-y-2'>
              <p className='text-gray-600 dark:text-gray-300 flex items-center'>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                  <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
                </svg>
                {me.email}
              </p>
              <p className='text-gray-600 dark:text-gray-300 flex items-center'>
                <svg
                  className='w-4 h-4 mr-2'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                    clipRule='evenodd'
                  />
                </svg>
                {me.address}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='text-gray-600 dark:text-gray-300 text-sm'>
              © 2024 {me.name} . All rights reserved.
            </p>
            <div className='flex space-x-6 mt-4 md:mt-0'>
              <Link
                href='#'
                className='text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors'
              >
                Privacy Policy
              </Link>
              <Link
                href='#'
                className='text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 text-sm transition-colors'
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
