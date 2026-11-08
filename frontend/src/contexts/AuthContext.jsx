import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, getUserById } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, restore session
  useEffect(() => {
    const token = localStorage.getItem('dhv_token');
    const userId = localStorage.getItem('dhv_userId');
    if (token && userId) {
      getUserById(userId)
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('dhv_token');
          localStorage.removeItem('dhv_userId');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email, password) => {
    const res = await apiLogin(email, password);
    const { token, user } = res.data;
    localStorage.setItem('dhv_token', token);
    localStorage.setItem('dhv_userId', user.id);
    setUser(user);
    return user;
  }, []);

  const register = useCallback(async (data) => {
    const res = await apiRegister(data);
    const { token, user } = res.data;
    localStorage.setItem('dhv_token', token);
    localStorage.setItem('dhv_userId', user.id);
    setUser(user);
    return user;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('dhv_token');
    localStorage.removeItem('dhv_userId');
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!user) return;
    const res = await getUserById(user.id);
    setUser(res.data);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

