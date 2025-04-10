import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import LandingPage from './pages/Landing';
import MoviesPage from './pages/MoviesPage';
import MovieDetailPage from './pages/MovieDetailPage';
import './App.css';

const App: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {/* Hide nav bar on landing page */}
      {!isLanding && (
        <nav className="custom-navbar">
          <Link to="/" className="navbar-logo">
            <span className="logo-red">CINE</span>
            <span className="logo-white">NICHE</span>
          </Link>
          <div className="navbar-links">
            <Link to="/">Home</Link>
            <Link to="/adminpage">Admin</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/movie/:showId" element={<MovieDetailPage />} />
        <Route path="/movies" element={<MoviesPage />} />
        {/* You can add more routes here */}
      </Routes>
    </>
  );
};

export default App;

