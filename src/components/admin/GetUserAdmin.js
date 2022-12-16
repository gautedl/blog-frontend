import { useState } from 'react';
import AdminNav from './AdminNav';
import '../../styles/general.scss';
import { useNavigate } from 'react-router-dom';

const GetUserAdmin = () => {
  const [selectedPassword, setSelectedPassword] = useState();
  const userId = JSON.parse(localStorage.getItem('user'))._id;
  const [errorMsg, setErrorMsg] = useState();

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const password = {
      password: selectedPassword,
    };

    fetch(`/admin/user/${userId}/admin`, {
      method: 'POST',
      body: JSON.stringify(password),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data === 'Wrong Password') {
          setErrorMsg(<p className="err-msg">Wrong Password</p>);
          return;
        } else if (data.msg !== 'Updated Succesfully') {
          setErrorMsg(<p className="err-msg">{data[0].msg}</p>);
          return;
        } else {
          let setAdmin = JSON.parse(localStorage.getItem('user'));
          setAdmin.admin = true;
          localStorage.setItem('user', JSON.stringify(setAdmin));
          navigate('/admin');
        }
      });
  };

  return (
    <div>
      <AdminNav />
      <div className="login-container">
        <div className="greeting">
          <h1>Get admin role</h1>
        </div>
        <div className="login-field">
          <form onSubmit={submitHandler}>
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
            <div className="err">{errorMsg}</div>
            <button>Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GetUserAdmin;
