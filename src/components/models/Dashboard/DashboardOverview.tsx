/* eslint-disable react/no-unescaped-entities */
import { DashboardStats } from '@/types/dashboard.types';
import StatsCard from './StatsCard';
import ActivityChart from './ActivityChart';
import { Eye, FileText, FolderOpen, Sparkles } from 'lucide-react';
interface DashboardOverviewProps {
  stats: DashboardStats;
}

export default function DashboardOverview({ stats }: DashboardOverviewProps) {
  const blogStats = [
    {
      title: 'Total Blogs',
      value: stats.totalBlogs,
      icon: 'FileText',
      color: 'bg-blue-500',
    },
    {
      title: 'Published Blogs',
      value: stats.totalPublishedBlogs,
      icon: 'CheckCircle',
      color: 'bg-green-500',
    },
    {
      title: 'Draft Blogs',
      value: stats.totalDraftBlogs,
      icon: 'Edit3',
      color: 'bg-yellow-500',
    },
    {
      title: 'This Week Blogs',
      value: stats.lastWeekBlogs,
      icon: 'Calendar',
      color: 'bg-purple-500',
    },
  ];

  const viewStats = [
    {
      title: 'Total Views',
      value: stats.totalViews,

      icon: 'Eye',
      color: 'bg-indigo-500',
    },
    {
      title: 'Max Views',
      value: stats.maxViews,
      icon: 'TrendingUp',
      color: 'bg-cyan-500',
    },
    {
      title: 'Min Views',
      value: stats.minViews,
      icon: 'TrendingDown',
      color: 'bg-pink-500',
    },
    {
      title: 'This Week Views',
      value: stats.lastWeekViews,
      icon: 'BarChart3',
      color: 'bg-emerald-500',
    },
    {
      title: 'This Month Views',
      value: stats.lastMonthViews,
      icon: 'Calendar',
      color: 'bg-purple-500',
    },
  ];

  const projectStats = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: 'FolderOpen',
      color: 'bg-orange-500',
    },
    {
      title: 'Completed Projects',
      value: stats.totalCompltedProjects,
      icon: 'CheckCircle',
      color: 'bg-green-500',
    },
    {
      title: 'In Progress Projects',
      value: stats.totalInProgressProjects,
      icon: 'Clock',
      color: 'bg-blue-500',
    },
    {
      title: 'Planned Projects',
      value: stats.totalPlannedProjects,
      icon: 'Calendar',
      color: 'bg-purple-500',
    },
    {
      title: 'This Week Projects',
      value: stats.lastWeekProjects,
      icon: 'Plus',
      color: 'bg-teal-500',
    },
    {
      title: 'This Month Projects',
      value: stats.lastMonthProjects,
      icon: 'Folder',
      color: 'bg-red-500',
    },
  ];



  return (
    <div className='space-y-8'>
      {/* Beautiful Header */}
      <div className='relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 shadow-2xl mb-8'>
        <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20'></div>
        <div className='absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-48 translate-x-48 blur-3xl'></div>
        <div className='absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-32 -translate-x-32 blur-2xl'></div>

        <div className='relative text-white'>
          <div className='flex items-center space-x-4 mb-4'>
            <div className='p-3 bg-white/20 rounded-2xl backdrop-blur-sm'>
              <Sparkles className='md:w-8 md:h-8 w-4 h-4 text-white' />
            </div>
            <h1 className='md:text-5xl text-2xl font-bold'>Dashboard</h1>
          </div>
          <p className='md:text-xl text-sm text-white/90 max-w-2xl mb-6'>
            Welcome back! Here's your content performance overview with
            beautiful insights.
          </p>
          <div className='flex items-center space-x-3'>
            <div className='flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2'>
              <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
              <span className='text-sm font-medium'>
                Live Data • {new Date().toLocaleTimeString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Blog Statistics */}
      <div className='space-y-6'>
        <div className='flex items-center space-x-3'>
          <div className='p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl shadow-lg'>
            <FileText className='w-6 h-6 text-white' />
          </div>
          <h2 className='sm:text-3xl text-2xl font-bold text-gray-900 dark:text-white'>
            Blog Analytics
          </h2>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
          {blogStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Views Statistics */}
      <div className='space-y-6'>
        <div className='flex items-center space-x-3'>
          <div className='p-3 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-2xl shadow-lg'>
            <Eye className='w-6 h-6 text-white' />
          </div>
          <h2 className='sm:text-3xl text-2xl font-bold text-gray-900 dark:text-white'>
            Views Analytics
          </h2>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-6'>
          {viewStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Project Statistics */}
      <div className='space-y-6'>
        <div className='flex items-center space-x-3'>
          <div className='p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl shadow-lg'>
            <FolderOpen className='w-6 h-6 text-white' />
          </div>
          <h2 className='sm:text-3xl text-2xl font-bold text-gray-900 dark:text-white'>
            Project Analytics
          </h2>
        </div>
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-6'>
          {projectStats.map((stat, index) => (
            <StatsCard key={index} stat={stat} />
          ))}
        </div>
      </div>

      {/* Activity Chart */}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
        <div className='lg:col-span-2'>
          <ActivityChart stats={stats} />
        </div>
        <div className='bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-3xl p-8 shadow-xl border-2 border-blue-100 dark:border-blue-800/30'>
          <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center'>
            <div className='w-3 h-3 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mr-3 animate-pulse'></div>
            Recent Activity
          </h3>
          <div className='space-y-6'>
            <div className='flex items-center space-x-4 p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl border-2 border-blue-200 dark:border-blue-800'>
              <div className='w-4 h-4 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg'></div>
              <div>
                <p className='text-xl font-bold text-gray-900 dark:text-white'>
                  {stats.lastWeekBlogs}
                </p>
                <p className='text-sm font-semibold text-blue-700 dark:text-blue-300'>
                  New blogs this week
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-4 p-4 bg-green-100 dark:bg-green-900/30 rounded-2xl border-2 border-green-200 dark:border-green-800'>
              <div className='w-4 h-4 bg-gradient-to-r from-green-400 to-green-600 rounded-full shadow-lg'></div>
              <div>
                <p className='text-xl font-bold text-gray-900 dark:text-white'>
                  {stats.lastWeekProjects}
                </p>
                <p className='text-sm font-semibold text-green-700 dark:text-green-300'>
                  New projects this week
                </p>
              </div>
            </div>
            <div className='flex items-center space-x-4 p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl border-2 border-purple-200 dark:border-purple-800'>
              <div className='w-4 h-4 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full shadow-lg'></div>
              <div>
                <p className='text-xl font-bold text-gray-900 dark:text-white'>
                  {(stats.lastWeekViews ?? 0).toLocaleString()}
                </p>
                <p className='text-sm font-semibold text-purple-700 dark:text-purple-300'>
                  Views this week
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
