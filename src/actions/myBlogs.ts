'use server';
import { headers } from 'next/headers';

export const getMyUpdateBlog = async (blogId: string) => {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const origin = `${protocol}://${host}`;

  const res = await fetch(
    `${origin}/api/v2/blog/my-blog/${blogId}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  const data = await res.json();
  return data;
};
