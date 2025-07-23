import React from 'react';
//import NextGame from '../components/NextGame';

import '../styles/NextGame.css';
import '../styles/Home.css';
import backgroundImage from '../assets/court.png';

const Home = () => {
  return (
    <div className="hero-banner">
      <img src={backgroundImage} alt="Intuit Dome court" />
      <div className="overlay">
        <h1>Welcome to ClippersCentral</h1>
        <p>Your hub for roster, news & game insights.</p>
      </div>
    </div>

  );
};

export default Home;
