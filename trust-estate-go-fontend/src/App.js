import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PropertyProvider, useProperty } from './contexts/PropertyContext';
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
import PropertyDetail from './pages/PropertyDetail';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return user ? children : <Navigate to="/login" />;
};

const AppContent = () => {
  const { loading, error } = useProperty();

  if (loading) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9ff' }}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/:slug" element={<Properties />} />

        {/* <Route path="/rentals" element={<Rentals />} /> */}
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