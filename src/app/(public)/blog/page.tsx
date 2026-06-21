import BlogsClient from '@/components/models/BlogsClient/BlogsClient';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';

export const metadata = {
  title: 'Blogs',
  description: 'Explore insightful blogs covering web development, React, Next.js, JavaScript, and more. Stay updated with tutorials, tips, and practical coding guides.',
};

export const dynamic = 'force-dynamic';

const BlogsPage = async () => {
  await dbConnect();
  const blogs = await Blog.find({ status: 'published' }).sort({ createdAt: -1 });

  return (
    <div>
      <BlogsClient blogs={JSON.parse(JSON.stringify(blogs))} />
    </div>
  );
};

export default BlogsPage;
