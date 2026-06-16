import Sidebar from "@/components/shared/Sidebar/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 lg:ml-0 overflow-auto">
        <div className="p-6 lg:p-8 pt-20 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
