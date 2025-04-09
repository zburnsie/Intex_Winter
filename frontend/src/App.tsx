import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import LandingPage from './pages/Landing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminMoviePage from './pages/AdminMoviePage';
import MoviesPage from './pages/MoviesPage';
import PrivacyPage from './pages/PrivacyPage';
import MovieDetailPage from './pages/MovieDetailPage';
import AdminOnlyRoute from './components/AdminOnlyRoute';
import './App.css';
import AuthorizeView from './components/AuthorizeView';

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
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/movie/:showId" element={<MovieDetailPage />} />

        {/* Wrap only the protected routes */}
        <Route
          path="/movies"
          element={
            <AuthorizeView>
              <MoviesPage />
            </AuthorizeView>
          }
        />
        <Route
          path="/adminpage"
          element={
            <AuthorizeView>
              <AdminOnlyRoute>
                <AdminMoviePage />
              </AdminOnlyRoute>
            </AuthorizeView>
          }
        />
      </Routes>
    </>
  );
};

export default App;
