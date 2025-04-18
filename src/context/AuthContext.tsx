
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
    // Check if user is authenticated in localStorage
    const loadUserFromStorage = () => {
      try {
        const storedUser = localStorage.getItem('skillink_user');
        if (storedUser) {
          // Parse the stored user data, ensuring dates are properly handled
          const parsedUser = JSON.parse(storedUser, (key, value) => {
            // Convert date strings back to Date objects
            if (key === 'createdAt' && typeof value === 'string') {
              return new Date(value);
            }
            return value;
          });
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        // Clear potentially corrupted data
        localStorage.removeItem('skillink_user');
      } finally {
        setIsLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('skillink_user', JSON.stringify(user));
    }
  }, [user]);

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
    } catch (error) {
      console.error('Login error:', error);
      return null;
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
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
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
    } catch (error) {
      console.error('OTP verification error:', error);
      return false;
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
    } catch (error) {
      console.error('Add role error:', error);
      return null;
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
    } catch (error) {
      console.error('Update profile error:', error);
      return null;
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
