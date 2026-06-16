'use server';
import { LoginFormData } from '@/types/login.types';

export const login = async (data: LoginFormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
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
