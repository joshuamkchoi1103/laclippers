import { Player } from '../types/player';
import styles from './PlayerCard.module.css';

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  const fullName = `${player.first_name} ${player.last_name}`;

  return (
    <div className={styles.card}>
      <img
        src={`https://nba-players-profile-imgs.s3.amazonaws.com/default-headshot.png`} // Placeholder image
        alt={fullName}
        className={styles.image}
      />
      <h3 className={styles.name}>{fullName}</h3>
      <p className={styles.details}>
        Position: {player.position || 'N/A'}<br />
        Team: {player.team.abbreviation}
      </p>
    </div>
  );
};

export default PlayerCard;
