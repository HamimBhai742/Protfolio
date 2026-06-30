import Link from 'next/link';
import React from 'react';
import { BlogCard } from '../BlogsClient';
import { BlogPost } from '@/types/blog.types';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function BlogsSection({ blogs }: { blogs: BlogPost[] }) {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900'>
      <div className='max-w-7xl mx-auto'>
        <ScrollReveal direction="up" delay={100}>
          <div className='text-center mb-16'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Latest Blog Posts
            </h2>
            <p className='text-xl text-gray-600 dark:text-gray-300'>
              Thoughts, tutorials, and insights from my journey
            </p>
          </div>
        </ScrollReveal>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {(blogs || []).map((blog: BlogPost, index) => (
            <ScrollReveal direction="up" delay={150 + index * 100} key={blog.id}>
              <BlogCard blog={blog} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal direction="up" delay={450}>
          <div className='text-center'>
            <Link
              href='/blog'
              className='bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors hover:cursor-pointer'
            >
              Read All Posts
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
