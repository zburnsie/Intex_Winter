import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/movies" element={<MoviesPage />} />
        {/* You can add <Route path="/login" element={<LoginPage />} /> etc. later */}
      </Routes>
    </Router>
  );
};

export default App;



