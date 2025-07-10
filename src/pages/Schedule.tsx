import styles from './Schedule.module.css';

const Schedule: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upcoming Games</h2>
      <ul className={styles.list}>
        <li>📅 Oct 18 — vs Lakers</li>
        <li>📅 Oct 21 — @ Suns</li>
        <li>📅 Oct 23 — vs Warriors</li>
      </ul>
    </div>
  );
};

export default Schedule;
