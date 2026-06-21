import DashboardOverview from '@/components/models/Dashboard/DashboardOverview';
import QuickActions from '@/components/models/Dashboard/QuickActions';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { Project } from '@/models/Project';
import { Message } from '@/models/Message';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  await dbConnect();

  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);

  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  // Blog statistics aggregation
  const blogStats = await Blog.aggregate([
    {
      $group: {
        _id: null,
        totalBlogs: { $sum: 1 },
        totalViews: { $sum: '$views' },
        avgViews: { $avg: '$views' },
        maxViews: { $max: '$views' },
        minViews: { $min: '$views' },
      },
    },
  ]);

  const blogStat = blogStats[0] || {
    totalBlogs: 0,
    totalViews: 0,
    avgViews: 0,
    maxViews: 0,
    minViews: 0,
  };

  const lastWeekBlogs = await Blog.countDocuments({ createdAt: { $gte: lastWeek } });
  const lastMonthBlogs = await Blog.countDocuments({ createdAt: { $gte: lastMonth } });

  // Aggregate last week views
  const lastWeekViewsRes = await Blog.aggregate([
    { $match: { createdAt: { $gte: lastWeek } } },
    { $group: { _id: null, sum: { $sum: '$views' } } },
  ]);
  const lastWeekViews = lastWeekViewsRes[0]?.sum || 0;

  // Aggregate last month views
  const lastMonthViewsRes = await Blog.aggregate([
    { $match: { createdAt: { $gte: lastMonth } } },
    { $group: { _id: null, sum: { $sum: '$views' } } },
  ]);
  const lastMonthViews = lastMonthViewsRes[0]?.sum || 0;

  // Project counts
  const totalProjects = await Project.countDocuments({});
  const lastWeekProjects = await Project.countDocuments({ createdAt: { $gte: lastWeek } });
  const lastMonthProjects = await Project.countDocuments({ createdAt: { $gte: lastMonth } });

  const totalCompletedProjects = await Project.countDocuments({ status: 'completed' });
  const totalInProgressProjects = await Project.countDocuments({ status: 'in_progress' });
  const totalPlannedProjects = await Project.countDocuments({ status: 'planned' });

  const totalPublishedBlogs = await Blog.countDocuments({ status: 'published' });
  const totalDraftBlogs = await Blog.countDocuments({ status: 'draft' });

  // Fetch Message statistics
  const totalMessages = await Message.countDocuments({});
  const unreadMessages = await Message.countDocuments({ isRead: false });

  const stats = {
    totalBlogs: blogStat.totalBlogs,
    totalPublishedBlogs,
    totalDraftBlogs,
    lastWeekBlogs,
    lastMonthBlogs,
    totalViews: blogStat.totalViews,
    avgViews: blogStat.avgViews,
    maxViews: blogStat.maxViews,
    minViews: blogStat.minViews,
    lastWeekViews,
    lastMonthViews,
    totalProjects,
    lastWeekProjects,
    lastMonthProjects,
    totalCompletedProjects,
    totalCompltedProjects: totalCompletedProjects,
    totalInProgressProjects,
    totalPlannedProjects,
    totalMessages,
    unreadMessages,
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 md:p-4'>
      <div className='max-w-7xl mx-auto'>
        <DashboardOverview stats={stats} />
        <QuickActions />
      </div>
    </div>
  );
}
