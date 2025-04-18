
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/mockData';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phoneNumber: string) => Promise<User | null>;
  register: (name: string, phoneNumber: string, email?: string) => Promise<User>;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
  addRole: (role: UserRole) => Promise<User | null>;
  updateUserProfile: (data: Partial<User>) => Promise<User | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if user is authenticated in localStorage or session
    const storedUser = localStorage.getItem('skillink_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phoneNumber: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = authService.login(phoneNumber);
      if (user) {
        setUser(user);
        localStorage.setItem('skillink_user', JSON.stringify(user));
      }
      return user;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, phoneNumber: string, email?: string): Promise<User> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const newUser = authService.register(name, phoneNumber, email);
      setUser(newUser);
      localStorage.setItem('skillink_user', JSON.stringify(newUser));
      return newUser;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    localStorage.removeItem('skillink_user');
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      return authService.verifyOTP(otp);
    } finally {
      setIsLoading(false);
    }
  };

  const addRole = async (role: UserRole): Promise<User | null> => {
    if (!user) return null;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedUser = authService.addRole(user.id, role);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('skillink_user', JSON.stringify(updatedUser));
      }
      return updatedUser;
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserProfile = async (data: Partial<User>): Promise<User | null> => {
    if (!user) return null;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const updatedUser = authService.updateUserProfile(user.id, data);
      if (updatedUser) {
        setUser(updatedUser);
        localStorage.setItem('skillink_user', JSON.stringify(updatedUser));
      }
      return updatedUser;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      register, 
      logout, 
      verifyOTP,
      addRole,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
