import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/general.scss';

const Login = () => {
  const [selectedUsername, setSelectedUsername] = useState();
  const [selectedPassword, setSelectedPassword] = useState();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const user = {
      username: selectedUsername,
      password: selectedPassword,
    };

    fetch(`/admin/log_in`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          console.log('Error');
          return;
        }
        return res.json();
      })
      .then((data) => {
        // Stores the user credentials in locale storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/admin');
      });
  };

  return (
    <div className="login-container">
      <div className="greeting">
        <h1>Sign in to your account</h1>
      </div>
      <div className="login-field">
        <form onSubmit={submitHandler}>
          <div className="input-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username:"
              onChange={(e) => {
                setSelectedUsername(e.target.value);
              }}
              required
            />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password:"
              onChange={(e) => {
                setSelectedPassword(e.target.value);
              }}
              required
            />
          </div>
          <button>Sign in</button>
        </form>
        <div className="sign-up">
          <p>Not a user?</p>{' '}
          <Link className="link" to="/admin/sign_up">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
