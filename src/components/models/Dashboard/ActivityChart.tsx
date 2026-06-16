import { DashboardStats } from '@/types/dashboard.types';

interface ActivityChartProps {
  stats: DashboardStats;
}

export default function ActivityChart({ stats }: ActivityChartProps) {
  const chartData = [
    {
      label: 'Blogs',
      total: stats.totalBlogs,
      recent: stats.lastWeekBlogs,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      label: 'Projects',
      total: stats.totalProjects,
      recent: stats.lastWeekProjects,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20'
    },
    {
      label: 'Views',
      total: Math.floor(stats.totalViews / 100),
      recent: Math.floor(stats.lastWeekViews / 10),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  const maxValue = Math.max(...chartData.map(item => item.total));

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-4 md:p-8 shadow-xl border-2 border-gray-100 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <h3 className="text-lg md:text-3xl font-bold text-gray-900 dark:text-white">Activity Overview</h3>
        <div className="flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full px-4 py-2 w-fit">
          <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Last 7 days</span>
        </div>
      </div>

      <div className="space-y-6 md:space-y-8">
        {chartData.map((item, index) => (
          <div key={index} className={`${item.bgColor} rounded-2xl p-4 md:p-6 border-2 border-opacity-20 w-full`}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
              <div className="flex items-center space-x-4">
                <div className={`w-6 h-6 bg-gradient-to-r ${item.color} rounded-full shadow-lg flex-shrink-0`}></div>
                <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{item.label}</span>
              </div>
              <div className="flex items-center space-x-4 md:space-x-8">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">This week</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{item.recent}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">{item.total}</p>
                </div>
              </div>
            </div>

            <div className="relative w-full">
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden shadow-inner">
                <div
                  className={`h-full bg-gradient-to-r ${item.color} transition-all duration-1000 ease-out rounded-full relative shadow-lg`}
                  style={{ width: `${(item.total / maxValue) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>

              <div className="absolute top-0 h-4 flex items-center" style={{ left: `${Math.min((item.recent / maxValue) * 100, 95)}%` }}>
                <div className="w-2 h-8 bg-white dark:bg-gray-900 rounded-full shadow-xl border-2 border-gray-300 dark:border-gray-600 -translate-x-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
