'use client';
export const verifyUser = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify`, {
    method: 'POST',
    credentials: 'include',
  });
  const user = await res.json();
  return user;
};
