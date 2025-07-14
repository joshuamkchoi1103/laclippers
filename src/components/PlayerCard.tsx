import React from 'react';
import { Player } from '../types/player';
import '../styles/PlayerCard.css';

const PlayerCard: React.FC<{ player: Player }> = ({ player }) => {
  return (
    <div className="player-box">
      <div className="jersey-circle">#{player.jersey_number}</div>
      <h3 className="player-name">{player.first_name} {player.last_name}</h3>
      <div className="player-info">
        <div className="info-item">🎽 <span>{player.position}</span></div>
        <div className="info-item">🏀 <span>{player.team.abbreviation}</span></div>
      </div>
    </div>
  );
};

export default PlayerCard;
