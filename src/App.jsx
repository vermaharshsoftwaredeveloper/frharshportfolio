// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/main.css';
import './styles/layout.css';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={user ? <Admin /> : <Navigate to="/login" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/admin" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/admin" />} />
      </Routes>
    </div>
  );
}

export default App;