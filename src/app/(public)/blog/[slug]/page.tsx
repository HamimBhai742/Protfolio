import { SingleBlogClient } from '@/components/models/BlogsClient/SingleBlogClient';
import { BlogPost } from '@/types/blog.types';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
  const data = await res.json();
  return data?.data.map((blog: BlogPost) => ({
    slug: blog.slug,
  }));
}

export default async function SingleBlogPage({ params }: PageProps) {
  const { slug } =  params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`);
  const { data: blog } = await res.json();
  if (!blog) {
    notFound();
  }
  return <SingleBlogClient blog={blog} />;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps) {
  const { slug } =  params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${slug}`);
  const { data: blog } = await res.json();
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
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
}
