"use server"
import { cookies } from 'next/headers';

export async function getCookies() {
  const cookieStore = cookies();
  return cookieStore.get("token");
}