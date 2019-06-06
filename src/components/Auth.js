import React, { createContext, useEffect, useReducer } from 'react';
import { getUser, login, logout, signup } from '../api/auth';

const initialState = {
  isLoading: true,
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext({
  ...initialState,
  handleLogin: null,
  handleLogout: null,
});

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'login':
      return {
        isLoading: false,
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

  useEffect(() => {
    getUser()
      .then(user => dispatch({ type: 'login', payload: user }))
      .catch(err => console.error(err) || dispatch({ type: 'loading', payload: false }));
  }, []);

  async function handleLogin(email, password) {
    dispatch({ type: 'loading', payload: true });
    try {
      const user = await login(email, password);
      dispatch({ type: 'login', payload: user });
    } catch (err) {
      dispatch({ type: 'loading', payload: false });
      throw new Error(err);
    }
  }

  async function handleSignup(name, email, password) {
    dispatch({ type: 'loading', payload: true });
    try {
      const user = await signup(name, email, password);
      dispatch({ type: 'login', payload: user });
    } catch (err) {
      dispatch({ type: 'loading', payload: false });
      throw new Error(err);
    }
  }

  function handleLogout() {
    logout();
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ ...state, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
