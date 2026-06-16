'use client';
import { LoginFormData } from '@/types/login.types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      const user = await res.json();
      if (!user?.success) {
        toast.error(user?.message);
      }
      if (user?.success) {
        router.push('/dashboard');
        toast.success(user?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        {/* Email Field */}
        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
          >
            Email Address
          </label>
          <input
            id='email'
            type='email'
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address',
              },
            })}
            onFocus={() => clearErrors('email')}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              errors.email
                ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                : 'border-gray-300 dark:border-gray-600'
            }`}
            placeholder='Enter your email address'
          />
          {errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'
          >
            Password
          </label>
          <div className='relative'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              onFocus={() => clearErrors('password')}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
                errors.password
                  ? 'border-red-300 bg-red-50 dark:bg-red-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder='Enter your password'
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && (
            <p className='mt-1 text-sm text-red-600'>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          disabled={isLoading}
          className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
        >
          {isLoading ? (
            <>
              <svg
                className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                ></circle>
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                ></path>
              </svg>
              Signing In...
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Social Login
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <span className="mr-2">🔍</span>
            Google
          </button>
          <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <span className="mr-2">📘</span>
            GitHub
          </button>
        </div>
      </div>

      Register Link
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors">
            Create one here
          </Link>
        </p>
      </div> */}
    </div>
  );
}
