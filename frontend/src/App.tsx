import React, { useContext } from 'react';
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
import AuthorizeView, {
  AuthorizedUser,
  UserContext,
} from './components/AuthorizeView';
import Logout from './components/Logout';

const App: React.FC = () => {
  const [user, , loading] = useContext(UserContext);
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  if (loading && !isLanding && !isLogin && !isRegister) {
    console.log('Waiting for user to load...');
    return <p>Loading user info...</p>;
  }

  return (
    <>
      {/* Hide nav bar on landing page */}
      {!isLanding && (
        <>
          <nav className="custom-navbar">
            {/* <Link to="/" className="navbar-logo">
              <span className="logo-red">CINE</span>
              <span className="logo-white">NICHE</span>
            </Link> */}
            <Link to="/" className="navbar-logo">
              <img src="/newlogo.png" alt="CineNiche Logo" className="logo-image" style={{ height: '120px', width: 'auto', display: 'block' }}/>
            </Link>
            <div className="navbar-links">
              <Link to="/">Home</Link>
              {/* <Link to="/adminpage">Admin</Link>
              <Link to="/movies">Movies</Link> */}
              {/* <Link to="/login">Login</Link>
              <Link to="/register">Register</Link> */}
              {user.email ? (
                <>
                  <Link to="/adminpage">Admin</Link>
                  <Link to="/movies">Movies</Link>
                </>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/register">Register</Link>
                </>
              )}
            </div>
          </nav>
          {/* Logout button below navbar */}
          {/* Logout only shows when logged in AND not on login/register/landing pages */}
          {user.email && !isLanding && !isLogin && !isRegister && (
            <div className="container-fluid">
              <div className="d-flex justify-content-end pe-4 mt-2">
                <Logout>
                  Logout <AuthorizedUser value="email" />
                </Logout>
              </div>
            </div>
          )}
        </>
      )}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movie/:showId" element={<MovieDetailPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* You can add more routes here */}
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

