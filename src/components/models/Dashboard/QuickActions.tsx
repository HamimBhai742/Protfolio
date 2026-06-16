import Link from 'next/link';
import { Plus, Edit, Eye, Settings } from 'lucide-react';

export default function QuickActions() {
  const actions = [
    {
      title: 'Create New Blog',
      description: 'Write and publish a new blog post',
      href: '/dashboard/create-blog',
      icon: Plus,
      gradient: 'from-blue-500 to-blue-600',
      bgGradient:
        'from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20',
    },
    {
      title: 'Manage Blogs',
      description: 'Edit or delete existing blog posts',
      href: '/dashboard/my-blogs',
      icon: Edit,
      gradient: 'from-emerald-500 to-emerald-600',
      bgGradient:
        'from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20',
    },
    {
      title: 'View Projects',
      description: 'Manage your project portfolio',
      href: '/dashboard/my-projects',
      icon: Eye,
      gradient: 'from-purple-500 to-purple-600',
      bgGradient:
        'from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20',
    },
    {
      title: 'Profile Settings',
      description: 'Update your profile information',
      href: '/dashboard/profile',
      icon: Settings,
      gradient: 'from-orange-500 to-orange-600',
      bgGradient:
        'from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20',
    },
  ];

  return (
    <div className='mt-12'>
      <div className='flex items-center max-sm:flex-col justify-between mb-8'>
        <h2 className='text-2xl font-bold text-gray-900 dark:text-white'>
          Quick Actions
        </h2>
        <div className='text-sm text-gray-500 dark:text-gray-400'>
          Choose an action to get started
        </div>
      </div>

      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className='group relative overflow-hidden bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/50 dark:border-gray-700/50 hover:scale-105'
          >
            {/* Background gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${action.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            ></div>

            {/* Glow effect */}
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${action.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}
            ></div>

            <div className='relative'>
              <div className='flex items-center justify-between mb-4'>
                <div
                  className={`p-3 bg-gradient-to-r ${action.gradient} rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <action.icon className='w-6 h-6 text-white' />
                </div>
              </div>

              <div>
                <h3 className='md:font-bold font-medium text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-100 transition-colors mb-2'>
                  {action.title}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors'>
                  {action.description}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
