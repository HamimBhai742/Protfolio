'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  User,
  FolderOpen,
  BookOpen,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Book,
} from 'lucide-react';
import { ThemeToggle } from '@/components/toggle/ThemeToggleBtn';
import { getMe } from '@/helpers/getMe';
import Image from 'next/image';

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'My Projects', href: '/dashboard/my-projects', icon: FolderOpen },
  { name: 'Create Blog', href: '/dashboard/create-blog', icon: BookOpen },
  { name: 'My Blogs', href: '/dashboard/my-blogs', icon: Book },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [owner, setOwner] = useState({ name: '', picture: '', role: 'ADMIN' });
  const pathname = usePathname();
  const toggleSidebar = () => setIsOpen(!isOpen);

  useEffect(() => {
    const owner = async () => {
      const me = await getMe();
      setOwner(me);
    };
    owner();
  }, [setOwner]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className='lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700'
      >
        {isOpen ? (
          <X className='h-6 w-6 text-gray-600 dark:text-gray-300' />
        ) : (
          <Menu className='h-6 w-6 text-gray-600 dark:text-gray-300' />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40'
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-screen w-64
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          bg-gradient-to-b from-white to-gray-50
          dark:from-gray-900 dark:to-gray-800
          border-r border-gray-200 dark:border-gray-700
          shadow-xl lg:shadow-none
        `}
      >
        {/* Header */}
        <div className='p-6 border-b flex items-center justify-between border-gray-200 dark:border-gray-700'>
          <Link href='/' className='flex items-center space-x-3'>
            <div className='w-10 h-10  flex items-center justify-center'>
              <Image
                src={
                  owner?.picture ||
                  'https://res.cloudinary.com/dimczn2y6/image/upload/v1759461998/qfxitcnklyqaszpjta5y.jpg'
                }
                alt='Profile Picture'
                height={200}
                width={200}
                className='rounded-full'
              />
            </div>
            <div>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
                {owner.name}
              </h2>
              <p className='text-sm font-semibold text-gray-500 dark:text-gray-400'>
                {owner.role}
              </p>
            </div>
          </Link>
          <div>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation */}
        <nav className='flex-1 p-4 space-y-2'>
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50'
                  }
                `}
              >
                <Icon
                  className={`h-5 w-5 transition-colors ${
                    isActive
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                  }`}
                />
                <span className='font-medium'>{item.name}</span>
                {isActive ? (
                  <div className='ml-auto w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full' />
                ) : (
                  <ChevronRight className='h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className='p-4 border-t border-gray-200 dark:border-gray-700'>
          <button
            onClick={async () => {
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
                  {
                    method: 'POST',
                    credentials: 'include',
                  }
                );
                if (res.ok) {
                  window.location.href = '/login';
                }
              } catch (error) {
                console.error('Logout failed:', error);
              }
            }}
            className='flex items-center space-x-3 px-4 py-3 w-full rounded-lg text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200'
          >
            <LogOut className='h-5 w-5' />
            <span className='font-medium'>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
