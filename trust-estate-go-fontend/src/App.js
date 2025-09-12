import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PropertyProvider, useProperty } from './contexts/PropertyContext';
import { mockProperties } from './data/mockData';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Rentals from './pages/Rentals';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import useAuth from './hooks/useAuth';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

// App Content Component
const AppContent = () => {
  const { setProperties } = useProperty();

  useEffect(() => {
    setProperties(mockProperties);
  }, [setProperties]);

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9ff' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/rentals" element={<Rentals />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/saved" element={
          <ProtectedRoute>
            <Saved />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer />
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <AuthProvider>
        <PropertyProvider>
          <AppContent />
        </PropertyProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;