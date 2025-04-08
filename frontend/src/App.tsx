import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import LandingPage from './pages/Landing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminMoviePage from './pages/AdminMoviePage';
import MoviesPage from './pages/MoviesPage';

const App: React.FC = () => {
  return (
    <div>
      {/* Optional Navigation Links - good for dev testing */}
      <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/adminpage">Admin Movie Page</Link>
        <Link to="/movies">Browse Movies</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminpage" element={<AdminMoviePage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>
    </div>
  );
};

export default App;

