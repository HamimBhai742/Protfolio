import LoginForm from '@/components/models/Login/LoginForm';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login to your account',
};
export default function LoginPage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        {/* Header */}
        <div className='text-center'>
          <Link
            href='/'
            className='inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6'
          >
            <svg
              className='w-5 h-5 mr-2'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Back to Home
          </Link>
          <h2 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Welcome Back
          </h2>
          <p className='mt-2 text-gray-600 dark:text-gray-300'>
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form Component */}
        <LoginForm />
      </div>
    </div>
  );
}
