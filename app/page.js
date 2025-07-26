import blogs from './data/blogs';
import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main>
      <h1>All Blogs</h1>
      <div className={styles.cardGrid}>
        {blogs.map(blog => {
          const displayUrl = blog.url ? (Array.isArray(blog.url) ? blog.url[0] : blog.url) : null;

          return (
            <div key={blog.id} className={styles.card}>
              <img src={`/images/${blog.image}`} alt={blog.title} className={styles.cardImage} />
              <h2>{blog.title}</h2>
              {displayUrl && (
                <a href={displayUrl} target="_blank" rel="noopener noreferrer" className={styles.visitLink}>
                  Visit
                </a>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}