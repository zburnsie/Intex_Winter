
import LandingPage from './pages/Landing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import ItemList from "./ItemList";
import AdminMoviePage from "./pages/AdminMoviePage";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';


const App: React.FC = () => {
  return (

    <Router>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ItemList />} />
        <Route path="/adminpage" element={<AdminMoviePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        {/* You can add <Route path="/login" element={<LoginPage />} /> etc. later */}
      </Routes>
    </Router>
  );
};

export default App;
