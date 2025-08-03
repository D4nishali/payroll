import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      setLoading(true);
      setError('');
      
      const response = await api.login(credentials);
      
      // Store token
      localStorage.setItem('token', response.access_token);
      
      // Get user profile
      const userProfile = await api.getProfile();
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userProfile));
      setUser(userProfile);
      
      return userProfile;
    } catch (err) {
      const errorMessage = err.response?.data?.detail || 'Login failed';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError('');
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    setError
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};