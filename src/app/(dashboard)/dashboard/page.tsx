import DashboardOverview from '@/components/models/Dashboard/DashboardOverview';
import QuickActions from '@/components/models/Dashboard/QuickActions';

export default async function Dashboard() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, {
    method: 'GET',
    cache: 'no-store',
  });
  const data = await res.json();
  console.log(data)
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 md:p-4'>
      <div className='max-w-7xl mx-auto'>
        <DashboardOverview stats={data?.data?.stats} />
        <QuickActions />
      </div>
    </div>
  );
}
