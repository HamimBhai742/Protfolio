export const getMyUpdateBlog = async (blogId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/blog/my-blog/${blogId}`,
    {
      method: 'GET',
      credentials: 'include',
    }
  );
  const data = await res.json();
  return data;
};
