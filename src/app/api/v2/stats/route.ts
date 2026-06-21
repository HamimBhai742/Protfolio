import { NextResponse } from 'next/server';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';
import { Project } from '@/models/Project';
import httpStatusCode from 'http-status-codes';

export async function GET() {
  try {
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

    return NextResponse.json({
      success: true,
      statusCode: httpStatusCode.OK,
      message: 'Stats fetched successfully',
      data: {
        stats: {
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
        },
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Fetch stats error:', err);
    return NextResponse.json(
      { success: false, message: err.message || 'Something went wrong' },
      { status: httpStatusCode.INTERNAL_SERVER_ERROR }
    );
  }
}
