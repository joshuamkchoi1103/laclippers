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

const Roster: React.FC = () => {
  const [roster, setRoster] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

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
    return sortAsc ? ' ▲' : ' ▼';
  };

  const sortedRoster = [...roster].sort((a, b) => {
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

  if (loading) return <p>Loading roster...</p>;

  return (
    <div className="roster-container">
      <h1>2024–25 Los Angeles Clippers Roster</h1>
      <table className="roster-table">
        <thead>
          <tr>
            <th>Photo</th>
            <th className="clickable" onClick={() => handleSort('number')}>
              # {getSortIndicator('number')}
            </th>
            <th className="clickable" onClick={() => handleSort('name')}>
              Player {getSortIndicator('name')}
            </th>
            <th className="clickable" onClick={() => handleSort('position')}>
              Position {getSortIndicator('position')}
            </th>
            <th className="clickable" onClick={() => handleSort('height')}>
              Height {getSortIndicator('height')}
            </th>
            <th className="clickable" onClick={() => handleSort('weight')}>
              Weight {getSortIndicator('weight')}
            </th>
            <th className="clickable" onClick={() => handleSort('experience')}>
              Experience {getSortIndicator('experience')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRoster.map((player, idx) => {
            const heightInInches = parseHeightInInches(player.height);
            const displayHeight = convertHeightToFeetInches(heightInInches);

            return (
              <tr key={idx}>
                <td>
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
                    <img
                      src="/default-player.png"
                      alt="default"
                      className="player-image"
                    />
                  )}
                </td>
                <td>{player.number}</td>
                <td>{player.name}</td>
                <td>{player.position}</td>
                <td>{displayHeight}</td>
                <td>{player.weight} lbs</td>
                <td>{player.experience === 'R' ? 'Rookie' : `${player.experience} yrs`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Roster;
