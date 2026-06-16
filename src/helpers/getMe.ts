export const getMe = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
    cache: 'no-store',
  });
  const { data: user } = await res.json();
  return user;
};
