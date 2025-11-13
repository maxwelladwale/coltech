'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceFactory } from '@/lib/api/serviceFactory';
import type { IUser } from '@/lib/api/interfaces/types';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  resendVerification: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const authService = ServiceFactory.getAuthService();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedToken = localStorage.getItem('auth_token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));

          // Optionally verify token is still valid
          try {
            const currentUser = await authService.getCurrentUser(storedToken);
            setUser(currentUser);
          } catch (error) {
            // Token is invalid, clear it
            console.error('Token validation failed:', error);
            localStorage.removeItem('auth_token');
            localStorage.removeItem('user');
            setToken(null);
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Failed to load user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const result = await authService.login(email, password);
      setUser(result.user);
      setToken(result.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    fullName: string;
    phone: string;
  }) => {
    try {
      const result = await authService.register(data);
      setUser(result.user);
      setToken(result.token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (token) {
        await authService.logout(token);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
  };

  const refreshUser = async () => {
    if (!token) return;

    try {
      const currentUser = await authService.getCurrentUser(token);
      setUser(currentUser);
      localStorage.setItem('user', JSON.stringify(currentUser));
    } catch (error) {
      console.error('Failed to refresh user:', error);
      // If refresh fails, log out the user
      await logout();
    }
  };

  const resendVerification = async () => {
    if (!token) {
      throw new Error('No authentication token available');
    }

    try {
      await authService.resendVerification(token);
    } catch (error) {
      console.error('Failed to resend verification:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    isEmailVerified: !!user?.emailVerifiedAt,
    login,
    register,
    logout,
    refreshUser,
    resendVerification,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
