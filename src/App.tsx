import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import Login from './components/Login/Login';
import HomePage from './components/HomePage/HomePage';
import TeamPlayers from './components/TeamPlayers/TeamPlayers';
import Header from './components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Header />
          <main className="app__main">
            <Routes>
              <Route
                path="/home"
                element={
                  <PrivateRoute>
                    <HomePage />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route
                path="/team/:teamId/:teamName"
                element={
                  <PrivateRoute>
                    <TeamPlayers />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/home" />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
