import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../assets/clippers-logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logoSection">
        <img src={logo} alt="Clippers Logo" className="logo" />
        <div className="title">LA Clippers</div>
      </div>
      <div className="links">
        <Link to="/" className="link">Home</Link>
        <Link to="/roster" className="link">Roster</Link>
        <Link to="/schedule" className="link">Schedule</Link>
      </div>
    </nav>
  );
};

export default Navbar;
