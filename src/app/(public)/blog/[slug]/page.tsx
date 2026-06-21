import { SingleBlogClient } from '@/components/models/BlogsClient/SingleBlogClient';
import { notFound } from 'next/navigation';
import { dbConnect } from '@/lib/db';
import { Blog } from '@/models/Blog';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const blogs = await Blog.find({ status: 'published' }).select('slug');
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.warn('Could not fetch static params for blogs during build:', error);
    return [];
  }
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    await dbConnect();
    const decodedSlug = decodeURIComponent(slug);
    
    // Atomically increment views and retrieve updated document
    const blog = await Blog.findOneAndUpdate(
      { slug: decodedSlug },
      { $inc: { views: 1 } },
      { new: true }
    );

    if (!blog) {
      notFound();
    }
    
    return <SingleBlogClient blog={JSON.parse(JSON.stringify(blog))} />;
  } catch (error) {
    console.error(`Error loading blog page for slug ${slug}:`, error);
    notFound();
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    await dbConnect();
    const decodedSlug = decodeURIComponent(slug);
    const blog = await Blog.findOne({ slug: decodedSlug }).select('title description thumbnail');
    if (!blog) {
      return { title: 'Blog Not Found' };
    }
    return {
      title: blog.title,
      description: blog.description,
      openGraph: {
        title: blog.title,
        description: blog.description,
        images: [blog.thumbnail],
      },
    };
  } catch (error) {
    return { title: 'Blog' };
  }
}
