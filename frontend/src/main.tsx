import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import UserProvider from './components/UserContextProvider'; // 👈 adjust path if needed

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider> {/* 👈 Global user context */}
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);