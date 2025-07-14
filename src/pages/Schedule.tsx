import '../styles/Schedule.css';

const Schedule: React.FC = () => {
  return (
    <div className="container">
      <h2 className="title">Upcoming Games</h2>
      <ul className="list">
        <li>📅 Oct 18 — vs Lakers</li>
        <li>📅 Oct 21 — @ Suns</li>
        <li>📅 Oct 23 — vs Warriors</li>
      </ul>
    </div>
  );
};

export default Schedule;
