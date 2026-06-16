'use client';

export const logout = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    next: { revalidate: 30 },
  });
  return await res.json();
};
