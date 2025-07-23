import React from 'react';
import '../styles/AboutMe.css';

const AboutMe: React.FC = () => {
  return (
    <div className="aboutme-container">
      <h2 className="aboutme-title">👋 About Me</h2>
      <p>
        Hey! I’m <strong>Joshua Choi</strong>, a Computer Engineering student at UCSD and a lifelong LA Clippers fan.
      </p>
      <p>
        This site is a full-stack project I built to showcase my skills in web development and data integration.
        It uses <strong>React (TypeScript)</strong> for the frontend and <strong>FastAPI + nba_api</strong> for the backend.
      </p>
      <p>
        I’m passionate about combining my love for sports and technology. Whether it’s scraping NBA data,
        predicting player performance, or building interactive web dashboards — I’m all in.
      </p>
      <p>
        Feel free to check out the code on <a href="https://github.com/joshuamkchoi1103/laclippers" target="_blank" rel="noopener noreferrer">GitHub</a>,
        or reach out to me if you’d like to collaborate!
      </p>
    </div>
  );
};

export default AboutMe;
