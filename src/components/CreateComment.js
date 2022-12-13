import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/general.scss';

const CreateComment = ({ postId }) => {
  const [comment, setComment] = useState();
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    let name = username;
    if (username === '') {
      name = undefined;
    }

    const msg = {
      text: comment,
      user: name,
    };

    console.log(msg);

    fetch(`/comment/${postId}/create_comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg),
    })
      .then((res) => {
        return res.json();
      })
      .then((newComment) => {
        console.log(newComment);
        navigate(`/post/${postId}`);
      });
  };

  return (
    <div className="create-comment">
      <form className="comment-form" onSubmit={handleSubmit}>
        <label htmlFor="user"></label>
        <input
          className="input-user"
          id="user"
          placeholder="Name (leave blank for anon)"
          name="user"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="text"></label>
        <textarea
          className="input"
          id="text"
          placeholder="Comment"
          name="text"
          onChange={(e) => {
            setComment(e.target.value);
          }}
          required
        />
        <div className="btn-container">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CreateComment;
