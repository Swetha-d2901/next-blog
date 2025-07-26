'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    // Hardcoded credential check
    if (username === 'Swetha' && password === 'swetha@29') {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('adminName', username);
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Login</h1>
      {error && (
        <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>
      )}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Admin Name"
          style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
          required
        />
        <button
          type="submit"
          style={{
            padding: '0.5rem 1rem',
            background: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}