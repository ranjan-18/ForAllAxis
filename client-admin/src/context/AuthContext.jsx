import React, { createContext, useReducer, useEffect } from 'react';
import { authService  } from '../services';

export const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false, loading: true };
function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN': return { ...state, user: action.payload, isAuthenticated: true, loading: false };
    case 'LOGOUT': return { ...state, user: null, isAuthenticated: false, loading: false };
    case 'SET_LOADING': return { ...state, loading: action.payload };
    default: return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        dispatch({ type: 'LOGOUT' });
        return;
      }
      try {
        const { data } = await authService.getMe();
        dispatch({ type: 'LOGIN', payload: data.data });
      } catch {
        localStorage.removeItem('admin_token');
        dispatch({ type: 'LOGOUT' });
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    const { data } = await authService.login(credentials);
    const token = data.data?.token;
    if (token) localStorage.setItem('admin_token', token);
    dispatch({ type: 'LOGIN', payload: data.data });
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout request failed:', error);
    } finally {
      localStorage.removeItem('admin_token');
      dispatch({ type: 'LOGOUT' });
    }
  };

  return <AuthContext.Provider value={{ ...state, login, logout }}>{children}</AuthContext.Provider>;
}

