import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import LandingPage from './pages/Landing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminMoviePage from './pages/AdminMoviePage';
import MoviesPage from './pages/MoviesPage';
import PrivacyPage from "./pages/PrivacyPage";

const App: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (

    <>
      {/* Hide nav bar on landing page */}
      {!isLanding && (
  <nav className="bg-black text-white px-8 py-4 flex items-center justify-between sticky top-0 z-50">
    <div className="text-2xl font-extrabold tracking-tight text-red-600">
      CINE<span className="text-white">NICHE</span>
    </div>
    <div className="flex gap-6 text-sm font-medium">
      <Link to="/" className="hover:text-red-500 transition-colors">Home</Link>
      <Link to="/adminpage" className="hover:text-red-500 transition-colors">Admin</Link>
      <Link to="/movies" className="hover:text-red-500 transition-colors">Movies</Link>
      <Link to="/login" className="hover:text-red-500 transition-colors">Login</Link>
      <Link to="/register" className="hover:text-red-500 transition-colors">Register</Link>
    </div>
  </nav>
)}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/adminpage" element={<AdminMoviePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </>

  );
};

export default App;

