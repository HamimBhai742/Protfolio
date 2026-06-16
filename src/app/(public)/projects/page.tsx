import ProjectsClient from '@/components/models/ProjectsClient/ProjectsClient';

export const metadata = {
  title: 'Projects',
  description: 'Showcasing personal and professional projects built with React, Next.js, Node.js, and modern web technologies. Explore features, live demos, and source code.',
}

const ProjectsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    next: { revalidate: 30 },
  });
  const data = await res.json();
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:p-8'>
        <ProjectsClient projects={data?.data} />
      </div>
    </div>
  );
};

export default ProjectsPage;
