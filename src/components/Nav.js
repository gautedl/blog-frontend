import '../styles/general.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-container">
      <Link to="/">
        <h3 className="nav-title">blog.</h3>
      </Link>
      <div className="route-container">
        <Link to="">
          <h3>Admin</h3>
        </Link>
        <Link to="">
          <h3>Log In</h3>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
