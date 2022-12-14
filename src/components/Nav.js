import '../styles/general.scss';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="nav-container">
      <Link to="/">
        <h3 className="nav-title">blog.</h3>
      </Link>
    </nav>
  );
};

export default Nav;
