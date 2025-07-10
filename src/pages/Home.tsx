import styles from './Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to Clippers Central</h1>
      <p className={styles.subtitle}>Follow the latest Clippers games, players, and updates.</p>
    </div>
  );
};

export default Home;
