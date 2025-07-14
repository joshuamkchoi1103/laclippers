import { useEffect, useState } from 'react';
import { Player } from '../types/player';
import PlayerCard from '../components/PlayerCard';
import  '../styles/Roster.css';

function Roster() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaticRoster = async () => {
      try {
        const res = await fetch('/data/clippers-roster.json');
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.error('Failed to load static roster:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaticRoster();
  }, []);

  return (
    <div className="container">
      <h2 className="title">2025 Clippers Roster</h2>
      {loading ? (
        <p>Loading players...</p>
      ) : (
        <div className="grid">
          {players.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Roster;
