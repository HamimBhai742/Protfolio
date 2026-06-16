export interface DashboardStats {
  avgViews: number;
  lastMonthBlogs: number;
  lastMonthProjects: number;
  lastMonthViews: number;
  lastWeekBlogs: number;
  lastWeekProjects: number;
  lastWeekViews: number;
  maxViews: number;
  minViews: number;
  totalBlogs: number;
  totalDraftBlogs: number;
  totalProjects: number;
  totalPublishedBlogs: number;
  totalViews: number;
  totalCompltedProjects: number;
  totalInProgressProjects: number;
  totalPlannedProjects: number;
}

export interface StatCard {
  title: string;
  value: number;
  icon: string;
  color: string;
}
