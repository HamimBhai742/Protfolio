import Herosection from '@/components/models/Home/Herosection';
import AboutSection from '@/components/models/Home/AboutSection';
import ProjectSection from '@/components/models/Home/ProjectSection';
import BlogsSection from '@/components/models/Home/BlogsSection';
import { dbConnect } from '@/lib/db';
import { User } from '@/models/User';
import { Blog } from '@/models/Blog';
import { Project } from '@/models/Project';

export const metadata = {
  title: 'Hamim | Portfolio & Projects',
  description:
    'Welcome to my personal portfolio website. Explore my projects, blogs, skills, and achievements in web development with React, Next.js, Node.js, and more.',
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  await dbConnect();

  // Query User details
  const user = await User.findOne().select(
    'id name email address picture profession experience skills bio role githubUrl facebookUrl linkedInUrl website createdAt updatedAt'
  );

  // Query Blogs
  const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });

  // Query Projects
  const projects = await Project.find({});

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50  to-blue-50 dark:from-gray-900 dark:to-gray-800'>
      {/* Hero Section */}
      <Herosection user={user ? JSON.parse(JSON.stringify(user)) : null} />

      {/* About Preview Section */}
      <AboutSection user={user ? JSON.parse(JSON.stringify(user)) : null} />

      {/* Featured Projects Section */}
      <ProjectSection projects={JSON.parse(JSON.stringify(projects.slice(0, 3)))} />

      {/* Latest Blog Posts Section */}
      <BlogsSection blogs={JSON.parse(JSON.stringify(blogs.slice(0, 3)))} />
    </div>
  );
}
