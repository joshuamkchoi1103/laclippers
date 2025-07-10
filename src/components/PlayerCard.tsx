import { Player } from '../types/player';
import styles from './PlayerCard.module.css';

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <div className={styles.card}>
      <img src={player.image} alt={player.name} className={styles.image} />
      <h3 className={styles.name}>{player.name}</h3>
      <p className={styles.details}>{player.position} • #{player.number}</p>
    </div>
  );
};

export default PlayerCard;