import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/general.scss';

import AdminNav from './AdminNav';

const CreatePost = () => {
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [description, setDescription] = useState();
  const [errorMsg, setErrorMsg] = useState([]);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user')).username;
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const token = `Bearer ${localStorage.getItem('token')}`;

  const savePost = (isPosted) => {
    const curPost = {
      title: title,
      text: text,
      description: description,
      user: userId,
      posted: isPosted,
    };

    return curPost;
  };

  const saveDraft = (e) => {
    e.preventDefault();

    fetch(`/admin/post/create`, {
      method: 'POST',
      body: JSON.stringify(savePost(false)),
      headers: {
        Authorization: token,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== 'posted') {
          setErrorMsg(data);
        }
        navigate('/admin');
      });
  };

  const postToWeb = (e) => {
    e.preventDefault();

    fetch(`/admin/post/create`, {
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
        if (data !== 'posted') {
          setErrorMsg(data);
        }
        navigate('/admin');
      });
  };

  return (
    <>
      <AdminNav />
      <div className="post-container">
        <>
          <div className="post-details">
            <div className="value-field">
              <label htmlFor="title">Title:</label>
              <input
                className="input"
                id="title"
                placeholder="Title"
                name="title"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                required
              />
            </div>
            <div className="value-field-user">
              <label htmlFor="user">User: {user}</label>
            </div>
            <div className="value-field">
              <label htmlFor="description">Description (max 140 char):</label>
              <textarea
                className="input-field-description"
                id="description"
                placeholder="Description"
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
                placeholder="text"
                name="text"
                onChange={(e) => {
                  setText(e.target.value);
                }}
                required
              />
            </div>
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
          </div>
        </>
      </div>
    </>
  );
};

export default CreatePost;
