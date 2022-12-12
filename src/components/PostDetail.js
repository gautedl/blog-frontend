import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/general.scss';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [date, setDate] = useState();
  const [lastUpdated, setLastUpdated] = useState();
  const [likes, setLikes] = useState();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setLikes(data.likes);
        const d = new Date(data.createdAt);
        setComments(data.comments);
        setDate(
          d.toLocaleDateString('en-gb', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        );
        if (data.lastUpdated !== undefined) {
          const ld = new Date(data.lastUpdated);
          setLastUpdated(
            ld.toLocaleDateString('en-gb', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          );
        }
      });
  }, [id]);

  const getLikes = () => {
    fetch(`/post/${id}/get_likes`)
      .then((res) => res.json())
      .then((data) => setLikes(data));
  };

  const likePost = (e) => {
    e.preventDefault();

    fetch(`/post/${id}/like`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'Liked!') {
          getLikes();
        }
      });
  };

  return (
    <div className="post-container">
      {post === undefined ? (
        <p>Loading...</p>
      ) : (
        <>
          {console.log(post)}
          <div className="post-details">
            <h1>{post.title}</h1>
            <h2>{post.user.username}</h2>
            <h4>{date}</h4>
            <div className="text-container">
              <p>{post.text}</p>
            </div>
            <div className="footer-container">
              <p>
                Last updated: {lastUpdated !== undefined ? lastUpdated : date}
              </p>
              <div className="like-container">
                <svg
                  width="25"
                  height="25"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={likePost}
                  cursor="pointer"
                >
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
                {likes}
              </div>
            </div>
          </div>
          {comments.length === 0 ? <></> : <></>}
        </>
      )}
    </div>
  );
};

export default PostDetail;
