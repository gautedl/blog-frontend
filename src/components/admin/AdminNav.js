import '../../styles/general.scss';
import { Link, useNavigate } from 'react-router-dom';

const AdminNav = () => {
  const navigate = useNavigate();

  const logOut = () => {
    console.log('Logging out');

    fetch('/admin/log_out', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === 'logged out') {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/');
        }
      });
  };

  return (
    <nav className="nav-container">
      <Link to="/admin">
        <h3 className="nav-title">blog.</h3>
      </Link>
      <div className="route-container">
        <Link to="/admin/create_post">
          <h3 className="nav-title">Create Post</h3>
        </Link>
        <h3 onClick={logOut}>Log Out</h3>
      </div>
    </nav>
  );
};

export default AdminNav;
