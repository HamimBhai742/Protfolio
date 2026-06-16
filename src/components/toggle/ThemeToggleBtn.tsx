'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='w-14 h-[30px] rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse border border-gray-200/50 dark:border-gray-800' />
    );
  }

  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='relative flex items-center justify-between w-14 h-[30px] rounded-full p-1 cursor-pointer bg-gray-250 dark:bg-gray-950 border border-gray-250/50 dark:border-gray-850/80 transition-all duration-300 hover:border-blue-500/40 focus:outline-none select-none shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.4)]'
      aria-label='Toggle theme'
    >
      {/* Sliding thumb */}
      <div
        className={`absolute top-[2px] left-[2px] w-[24px] h-[24px] rounded-full bg-white dark:bg-gradient-to-br dark:from-blue-600 dark:to-indigo-600 shadow-[0_2px_5px_rgba(0,0,0,0.15)] dark:shadow-[0_2px_5px_rgba(0,0,0,0.45)] transform transition-transform duration-300 ease-out flex items-center justify-center ${
          isDark ? 'translate-x-[26px]' : 'translate-x-0'
        }`}
      >
        {isDark ? (
          <Moon className='w-3.5 h-3.5 text-white transition-transform duration-300 rotate-12' />
        ) : (
          <Sun className='w-3.5 h-3.5 text-yellow-500 transition-transform duration-300 rotate-0' />
        )}
      </div>

      {/* Sun/Moon icons on background */}
      <Sun className={`w-3.5 h-3.5 ml-1 transition-opacity duration-300 ${isDark ? 'text-gray-400 dark:text-gray-600 opacity-20' : 'text-yellow-500 opacity-100'}`} />
      <Moon className={`w-3.5 h-3.5 mr-1 transition-opacity duration-300 ${isDark ? 'text-blue-400 opacity-100' : 'text-gray-400 opacity-20'}`} />
    </button>
  );
}
