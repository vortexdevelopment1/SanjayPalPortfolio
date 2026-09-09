import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AllProjects from './pages/AllProjects';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser, loading } = useAuth();
  if (loading) return null;
  return currentUser ? children : <Navigate to="/admin/login" />;
}

function AppRoutes() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<AllProjects />} />
      <Route path="/ProjectDetailModal" element={<AllProjects />} />
      <Route path="/admin/login" element={<Login />} />
      <Route path="/admin/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
