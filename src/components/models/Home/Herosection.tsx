/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';
import Typewriter from '@/components/ui/typewriter';
import { User } from '@/types/user';
import Image from 'next/image';
import { snakeToProfession } from '@/helpers/sanakeToProfe';
import { Profession } from '@/types/Profile.data';
export default function Herosection({ user }: { user: User }) {
    return (
    <section className='relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 max-lg:pt-20 lg:pt-16'>
      <div className='max-w-6xl w-full mx-auto flex max-lg:flex-col-reverse gap-6  justify-between items-center'>
        <div className='text-center lg:text-left'>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6'>
            Hi, I'm{' '}
            <span className='text-blue-600 dark:text-blue-400'>
              <Typewriter
                texts={[`${user.name} `]}
                speed={100}
                deleteSpeed={100}
                pauseTime={3000}
              />
            </span>
          </h1>
          <div className='h-16 mb-8'>
            <p className='text-xl sm:text-2xl text-gray-600 dark:text-gray-300 transition-all duration-500'>
              <Typewriter
                texts={[snakeToProfession(user.profession as Profession)]}
                speed={100}
                deleteSpeed={60}
                pauseTime={2000}
              />
            </p>
          </div>
          <p className='text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl'>
            Welcome to my personal portfolio website. Explore my projects,
            blogs, skills, and achievements in web development with React,
            Next.js, Node.js, and more.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
            <Link
              href='/projects'
              className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors'
            >
              View My Work
            </Link>
            <Link
              href='/about'
              className='border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-8 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'
            >
              Get In Touch
            </Link>
          </div>
        </div>
        <div className='flex justify-center lg:justify-end'>
          <div className='relative w-80 h-80 rounded-full overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300'>
            <Image
              src={user?.picture || '/placeholder.jpg'}
              className='w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold'
              alt={user.name}
              fill
            />
          </div>
        </div>
      </div>
    </section>
  );
}
