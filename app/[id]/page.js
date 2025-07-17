'use client';
import { useEffect, useState, use } from 'react';

export default function BlogDetail(props) {
  const params = use(props.params); // Correctly unwrap the promise
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = localStorage.getItem('blogList');
    if (storedBlogs) {
      const blogList = JSON.parse(storedBlogs);
      const blogId = parseInt(params.id);
      const found = blogList.find(b => b.id === blogId);
      setBlog(found || null);
    }
  }, [params.id]);

  if (!blog) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>❌ Blog Not Found</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: '2rem' }}>
      <h1>{blog.title}</h1>
      <img
        src={`/images/${blog.image}`}
        alt={blog.title}
        style={{ width: '100%', maxWidth: '500px', borderRadius: '6px', marginBottom: '1rem' }}
      />
      <p>{blog.content}</p>
    </main>
  );
}
