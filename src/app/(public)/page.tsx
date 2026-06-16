import Herosection from '@/components/models/Home/Herosection';
import AboutSection from '@/components/models/Home/AboutSection';
import ProjectSection from '@/components/models/Home/ProjectSection';
import BlogsSection from '@/components/models/Home/BlogsSection';

export const metadata = {
  title: 'Hamim | Portfolio & Projects',
  description:
    'Welcome to my personal portfolio website. Explore my projects, blogs, skills, and achievements in web development with React, Next.js, Node.js, and more.',
};

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    cache: 'no-store',
  });
  const { data: user } = await res.json();
  const res2 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
    cache: 'no-store',
  });
  const { data: blogs } = await res2.json();

  const res3 = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
    cache: 'no-store',
  });
  const { data: projects } = await res3.json();
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50  to-blue-50 dark:from-gray-900 dark:to-gray-800'>
      {/* Hero Section */}
      <Herosection user={user} />

      {/* About Preview Section */}
      <AboutSection user={user} />

      {/* Featured Projects Section */}
      <ProjectSection  projects={projects?.slice(0, 3)} />

      {/* Latest Blog Posts Section */}
      <BlogsSection blogs={blogs?.slice(0, 3)} />

    </div>
  );
}
