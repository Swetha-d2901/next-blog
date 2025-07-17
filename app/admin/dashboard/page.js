'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import blogs from '../../data/blogs'; // Sync with initial data

export default function AdminDashboard() {
  const router = useRouter();
  const [blogList, setBlogList] = useState([]);
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin/login');
      return;
    }

    const storedName = localStorage.getItem('adminName');
    if (storedName) {
      setAdminName(storedName);
    }

    const storedBlogs = localStorage.getItem('blogList');
    if (storedBlogs) {
      setBlogList(JSON.parse(storedBlogs));
    } else {
      localStorage.setItem('blogList', JSON.stringify(blogs));
      setBlogList(blogs);
    }
  }, []);

  const deleteBlog = (id) => {
    const updatedList = blogList.filter(blog => blog.id !== id);
    localStorage.setItem('blogList', JSON.stringify(updatedList));
    setBlogList(updatedList);
  };

  return (
    <main style={{ padding: '2rem' }}>
      <h1>🛠️ Welcome {adminName || 'Admin'}!</h1>
      <h2>Blog Dashboard</h2>
      {blogList.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogList.map(blog => (
          <div key={blog.id} style={{
            border: '1px solid #ccc',
            padding: '1rem',
            marginBottom: '1rem',
            borderRadius: '6px'
          }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>
            <button onClick={() => deleteBlog(blog.id)} style={{ padding: '0.5rem', backgroundColor: '#ff4d4d', color: 'white' }}>
              Delete
            </button>
          </div>
        ))
      )}
    </main>
  );
}