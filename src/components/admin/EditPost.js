import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/general.scss';
import CommentCard from '../cards/CommentCard';

import AdminNav from './AdminNav';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [description, setDescription] = useState();
  const [errorMsg, setErrorMsg] = useState([]);
  const [comments, setComments] = useState([]);

  const navigate = useNavigate();
  const token = `Bearer ${localStorage.getItem('token')}`;

  useEffect(() => {
    fetch(`/post/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setText(data.text);
        setSelectedUser(data.user._id);
        setDescription(data.description);
        setComments(data.comments);
      });

    fetch('/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [id]);

  const savePost = (isPosted) => {
    const curPost = {
      title: title,
      text: text,
      description: description,
      user: selectedUser,
      posted: isPosted,
    };

    return curPost;
  };

  const saveDraft = (e) => {
    e.preventDefault();

    fetch(`/admin/post/${id}/edit`, {
      method: 'POST',
      body: JSON.stringify(savePost(false)),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'Updated') {
          setErrorMsg(data);
        }
        navigate('/admin');
      });
  };

  const postToWeb = (e) => {
    e.preventDefault();

    fetch(`/admin/post/${id}/edit`, {
      method: 'POST',
      body: JSON.stringify(savePost(true)),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data !== 'Updated') {
          setErrorMsg(data);
        }
        navigate('/admin');
      });
  };

  const deleteAllComments = () => {
    fetch(`/comment/${id}/delete_all`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data !== 'deleted') {
          setErrorMsg(data);
        }
      });
  };

  const deletePost = (e) => {
    e.preventDefault();

    deleteAllComments();

    fetch(`/admin/post/${id}/delete`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'deleted') {
          setErrorMsg(data);
        }

        navigate('/admin');
      });
  };

  return (
    <>
      <AdminNav />
      <div className="edit-post-container">
        {post === undefined ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="post-details">
              <div className="value-field">
                <label htmlFor="title">Title:</label>
                <input
                  className="input"
                  id="title"
                  value={title || ''}
                  name="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="value-field-user">
                <label htmlFor="user">User:</label>
                <select
                  id="user"
                  type="select"
                  placeholder="Select User"
                  name="category"
                  value={selectedUser || ''}
                  onChange={(e) => {
                    setSelectedUser(e.target.value);
                  }}
                  required
                >
                  {users.map((user) => (
                    <option key={user._id} value={user._id} name="user">
                      {user.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="value-field">
                <label htmlFor="description">Description (max 140 char):</label>
                <textarea
                  className="input-field-description"
                  id="description"
                  value={description || ''}
                  name="description"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  required
                />
              </div>

              <div className="value-field">
                <label htmlFor="text">Text:</label>
                <textarea
                  className="input-field"
                  id="text"
                  value={text || ''}
                  name="text"
                  onChange={(e) => {
                    setText(e.target.value);
                  }}
                  required
                />
              </div>
              {comments.map((data) => (
                <CommentCard
                  id={data._id}
                  date={data.dateAdded}
                  user={data.user}
                  text={data.text}
                  key={data._id}
                  delete={true}
                  post={id}
                />
              ))}
            </div>
            {errorMsg.map((err, i) => (
              <p className="error-msg" key={i}>
                {err.msg}
              </p>
            ))}
            <div className="btn-container">
              <button className="save" onClick={saveDraft}>
                Save Draft
              </button>
              <button className="post" onClick={postToWeb}>
                Post to Web
              </button>
              <button className="delete" onClick={deletePost}>
                Delete Post
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditPost;
