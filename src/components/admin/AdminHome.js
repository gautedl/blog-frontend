import AdminNav from './AdminNav';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostCard from '../cards/PostCard';

const AdminHome = () => {
  const [postedPosts, setPostedPosts] = useState([]);
  const [unpostedPosts, setUnpostedPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = JSON.parse(localStorage.getItem('user')).admin;
    if (!isAdmin) navigate('/admin/getadmin');

    fetch('/posts')
      .then((res) => res.json())
      .then((data) => setPostedPosts(data));

    fetch('/posts/unposted')
      .then((res) => res.json())
      .then((data) => setUnpostedPosts(data));
  }, [navigate]);

  return (
    <>
      <AdminNav />
      <div className="posts-container">
        {postedPosts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="container">
            <h2>Posted Posts</h2>
            <div className="post-container">
              {postedPosts.map((post) => (
                <PostCard
                  route={'admin/post'}
                  title={post.title}
                  description={post.description}
                  date={post.createdAt}
                  key={post._id}
                  id={post._id}
                />
              ))}
            </div>
            <h2>Drafts</h2>
            <div className="post-container">
              {unpostedPosts.map((post) => (
                <PostCard
                  route={'admin/post'}
                  title={post.title}
                  description={post.description}
                  date={post.createdAt}
                  key={post._id}
                  id={post._id}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminHome;
