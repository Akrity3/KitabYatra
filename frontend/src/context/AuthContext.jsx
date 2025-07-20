import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const AuthContext = createContext();

// API base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is logged in
  const isLoggedIn = !!token && !!user;

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          if (response.ok) {
            const data = await response.json();
            setUser(data.data.user);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, [token]);

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('token', data.data.token);
        return { success: true, data: data.data };
      } else {
        setError(data.message || 'Registration failed');
        return { success: false, error: data.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Login user
  const login = async (credentials) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('token', data.data.token);
        return { success: true, data: data.data };
      } else {
        setError(data.message || 'Login failed');
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Admin login
  const adminLogin = async (credentials) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/admin-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('token', data.data.token);
        return { success: true, data: data.data };
      } else {
        setError(data.message || 'Admin login failed');
        return { success: false, error: data.message || 'Admin login failed' };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Logout user
  const logout = async () => {
    try {
      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('token');
    }
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const formData = new FormData();
      
      // Add profile data to form
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== undefined && profileData[key] !== null) {
          formData.append(key, profileData[key]);
        }
      });

      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.data.user);
        return { success: true, data: data.data };
      } else {
        setError(data.message || 'Profile update failed');
        return { success: false, error: data.message || 'Profile update failed' };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(passwordData)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data: data.data };
      } else {
        setError(data.message || 'Password change failed');
        return { success: false, error: data.message || 'Password change failed' };
      }
    } catch (error) {
      console.error('Password change error:', error);
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data: data.data };
      } else {
        setError(data.message || 'Password reset failed');
        return { success: false, error: data.message || 'Password reset failed' };
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Reset password
  const resetPassword = async (resetData) => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resetData)
      });

      const data = await response.json();

      if (response.ok) {
        return { success: true, data: data.data };
      } else {
        setError(data.message || 'Password reset failed');
        return { success: false, error: data.message || 'Password reset failed' };
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Network error. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    }
  };

  // Clear error
  const clearError = () => {
    setError(null);
  };

  const value = {
    user,
    token,
    isLoggedIn,
    loading,
    error,
    register,
    login,
    adminLogin,
    logout,
    updateProfile,
    changePassword,
    forgotPassword,
    resetPassword,
    clearError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy use
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
