import AdminMoviePage from "./pages/AdminMoviePage";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import Landing from './pages/Landing';

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <nav style={{ padding: '1rem', background: '#eee', marginBottom: '1rem', display: 'flex', gap: '1rem' }}>
          <Link to="/">Home</Link>
          <Link to="/adminpage">Admin Movie Page</Link>
          <Link to="/api/movie/AllMovies">Browse Movies</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/adminpage" element={<AdminMoviePage />} />
          <Route path="/api/movie/AllMovies" element={<MoviesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;