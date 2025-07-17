import blogs from './data/blogs';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main>
      <h1>All Blogs</h1>
      <div className="grid">
        {blogs.map(blog => (
          <div key={blog.id} className="card">
            <img src={`/images/${blog.image}`} alt="Blog" />
            <h2>{blog.title}</h2>
            <Link href={`/${blog.id}`}>Read more</Link>
          </div>
        ))}
      </div>
    </main>
  );
}
