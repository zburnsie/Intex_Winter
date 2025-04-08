import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import LandingPage from './pages/Landing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminMoviePage from './pages/AdminMoviePage';
import MoviesPage from './pages/MoviesPage';

const App: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {/* Hide nav bar on landing page */}
      {!isLanding && (
        <nav className="bg-gray-900 text-white p-4 flex gap-4 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/adminpage" className="hover:underline">Admin</Link>
          <Link to="/movies" className="hover:underline">Movies</Link>
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminpage" element={<AdminMoviePage />} />
        <Route path="/movies" element={<MoviesPage />} />
      </Routes>
    </>
  );
};

export default App;

