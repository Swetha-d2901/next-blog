'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    const ADMIN_PASS = 'admin123';
    if (password === ADMIN_PASS) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminName', 'SuperAdmin'); // Optional: Customize name
      router.push('/admin/dashboard');
    } else {
      setError('Invalid admin password');
    }
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🔐 Admin Login</h1>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Enter admin password"
        style={{ padding: '0.5rem', marginBottom: '1rem' }}
      />
      <br />
      <button onClick={handleLogin} style={{ padding: '0.5rem 1rem' }}>
        Login
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  );
}
