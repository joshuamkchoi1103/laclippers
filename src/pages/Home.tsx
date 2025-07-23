import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NextGame.css';
import '../styles/Home.css';
import backgroundImage from '../assets/court.png';

interface PlayerHighlight {
  name: string;
  position: string;
  stat: string;
  value: string;
  image?: string;
}

interface GameInfo {
  opponent: string;
  date: string;
  time: string;
  isHome: boolean;
  location: string;
}

const Home = () => {
  const navigate = useNavigate();
  const [currentHighlight, setCurrentHighlight] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const playerHighlights: PlayerHighlight[] = [
    {
      name: "Kawhi Leonard",
      position: "SF",
      stat: "Points Per Game",
      value: "23.7"
    },
    {
      name: "Paul George",
      position: "SG/SF", 
      stat: "3-Point %",
      value: "41.3%"
    },
    {
      name: "James Harden",
      position: "PG",
      stat: "Assists Per Game",
      value: "8.5"
    },
    {
      name: "Ivica Zubac",
      position: "C",
      stat: "Rebounds Per Game",
      value: "9.2"
    }
  ];

  const upcomingGame: GameInfo = {
    opponent: "Lakers",
    date: "Tonight",
    time: "7:30 PM",
    isHome: true,
    location: "Intuit Dome"
  };

  const quickStats = [
    { label: "Team Record", value: "45-37" },
    { label: "Conference Rank", value: "#4 West" },
    { label: "Home Record", value: "28-13" },
    { label: "Last 10", value: "7-3" }
  ];

  // Auto-rotate player highlights
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHighlight((prev) => (prev + 1) % playerHighlights.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [playerHighlights.length]);

  // Loading animation
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`home-wrapper ${isLoaded ? 'loaded' : ''}`}>
      {/* Hero Banner - Keeping your original design but enhanced */}
      <div className="hero-banner">
        <img src={backgroundImage} alt="Intuit Dome court" />
        <div className="overlay">
          <h1>Welcome to ClippersCentral</h1>
          <p>Your hub for roster, news & game insights.</p>
          <div className="hero-actions">
            <button 
              className="cta-button primary"
              onClick={() => handleNavigation('/roster')}
            >
              View Roster
            </button>
            <button 
              className="cta-button secondary"
              onClick={() => handleNavigation('/news')}
            >
              Latest News
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow">↓</div>
          <span>Explore More</span>
        </div>
      </div>

      {/* Interactive Content Sections */}
      <div className="home-content">
        
        {/* Next Game Card */}
        <section className="next-game-section">
          <div className="section-header">
            <h2>🏀 Next Game</h2>
            <button 
              className="view-more-btn"
              onClick={() => handleNavigation('/schedule')}
            >
              View Schedule
            </button>
          </div>
          <div className="game-card">
            <div className="game-teams">
              <div className="team home">
                <div className="team-logo">LAC</div>
                <span>Clippers</span>
              </div>
              <div className="vs">VS</div>
              <div className="team away">
                <div className="team-logo opponent">LAL</div>
                <span>{upcomingGame.opponent}</span>
              </div>
            </div>
            <div className="game-info">
              <div className="game-time">
                <span className="date">{upcomingGame.date}</span>
                <span className="time">{upcomingGame.time}</span>
              </div>
              <div className="game-location">
                <span>📍 {upcomingGame.location}</span>
              </div>
            </div>
            <button className="watch-btn">🎥 Watch Live</button>
          </div>
        </section>

        {/* Player Highlights Carousel */}
        <section className="player-highlights">
          <div className="section-header">
            <h2>⭐ Player Spotlight</h2>
            <button 
              className="view-more-btn"
              onClick={() => handleNavigation('/roster')}
            >
              Full Roster
            </button>
          </div>
          <div className="highlight-carousel">
            <div className="highlight-card active">
              <div className="player-info">
                <h3>{playerHighlights[currentHighlight].name}</h3>
                <span className="position">{playerHighlights[currentHighlight].position}</span>
              </div>
              <div className="stat-display">
                <div className="stat-value">{playerHighlights[currentHighlight].value}</div>
                <div className="stat-label">{playerHighlights[currentHighlight].stat}</div>
              </div>
            </div>
            <div className="carousel-dots">
              {playerHighlights.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentHighlight ? 'active' : ''}`}
                  onClick={() => setCurrentHighlight(index)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="quick-stats">
          <h2>📊 Season Stats</h2>
          <div className="stats-grid">
            {quickStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Interactive Navigation Cards */}
        <section className="navigation-cards">
          <h2>🚀 Explore ClippersCentral</h2>
          <div className="cards-grid">
            <div 
              className="nav-card news"
              onClick={() => handleNavigation('/news')}
            >
              <div className="card-icon">📰</div>
              <h3>Latest News</h3>
              <p>Breaking news, trades, and insider reports</p>
              <div className="card-arrow">→</div>
            </div>
            
            <div 
              className="nav-card schedule"
              onClick={() => handleNavigation('/schedule')}
            >
              <div className="card-icon">📅</div>
              <h3>Schedule</h3>
              <p>Upcoming games and season calendar</p>
              <div className="card-arrow">→</div>
            </div>
            
            <div 
              className="nav-card model"
              onClick={() => handleNavigation('/model')}
            >
              <div className="card-icon">🤖</div>
              <h3>AI Predictor</h3>
              <p>Machine learning powered stat predictions</p>
              <div className="card-arrow">→</div>
            </div>
            
            <div 
              className="nav-card roster"
              onClick={() => handleNavigation('/roster')}
            >
              <div className="card-icon">👥</div>
              <h3>Team Roster</h3>
              <p>Complete player profiles and statistics</p>
              <div className="card-arrow">→</div>
            </div>
          </div>
        </section>

        {/* Fan Engagement Section */}
        <section className="fan-section">
          <div className="fan-content">
            <h2>🎉 Join the Clipper Nation</h2>
            <p>Stay connected with the latest updates, exclusive content, and fan community</p>
            <div className="social-links">
              <button className="social-btn twitter">🐦 Follow on X</button>
              <button className="social-btn instagram">📷 Instagram</button>
              <button className="social-btn youtube">📺 YouTube</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
