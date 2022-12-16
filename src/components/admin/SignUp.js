import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../styles/general.scss';

const SignUp = () => {
  const [selectedUsername, setSelectedUsername] = useState();
  const [selectedPassword, setSelectedPassword] = useState();
  const [selectedConfirmPassword, setSelectedConfirmPassword] = useState();
  const [errorMsg, setErrorMsg] = useState();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const user = {
      username: selectedUsername,
      password: selectedPassword,
      confirmPassword: selectedConfirmPassword,
    };

    fetch('/admin/sign_up', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((user) => {
        if (user === 'Username is taken') {
          setErrorMsg(<p className="err-msg">Username is taken</p>);
          return;
        } else if (user !== 'Success') {
          setErrorMsg(<p className="err-msg">{user[0].msg}</p>);
          return;
        } else {
          navigate('/admin/login');
        }
      });
  };

  return (
    <div className="login-container">
      <div className="greeting">
        <h1>Sign up for an account</h1>
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
          <div className="input-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              placeholder="Confirm Password:"
              onChange={(e) => {
                setSelectedConfirmPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="err">{errorMsg}</div>
          <button>Sign Up</button>
        </form>
        <div className="sign-up">
          <p>Already a user?</p>{' '}
          <Link className="link" to="/admin/login">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
