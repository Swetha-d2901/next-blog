import '../styles/globals.css';

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
            <a href="/">Home</a> | <a href="/admin">Admin</a>
          </nav>
        </header>
        {children}
        <footer>
          <p>&copy; {new Date().getFullYear()} BlogCo</p>
        </footer>
      </body>
    </html>
  );
}
