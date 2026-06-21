import ProjectsClient from '@/components/models/ProjectsClient/ProjectsClient';
import { dbConnect } from '@/lib/db';
import { Project } from '@/models/Project';

export const metadata = {
  title: 'Projects',
  description: 'Showcasing personal and professional projects built with React, Next.js, Node.js, and modern web technologies. Explore features, live demos, and source code.',
};

export const dynamic = 'force-dynamic';

const ProjectsPage = async () => {
  await dbConnect();
  const projects = await Project.find({}).sort({ createdAt: -1 });

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:p-8'>
        <ProjectsClient projects={JSON.parse(JSON.stringify(projects))} />
      </div>
    </div>
  );
};

export default ProjectsPage;
