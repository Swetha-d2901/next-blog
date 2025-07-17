'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminName');
    router.push('/');
  };

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/admin/login">Admin Login</Link>
        <Link href="/admin/dashboard">Admin Panel</Link>
        <button onClick={handleLogout}>Logout</button>
      </nav>
    </header>
  );
}