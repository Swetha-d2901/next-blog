import '../styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'My Blog',
  description: 'A blog site with admin dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <header>
          <h1>📰 My Blog</h1>
          <nav>
            <Link href="/">Home</Link> | <Link href="/admin/dashboard">Admin</Link>
          </nav>
        </header>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} BlogCo</p>
        </footer>
      </body>
    </html>
  );
}