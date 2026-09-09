import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAdmin, logout as logoutApi, isAuthenticated } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists on mount
    if (isAuthenticated()) {
      setCurrentUser({ email: 'admin' });
    }
    setLoading(false);
  }, []);

  async function login(email, password) {
    await loginAdmin(email, password);
    setCurrentUser({ email });
  }

  function logout() {
    logoutApi();
    setCurrentUser(null);
  }

  const value = {
    currentUser,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
