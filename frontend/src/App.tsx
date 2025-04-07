import ItemList from "./ItemList";
import AdminMoviePage from "./pages/AdminMoviePage";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import PrivacyPage from "./pages/PrivacyPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ItemList />} />
      <Route path="/adminpage" element={<AdminMoviePage />} />
      <Route path="/movies" element={<MoviesPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/create-account" element={<CreateAccountPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;
