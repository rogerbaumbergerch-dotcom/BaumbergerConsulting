import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiClient } from '@/api/base44Client';

const AuthContext = createContext();

/**
 * Authentication provider component for the application.
 *
 * Manages user authentication state and provides auth context to child components.
 * Initializes by checking stored authentication data on component mount.
 *
 * :param children: React child components
 * :type children: React.ReactNode
 * :return: AuthProvider component
 * :rtype: React.ReactNode
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(true);
  const [authError, setAuthError] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [appPublicSettings, setAppPublicSettings] = useState(null);

  useEffect(() => {
    checkAppState();
  }, []);

  /**
   * Check application state and user authentication.
   *
   * Verifies if user is authenticated and sets appropriate state.
   */
  const checkAppState = async () => {
    try {
      setIsLoadingPublicSettings(false);
      setAuthError(null);

      if (localStorage.getItem('app_token')) {
        await checkUserAuth();
      } else {
        setIsLoadingAuth(false);
        setIsAuthenticated(false);
        setAuthChecked(true);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      setAuthError({
        type: 'unknown',
        message: error.message || 'An unexpected error occurred',
      });
      setIsLoadingAuth(false);
    }
  };

  /**
   * Check if current user is authenticated.
   *
   * Attempts to load user from API. Sets authentication state accordingly.
   */
  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      const currentUser = await apiClient.auth.me();
      setUser(currentUser);
      setIsAuthenticated(true);
      setAuthChecked(true);
    } catch (error) {
      console.error('User auth check failed:', error);
      setIsAuthenticated(false);
      setAuthChecked(true);
      setAuthError({
        type: 'auth_required',
        message: 'Authentication required',
      });
    } finally {
      setIsLoadingAuth(false);
    }
  };

  /**
   * Log out the current user.
   *
   * Clears user state and removes authentication data from storage.
   */
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    apiClient.auth.logout();
  };

  /**
   * Navigate user to login page.
   */
  const navigateToLogin = () => {
    window.location.href = '/login';
  };

  const contextValue = {
    user,
    isAuthenticated,
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    appPublicSettings,
    authChecked,
    logout,
    navigateToLogin,
    checkUserAuth,
    checkAppState,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook to access authentication context.
 *
 * :return: Authentication context object
 * :rtype: Object
 * :raises: Error if used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
