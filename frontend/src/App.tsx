import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/Landing';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ItemList from './ItemList';
import AdminMoviePage from './pages/AdminMoviePage';
import MoviesPage from './pages/MoviesPage';
import PrivacyPage from "./pages/PrivacyPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/itemlist" element={<ItemList />} />
      <Route path="/adminpage" element={<AdminMoviePage />} />
      <Route path="/movies" element={<MoviesPage />} />
    </Routes>
  );
};

export default App;
