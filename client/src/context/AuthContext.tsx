import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { api } from '../api/client';

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
  switchRoleDemo: (role: 'STUDENT' | 'ADMIN' | 'INTERVIEWER') => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('placementprep_token'));
  const [loading, setLoading] = useState<boolean>(true);

  const refreshUser = async () => {
    try {
      if (!localStorage.getItem('placementprep_token')) {
        setUser(null);
        setLoading(false);
        return;
      }
      const data = await api.get<User>('/auth/me');
      setUser(data);
    } catch (err) {
      console.error('Failed to load user profile', err);
      localStorage.removeItem('placementprep_token');
      setUser(null);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('placementprep_token', newToken);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('placementprep_token');
    setToken(null);
    setUser(null);
  };

  const switchRoleDemo = async (role: 'STUDENT' | 'ADMIN' | 'INTERVIEWER') => {
    const creds = {
      STUDENT: { email: 'student@placementprep.com', password: 'Student@123' },
      ADMIN: { email: 'admin@placementprep.com', password: 'Admin@123' },
      INTERVIEWER: { email: 'mentor@placementprep.com', password: 'Mentor@123' },
    }[role];

    try {
      setLoading(true);
      const res = await api.post<{ token: string; user: User }>('/auth/login', creds);
      login(res.token, res.user);
    } catch (err) {
      console.error('Switch role failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, refreshUser, switchRoleDemo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
