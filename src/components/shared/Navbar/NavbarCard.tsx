'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '@/components/toggle/ThemeToggleBtn';
import { verifyUser } from '@/helpers/verifyUser';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { logout } from '@/helpers/logout';
import { LayoutDashboard, LogOut, Menu as MenuIcon, X, Send } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
];

const NavbarCard = ({ me }: { me: { name: string; picture: string; email?: string } }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState({ success: false });
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => pathname === href;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const me = await verifyUser();
        setUser(me);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [setUser]);

  const handelSignOutBtn = async () => {
    try {
      const data = await logout();
      if (data?.success) {
        toast.success(data?.message);
        router.replace('/');
        setUser({ success: false });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'py-3 bg-white/10 dark:bg-gray-950/10' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div
          className={`px-6 h-18 rounded-2xl flex items-center justify-between transition-all duration-500 ${
            isScrolled
              ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)] border border-gray-200/40 dark:border-gray-800/40'
              : 'bg-transparent border border-transparent'
          }`}
        >
          {/* Logo/Brand */}
          <Link href='/' className='flex items-center space-x-3 group'>
            <div className='relative w-10 h-10 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-500/10 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden'>
              <div className='absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              <span className='text-white font-extrabold text-lg tracking-wider group-hover:scale-110 transition-transform duration-300'>
                {me?.name?.charAt(0).toUpperCase() || 'H'}
              </span>
            </div>
            <span className='text-xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 dark:from-white dark:via-gray-100 dark:to-gray-200 bg-clip-text text-transparent group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:dark:from-blue-400 group-hover:dark:to-indigo-400 transition-all duration-300'>
              {me?.name || 'Hamim'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden md:flex items-center space-x-1 bg-gray-105/40 dark:bg-gray-900/20 p-1.5 rounded-full border border-gray-200/10 dark:border-gray-800/10'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 group ${
                  isActive(link.href)
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/15 scale-102 animate-glow-pulse'
                    : 'text-gray-650 dark:text-gray-350 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                <span className='relative z-10'>{link.label}</span>
                {!isActive(link.href) && (
                  <span className='absolute bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-300 group-hover:w-1/2 rounded-full' />
                )}
              </Link>
            ))}
          </div>

          {/* Action Buttons / User Menu */}
          <div className='hidden md:flex items-center space-x-4'>
            <div className='hover:scale-105 transition-transform duration-205'>
              <ThemeToggle />
            </div>

            {/* Contact Me Button */}
            <Link
              href='/#contact'
              className='relative group overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-full font-bold shadow-md shadow-blue-500/10 hover:shadow-xl hover:shadow-purple-500/20 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2'
            >
              <span className='absolute inset-0 w-full h-full bg-white/10 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out' />
              <span className='relative z-10 text-sm'>Contact Me</span>
              <Send className='w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
            </Link>

            {user?.success && (
              <Menu as='div' className='relative ml-1'>
                <MenuButton className='relative hover:cursor-pointer flex rounded-full ring-2 ring-transparent hover:ring-blue-500/40 focus:outline-none transition-all duration-300'>
                  <span className='sr-only'>Open user menu</span>
                  <Image
                    alt='Profile'
                    src={
                      me?.picture ||
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    }
                    width={40}
                    height={40}
                    className='size-10 rounded-full bg-gray-800 shadow-md border-2 border-white dark:border-gray-800'
                  />
                </MenuButton>

                <MenuItems
                  transition
                  className='absolute right-0 z-50 mt-3 w-56 origin-top-right rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl py-2 shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.35)] border border-gray-100 dark:border-gray-800/80 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in focus:outline-none'
                >
                  <div className='px-4 py-2.5 border-b border-gray-100 dark:border-gray-850 mb-1.5'>
                    <p className='text-[10px] text-gray-400 font-bold uppercase tracking-wider'>Logged in as</p>
                    <p className='text-sm font-bold text-gray-800 dark:text-gray-200 truncate'>{me?.name}</p>
                  </div>

                  <MenuItem>
                    <Link
                      href='/dashboard'
                      className='flex items-center px-4 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100/70 dark:hover:bg-gray-800/70 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl mx-1.5 transition-all'
                    >
                      <LayoutDashboard className='w-4.5 h-4.5 mr-3 text-gray-500 dark:text-gray-400' />
                      Dashboard
                    </Link>
                  </MenuItem>

                  <MenuItem>
                    <button
                      onClick={handelSignOutBtn}
                      className='w-full flex items-center px-4 py-2.5 text-sm font-semibold text-red-650 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl mx-1.5 transition-all text-left'
                    >
                      <LogOut className='w-4.5 h-4.5 mr-3 text-red-500 dark:text-red-400' />
                      Sign out
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            )}
          </div>

          {/* Mobile Menu Actions */}
          <div className='flex items-center md:hidden space-x-3'>
            <div className='hover:scale-105 transition-transform duration-200'>
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='p-2 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800/60 border border-transparent hover:border-gray-200/30 dark:hover:border-gray-700/30 transition-all duration-300'
            >
              {isOpen ? <X className='w-6 h-6' /> : <MenuIcon className='w-6 h-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'max-h-[500px] opacity-100 translate-y-0' 
              : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
          } overflow-hidden`}
        >
          <div className='py-4 space-y-2.5 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl mt-3 shadow-xl border border-gray-150 dark:border-gray-800/80 mx-1'>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block mx-3 px-4 py-2.5 text-base font-semibold rounded-xl transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md shadow-blue-500/15'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-100/60 dark:hover:bg-gray-800/60'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Actions Section */}
            <div className='mx-3 pt-3.5 border-t border-gray-100 dark:border-gray-800/80 space-y-2.5'>
              {user.success && (
                <div className='flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-850/40 rounded-xl border border-gray-100 dark:border-gray-800/40'>
                  <Image
                    alt='Profile'
                    src={
                      me?.picture ||
                      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                    }
                    width={44}
                    height={44}
                    className='size-11 rounded-full border border-gray-200 dark:border-gray-800'
                  />
                  <div className='flex-1 min-w-0'>
                    <p className='font-bold text-gray-900 dark:text-white truncate'>
                      {me?.name}
                    </p>
                    <div className='flex space-x-4 mt-1'>
                      <Link
                        href='/dashboard'
                        onClick={() => setIsOpen(false)}
                        className='text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center hover:underline'
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          setIsOpen(false);
                          handelSignOutBtn();
                        }}
                        className='text-xs font-bold text-red-500 dark:text-red-400 flex items-center hover:underline'
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Contact Me Button */}
              <Link
                href='/#contact'
                onClick={() => setIsOpen(false)}
                className='flex items-center justify-center gap-2 w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-md shadow-blue-500/10 active:scale-98 transition-transform'
              >
                <span>Contact Me</span>
                <Send className='w-4 h-4' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCard;
