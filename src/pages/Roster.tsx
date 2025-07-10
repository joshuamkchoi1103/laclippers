import { useEffect, useState } from 'react';
import { Player } from '../types/player';
import PlayerCard from '../components/PlayerCard';
import styles from './Roster.module.css';

const Roster: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    fetch('/data/players.json')
      .then((res) => res.json())
      .then((data) => setPlayers(data));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>2025 Clippers Roster</h2>
      <div className={styles.grid}>
        {players.map((player, i) => (
          <PlayerCard key={i} player={player} />
        ))}
      </div>
    </div>
  );
};

export default Roster;