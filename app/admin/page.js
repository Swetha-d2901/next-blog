'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin/login');
    } else {
      router.push('/admin/dashboard');
    }
  }, [router]);

  return null; // No UI needed, just redirection
}