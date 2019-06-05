import React, { createContext, useEffect, useReducer } from 'react';
import { getUser, login, logout } from '../api/auth';

const initialState = {
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
    case 'login':
      return {
        isAuthenticated: true,
        user: action.payload,
      };
    case 'logout':
      return initialState;
    default:
      throw new Error();
  }
}

function Auth({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getUser()
      .then(user => dispatch({ type: 'login', payload: user }))
      .catch(err => console.error(err));
  }, []);

  async function handleLogin(email, password) {
    try {
      const user = await login(email, password);
      dispatch({ type: 'login', payload: user });
    } catch (err) {
      // TODO: handle failed login
      console.log(err);
    }
  }

  function handleLogout() {
    logout();
    dispatch({ type: 'logout' });
  }

  return (
    <AuthContext.Provider value={{ ...state, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default Auth;
