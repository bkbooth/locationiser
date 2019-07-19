import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  isLoading: true,
  isAuthenticating: false,
  isAuthenticated: false,
  user: null,
  handleLogin: null,
  handleLogout: null,
  handleSignup: null,
});

export function useAuth() {
  return useContext(AuthContext);
}
