import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import logo from '../assets/clippers-logo.png';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoSection}>
        <img src={logo} alt="Clippers Logo" className={styles.logo} />
        <div className={styles.title}>LA Clippers</div>
      </div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/roster" className={styles.link}>Roster</Link>
        <Link to="/schedule" className={styles.link}>Schedule</Link>
      </div>
    </nav>
  );
};

export default Navbar;
