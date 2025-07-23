import React, { useEffect, useState } from 'react';
import '../styles/Roster.css';

type Player = {
  number: string;
  name: string;
  position: string;
  height: string;
  weight: string;
  college: string;
  experience: string;
  birth_date: string;
  image: string | null;
};

const convertHeightToFeetInches = (inches: number): string => {
  const feet = Math.floor(inches / 12);
  const remainingInches = inches % 12;
  return `${feet}'${remainingInches}"`;
};

const parseHeightInInches = (h: string): number => {
  const [feet, inches] = h.split('-').map(Number);
  if (isNaN(feet) || isNaN(inches)) return 0;
  return feet * 12 + inches;
};

const positionOrder: { [key: string]: number } = {
  G: 1,
  F: 2,
  C: 3,
};

const getPositionColor = (position: string): string => {
  const pos = position[0].toUpperCase();
  switch (pos) {
    case 'G': return '#28a745'; // Green for Guards
    case 'F': return '#fd7e14'; // Orange for Forwards  
    case 'C': return '#6f42c1'; // Purple for Centers
    default: return '#6c757d';
  }
};

const getPositionName = (position: string): string => {
  if (position.includes('G')) return 'Guard';
  if (position.includes('F')) return 'Forward';
  if (position.includes('C')) return 'Center';
  return position;
};

const calculateAge = (birthDate: string): number => {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const Roster: React.FC = () => {
  const [roster, setRoster] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<string | null>('number');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [filterPosition, setFilterPosition] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:8000/api/roster')
      .then((res) => res.json())
      .then((data) => {
        setRoster(data.players);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load roster', err);
        setLoading(false);
      });
  }, []);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const getSortIndicator = (key: string) => {
    if (sortKey !== key) return '';
    return sortAsc ? ' ↑' : ' ↓';
  };

  // Filter and sort roster
  const filteredAndSortedRoster = roster
    .filter(player => {
      const matchesPosition = filterPosition === 'all' || player.position.includes(filterPosition);
      const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           player.number.includes(searchTerm);
      return matchesPosition && matchesSearch;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;

      const valA = a[sortKey as keyof Player];
      const valB = b[sortKey as keyof Player];

      let result = 0;

      if (sortKey === 'height') {
        const hA = parseHeightInInches(valA as string);
        const hB = parseHeightInInches(valB as string);
        result = hA - hB;
      } else if (sortKey === 'position') {
        const pA = positionOrder[(valA as string)[0].toUpperCase()] || 999;
        const pB = positionOrder[(valB as string)[0].toUpperCase()] || 999;
        result = pA - pB;
      } else if (sortKey === 'name') {
        const getLastName = (fullName: string) => {
          const parts = fullName.trim().split(' ');
          return parts.length > 1 ? parts[parts.length - 1] : parts[0];
        };

        const lastA = getLastName(valA as string);
        const lastB = getLastName(valB as string);
        result = lastA.localeCompare(lastB);
      } else if (sortKey === 'experience') {
        const toYears = (val: string) => val === 'R' ? 0 : Number(val);
        const numA = toYears(valA as string);
        const numB = toYears(valB as string);
        result = numA - numB;
      } else {
        const numA = Number(valA);
        const numB = Number(valB);
        if (isNaN(numA) || isNaN(numB)) return 0;
        result = numA - numB;
      }

      return sortAsc ? result : -result;
    });

  const uniquePositions = ['all', ...Array.from(new Set(roster.map(p => p.position[0])))];

  if (loading) {
    return (
      <div className="roster-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading Clippers roster...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="roster-container">
      <div className="roster-header">
        <h1>2024–25 Los Angeles Clippers</h1>
        <p className="roster-subtitle">Complete team roster with player profiles and statistics</p>
      </div>

      {/* Controls */}
      <div className="roster-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filter-container">
          <select 
            value={filterPosition} 
            onChange={(e) => setFilterPosition(e.target.value)}
            className="position-filter"
          >
            <option value="all">All Positions</option>
            <option value="G">Guards</option>
            <option value="F">Forwards</option>
            <option value="C">Centers</option>
          </select>
        </div>

        <div className="sort-container">
          <label>Sort by:</label>
          <div className="sort-buttons">
            <button 
              className={`sort-btn ${sortKey === 'number' ? 'active' : ''}`}
              onClick={() => handleSort('number')}
            >
              Number{getSortIndicator('number')}
            </button>
            <button 
              className={`sort-btn ${sortKey === 'name' ? 'active' : ''}`}
              onClick={() => handleSort('name')}
            >
              Name{getSortIndicator('name')}
            </button>
            <button 
              className={`sort-btn ${sortKey === 'position' ? 'active' : ''}`}
              onClick={() => handleSort('position')}
            >
              Position{getSortIndicator('position')}
            </button>
            <button 
              className={`sort-btn ${sortKey === 'height' ? 'active' : ''}`}
              onClick={() => handleSort('height')}
            >
              Height{getSortIndicator('height')}
            </button>
          </div>
        </div>
      </div>

      {/* Player Cards Grid */}
      <div className="players-grid">
        {filteredAndSortedRoster.length === 0 ? (
          <div className="no-players">
            <p>No players found matching your search criteria.</p>
          </div>
        ) : (
          filteredAndSortedRoster.map((player, idx) => {
            const heightInInches = parseHeightInInches(player.height);
            const displayHeight = convertHeightToFeetInches(heightInInches);
            const age = player.birth_date ? calculateAge(player.birth_date) : null;

            return (
              <div key={idx} className="player-card">
                <div className="card-header">
                  <div className="player-image-container">
                    {player.image ? (
                      <img
                        src={player.image}
                        alt={player.name}
                        className="player-image"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).src = '/default-player.png')
                        }
                      />
                    ) : (
                      <div className="player-image-placeholder">
                        <span>{player.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                    )}
                  </div>
                  <div className="jersey-number">#{player.number}</div>
                </div>
                
                <div className="card-content">
                  <h3 className="player-name">{player.name}</h3>
                  <div 
                    className="position-badge"
                    style={{ backgroundColor: getPositionColor(player.position) }}
                  >
                    {player.position}
                  </div>
                  
                  <div className="player-stats">
                    <div className="stat-item">
                      <span className="stat-label">Height</span>
                      <span className="stat-value">{displayHeight}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Weight</span>
                      <span className="stat-value">{player.weight} lbs</span>
                    </div>
                    {age && (
                      <div className="stat-item">
                        <span className="stat-label">Age</span>
                        <span className="stat-value">{age}</span>
                      </div>
                    )}
                    <div className="stat-item">
                      <span className="stat-label">Experience</span>
                      <span className="stat-value">
                        {player.experience === 'R' ? 'Rookie' : `${player.experience} yrs`}
                      </span>
                    </div>
                  </div>
                  
                  {player.college && (
                    <div className="college-info">
                      <span className="college-label">College:</span>
                      <span className="college-name">{player.college}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="roster-footer">
        <p>Showing {filteredAndSortedRoster.length} of {roster.length} players</p>
      </div>
    </div>
  );
};

export default Roster;
