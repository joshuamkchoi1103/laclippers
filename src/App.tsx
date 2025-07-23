import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Roster from './pages/Roster';
import Schedule from './pages/Schedule';
import News from './pages/News';
import AboutMe from './pages/AboutMe';
import Model from './pages/Model';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/laclippers"> {/* 👈 important fix for GitHub Pages */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/Model" element={<Model />} />
        <Route path="/aboutme" element={<AboutMe />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
