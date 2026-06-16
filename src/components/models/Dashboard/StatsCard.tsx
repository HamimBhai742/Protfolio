/* eslint-disable @typescript-eslint/no-require-imports */
import { StatCard } from '@/types/dashboard.types';

interface StatsCardProps {
  stat: StatCard;
}

export default function StatsCard({ stat }: StatsCardProps) {
  const IconComponent = require('lucide-react')[stat.icon];

  // Get matching background color for card based on icon color
  const getCardBgColor = (iconColor: string) => {
    const colorMap: { [key: string]: string } = {
      'bg-blue-500':
        'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
      'bg-green-500':
        'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
      'bg-yellow-500':
        'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
      'bg-purple-500':
        'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
      'bg-indigo-500':
        'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800',
      'bg-cyan-500':
        'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800',
      'bg-pink-500':
        'bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800',
      'bg-emerald-500':
        'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800',
      'bg-orange-500':
        'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800',
      'bg-teal-500':
        'bg-teal-50 dark:bg-teal-900/20 border-teal-200 dark:border-teal-800',
      'bg-red-500':
        'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
    };
    return (
      colorMap[iconColor] ||
      'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
    );
  };

  return (
    <div
      className={`${getCardBgColor(
        stat.color
      )} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:-translate-y-2 hover:scale-105`}
    >
      <div className='flex items-center justify-between mb-4'>
        <div className={`p-4 rounded-2xl ${stat.color} shadow-lg`}>
          <IconComponent className='sm:w-10 sm:h-10 w-6 h-6 text-white' />
        </div>
      </div>

      <div>
        <p className='text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2'>
          {stat.title}
        </p>
        <p className='sm:text-4xl text-3xl font-bold text-gray-900 dark:text-white'>
          {stat?.value?.toLocaleString()}
        </p>
      </div>
    </div>
  );
}
