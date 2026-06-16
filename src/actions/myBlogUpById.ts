import { BlogFormData } from "@/types/blog.types";
import { cleanObj } from "./cleanObj";

export const updateMyBlog = async (blogId: string,data:BlogFormData) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/update/${blogId}`,
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
