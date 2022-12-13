import { useState } from 'react';
import '../../styles/general.scss';

const CommentCard = (props) => {
  const [likes, setLikes] = useState(props.likes);

  const date = new Date(props.date);
  const date_formated = date.toLocaleDateString('en-gb', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

  const getLikes = () => {
    fetch(`/comment/${props.id}/get_likes`)
      .then((res) => res.json())
      .then((data) => setLikes(data));
  };

  const likeComment = (e) => {
    e.preventDefault();

    fetch(`/comment/${props.id}/like`, {
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
    <div className="comment-card">
      <h1 className="user">{props.user}</h1>
      <p className="description">{props.text}</p>
      <div className="footer-container">
        <p className="date">{date_formated}</p>
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
            onClick={likeComment}
            cursor="pointer"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
          </svg>
          {likes}
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
