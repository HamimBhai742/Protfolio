import BlogsClient from '@/components/models/BlogsClient/BlogsClient';

export const metadata = {
  title: 'Blogs',
  description: 'Explore insightful blogs covering web development, React, Next.js, JavaScript, and more. Stay updated with tutorials, tips, and practical coding guides.',
}

const BlogsPage = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`, {
    next: {
      revalidate: 30,
    },
  });
  const data = await res.json();
  return (
    <div>
      <BlogsClient blogs={data?.data} />
    </div>
  );
};

export default BlogsPage;
