import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { getUser, login, logout, signup } from '../api/auth';
import { useMap } from './Map';

const initialState = {
  isLoading: true,
  isAuthenticating: false,
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  handleLogin: null,
  handleLogout: null,
  handleSignup: null,
});

export function useAuth() {
  return useContext(AuthContext);
}

function reducer(state, action) {
  switch (action.type) {
    case 'authenticating':
      return {
        ...state,
        isAuthenticating: action.payload,
      };
    case 'login':
      return {
        isLoading: false,
        isAuthenticating: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'logout':
      return { ...initialState, isLoading: false };
    default:
      throw new Error('Unknown Auth reducer action');
  }
}

function Auth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const map = useMap();

  useEffect(() => {
    getUser()
      .then(user => dispatch({ type: 'login', payload: user }))
      .then(() => map.loadPins())
      .catch(err => console.error(err) || dispatch({ type: 'logout' }));
  }, []);

  async function handleLogin(email, password) {
    dispatch({ type: 'authenticating', payload: true });
    try {
      const user = await login(email, password);
      dispatch({ type: 'login', payload: user });
      map.loadPins();
    } catch (err) {
      dispatch({ type: 'authenticating', payload: false });
      throw new Error(err);
    }
  }

  async function handleSignup(name, email, password) {
    dispatch({ type: 'authenticating', payload: true });
    try {
      const user = await signup(name, email, password);
      dispatch({ type: 'login', payload: user });
      map.loadPins();
    } catch (err) {
      dispatch({ type: 'authenticating', payload: false });
      throw new Error(err);
    }
  }

  function handleLogout() {
    logout();
    dispatch({ type: 'logout' });
    map.clearPins();
  }

  return (
    <AuthContext.Provider value={{ ...state, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
