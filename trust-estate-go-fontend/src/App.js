import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useProperty } from './contexts/PropertyContext';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Saved from './pages/Saved';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import useAuth from './hooks/useAuth';
import PropertyDetail from './pages/PropertyDetail';
import Packages from './pages/Packages';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCancel from './pages/PaymentCancel';
import PaymentHistory from './pages/PaymentHistory';
import Chat from './pages/Chat';
import ChatRoom from './pages/ChatRoom';
import ChatList from './pages/ChatList';
import CreateEditProperty from './pages/CreateEditProperty';
import SellerPropertyList from './pages/SellerPropertyList';
import "./styles/index.css"
import ScrollToTop from './components/ScrollToTop';

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
      <ScrollToTop />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
        <Route path="/:slug" element={<Properties />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-cancel" element={<PaymentCancel />} />
        <Route path="/my-properties" element={
          <ProtectedRoute>
            <SellerPropertyList />
          </ProtectedRoute>
        } />
        <Route path="/properties/create" element={
          <ProtectedRoute>
            <CreateEditProperty />
          </ProtectedRoute>
        } />
        <Route path="/properties/edit/:propertyId" element={
          <ProtectedRoute>
            <CreateEditProperty />
          </ProtectedRoute>
        } />
        <Route path="/chat" element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        } />
        <Route path="/chat/:roomId" element={
          <ProtectedRoute>
            <ChatRoom />
          </ProtectedRoute>
        } />
        <Route path="/chat/rooms" element={
          <ProtectedRoute>
            <ChatList />
          </ProtectedRoute>
        } />
        <Route path="/saved" element={
          <ProtectedRoute>
            <Saved />
          </ProtectedRoute>
        } />
        <Route path="/packages" element={
          <ProtectedRoute>
            <Packages />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/payments/history" element={
          <ProtectedRoute>
            <PaymentHistory />
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
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;