import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <Link to="/users" className="navbar-logo">
        EmployWise
      </Link>
      <div className="navbar-actions">
        <Link to="/users">Users</Link>
        <a href="#" onClick={(e) => {
          e.preventDefault();
          onLogout();
        }}>Logout</a>
      </div>
    </nav>
  );
};

export default Navbar;