
import ItemList from "./ItemList";
import AdminMoviePage from "./pages/AdminMoviePage";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MoviesPage from './pages/MoviesPage';
import PrivacyPage from "./pages/PrivacyPage";


const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<ItemList />} />
        <Route path="/adminpage" element={<AdminMoviePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        {/* You can add <Route path="/login" element={<LoginPage />} /> etc. later */}
      </Routes>
    </Router>
  );
};

export default App;
