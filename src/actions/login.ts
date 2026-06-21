'use server';
import { LoginFormData } from '@/types/login.types';
import { headers } from 'next/headers';

export const login = async (data: LoginFormData) => {
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const origin = `${protocol}://${host}`;

  const res = await fetch(`${origin}/api/v2/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });
  const user = await res.json();
  console.log(user);
  return user;
};
