
'use client';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();

  const handleAdminClick = () => {
    const isAdmin = typeof window !== 'undefined' ? localStorage.getItem('isAdmin') : null;
    if (!isAdmin) {
      router.push('/admin/login');
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <nav style={{ background: '#2c3e50', padding: '1.5rem', color: '#ecf0f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>
      <span style={{ marginRight: '2rem', fontSize: '1.5rem' }}>📝</span> My Blog
      <div style={{ marginLeft: 'auto' }}>
        <a href="/" style={{ color: '#ecf0f1', marginRight: '1.5rem', textDecoration: 'none', fontSize: '1.2rem' }}>Home</a> |
        <span
          onClick={handleAdminClick}
          style={{ color: '#ecf0f1', marginLeft: '1.5rem', cursor: 'pointer', textDecoration: 'none', fontSize: '1.2rem' }}
        >
          Admin
        </span>
      </div>
    </nav>
  );
}
