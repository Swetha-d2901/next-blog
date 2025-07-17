'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyAdmin } from '../../utils/auth'; // Adjust path as needed

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    if (verifyAdmin(password)) {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminName', 'SuperAdmin');
      router.push('/admin/dashboard'); // Redirect to dashboard
    } else {
      setError('Invalid admin password');
    }
  };

  return (
    <main className="login-page" style={{ padding: '2rem' }}>
      <h1>🔐 Admin Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter admin password"
          style={{ padding: '0.5rem', marginBottom: '1rem' }}
        />
        <br />
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Login
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </main>
  );
}