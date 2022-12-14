import PostCard from './cards/PostCard';
import '../styles/general.scss';
import { useEffect, useState } from 'react';
import Nav from './Nav';

const Posts = () => {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    fetch('/posts')
      .then((res) => res.json())
      .then((data) => setPostData(data));
  }, []);

  return (
    <>
      <Nav />
      <div className="posts-container">
        {postData.length === 0 ? (
          <p>Loading...</p>
        ) : (
          postData.map((post) => (
            <PostCard
              title={post.title}
              description={post.description}
              date={post.createdAt}
              key={post._id}
              id={post._id}
            />
          ))
        )}
      </div>
    </>
  );
};

export default Posts;
