import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>LA Clippers</div>
      <div className={styles.links}>
        <Link to="/" className={styles.link}>Home</Link>
        <Link to="/roster" className={styles.link}>Roster</Link>
        <Link to="/schedule" className={styles.link}>Schedule</Link>
      </div>
    </nav>
  );
};

export default Navbar;