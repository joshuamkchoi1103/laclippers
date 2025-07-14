import { useEffect, useState } from 'react';
import '../styles/NextGame.css';

interface Game {
  date: string;
  opponent: string;
  home: boolean;
}

const NextGame = () => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    // Static fallback: /public/data/next-game.json
    fetch('/data/next-game.json')
      .then((res) => res.json())
      .then((data) => setGame(data))
      .catch((err) => console.error('Failed to load next game:', err));
  }, []);

  if (!game) return <div className="next-game">Loading next game...</div>;

  return (
    <div className="next-game">
      <h2>Next Game</h2>
      <p><strong>Date:</strong> {game.date}</p>
      <p><strong>Opponent:</strong> {game.home ? 'vs' : '@'} {game.opponent}</p>
    </div>
  );
};

export default NextGame;
