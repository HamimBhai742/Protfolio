'use server';
import { BlogFormData } from "@/types/blog.types";
import { cleanObj } from "./cleanObj";
import { headers } from 'next/headers';

export const updateMyBlog = async (blogId: string, data: BlogFormData) => {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const origin = `${protocol}://${host}`;

  const res = await fetch(
    `${origin}/api/v2/blog/update/${blogId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(cleanObj(data)),
    }
  );
  const result = await res.json();
  return result;
};
