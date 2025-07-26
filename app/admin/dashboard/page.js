'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import blogs from '../../data/blogs';
import styles from '../../page.module.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [blogList, setBlogList] = useState([]);
  const [adminName, setAdminName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editBlog, setEditBlog] = useState({ title: '', content: '', url: '' });
  const [newBlog, setNewBlog] = useState({ title: '', content: '', url: '' });

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      router.push('/admin/login');
      return;
    }

    const storedName = localStorage.getItem('adminName');
    if (storedName) setAdminName(storedName);

    const storedBlogs = localStorage.getItem('blogList');
    try {
      const parsed = storedBlogs ? JSON.parse(storedBlogs) : blogs;
      const uniqueBlogs = parsed.filter((blog, index, self) =>
        index === self.findIndex((b) => b.id === blog.id)
      );
      setBlogList(uniqueBlogs);
      localStorage.setItem('blogList', JSON.stringify(uniqueBlogs));
    } catch (err) {
      console.error("Error parsing blogList:", err);
      setBlogList(blogs);
      localStorage.setItem('blogList', JSON.stringify(blogs));
    }

    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('adminName');
    router.push('/admin/login');
  };

  const deleteBlog = (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    const updatedList = blogList.filter(blog => blog.id !== id);
    setBlogList(updatedList);
    localStorage.setItem('blogList', JSON.stringify(updatedList));
  };

  const handleEditClick = (blog) => {
    setEditId(blog.id);
    setEditBlog({
      title: blog.title,
      content: blog.content,
      url: Array.isArray(blog.url) ? blog.url.join(', ') : blog.url || ''
    });
  };

  const handleUpdateChange = (field, value) => {
    setEditBlog(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!editBlog.title.trim() || !editBlog.content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const urls = editBlog.url
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);

    const updatedList = blogList.map(blog =>
      blog.id === editId
        ? {
            ...blog,
            title: editBlog.title,
            content: editBlog.content,
            url: urls.length > 1 ? urls : urls[0] || ''
          }
        : blog
    );

    setBlogList(updatedList);
    localStorage.setItem('blogList', JSON.stringify(updatedList));
    setEditId(null);
    setEditBlog({ title: '', content: '', url: '' });
  };

  const handleNewBlogChange = (field, value) => {
    setNewBlog(prev => ({ ...prev, [field]: value }));
  };

  const handleCreate = () => {
    if (!newBlog.title.trim() || !newBlog.content.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    const urls = newBlog.url
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);
    const newId = blogList.length > 0 ? Math.max(...blogList.map(b => b.id)) + 1 : 1;
    const newBlogEntry = {
      id: newId,
      title: newBlog.title,
      content: newBlog.content,
      url: urls.length > 1 ? urls : urls[0] || ''
    };

    const updatedList = [...blogList, newBlogEntry];
    setBlogList(updatedList);
    localStorage.setItem('blogList', JSON.stringify(updatedList));
    setNewBlog({ title: '', content: '', url: '' });
  };

  return (
    <main className={styles.main}>
      <div className={styles.header}>
        <h1 className={styles.welcome}>Welcome {adminName || 'Admin'}!</h1>
        <button
          onClick={handleLogout}
          className={styles.logoutButton}
          style={{
            padding: '0.5rem 1rem',
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginLeft: '1rem'
          }}
        >
          Logout
        </button>
      </div>
      <h2 className={styles.dashboardTitle}>Blog Dashboard</h2>

      <div className={styles.createForm}>
        <h3 className={styles.formTitle}>Create New Blog</h3>
        <input
          type="text"
          value={newBlog.title}
          onChange={e => handleNewBlogChange('title', e.target.value)}
          placeholder="Blog Title"
          className={styles.input}
        />
        <textarea
          value={newBlog.content}
          onChange={e => handleNewBlogChange('content', e.target.value)}
          placeholder="Blog Content"
          rows={3}
          className={styles.textarea}
        />
        <input
          type="text"
          value={newBlog.url}
          onChange={e => handleNewBlogChange('url', e.target.value)}
          placeholder="URLs"
          className={styles.input}
        />
        <button onClick={handleCreate} className={styles.createButton}>
          Create
        </button>
      </div>

      {blogList.length === 0 ? (
        <p className={styles.noBlogs}>No blogs found.</p>
      ) : (
        blogList.map(blog => (
          <div key={blog.id} className={styles.postCard}>
            {editId === blog.id ? (
              <>
                <input
                  type="text"
                  value={editBlog.title}
                  onChange={e => handleUpdateChange('title', e.target.value)}
                  placeholder="Blog Title"
                  className={styles.input}
                />
                <textarea
                  value={editBlog.content}
                  onChange={e => handleUpdateChange('content', e.target.value)}
                  placeholder="Blog Content"
                  rows={3}
                  className={styles.textarea}
                />
                <input
                  type="text"
                  value={editBlog.url}
                  onChange={e => handleUpdateChange('url', e.target.value)}
                  placeholder="URLs"
                  className={styles.input}
                />
                <button onClick={handleSave} className={styles.saveButton}>
                  Save
                </button>
                <button onClick={() => setEditId(null)} className={styles.cancelButton}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <h3 className={styles.postTitle}>{blog.title}</h3>
                <p className={styles.postContent}>{blog.content}</p>
                <div className={styles.links}>
                  {Array.isArray(blog.url)
                    ? blog.url.map((link, i) => (
                        <a key={i} href={link} target="_blank" rel="noopener noreferrer" className={styles.link}>
                          {link}
                        </a>
                      ))
                    : blog.url && (
                        <a href={blog.url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                          {blog.url}
                        </a>
                      )}
                </div>
                <div className={styles.buttonGroup}>
                  <button onClick={() => handleEditClick(blog)} className={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => deleteBlog(blog.id)} className={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))
      )}
    </main>
  );
}