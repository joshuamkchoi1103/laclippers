import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/clippers-logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="logoSection">
        <img src={logo} alt="Clippers Logo" className="logo" />
        <div className="title">LA Clippers</div>
      </div>
      <div className="links">
        <NavLink to="/" className="link" end>
          Home
        </NavLink>
        <NavLink to="/news" className="link">
          News
        </NavLink>
        <NavLink to="/roster" className="link">
          Roster
        </NavLink>
        <NavLink to="/schedule" className="link">
          Schedule
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
