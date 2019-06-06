import React, { useContext } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AuthContext } from '../components/Auth';
import Emoji, { emojis } from './Emoji';

const Header = styled.header`
  background: black;
  color: white;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 0 30px;
`;

const Title = styled.h1`
  flex-grow: 1;
`;

function Navbar({ history }) {
  const auth = useContext(AuthContext);

  function handleLogin() {
    history.push('/login');
  }

  function handleSignup() {
    history.push('/signup');
  }

  function handleLogout() {
    auth.handleLogout();
    history.push('/login');
  }

  return (
    <Header>
      <Title>
        <Emoji emoji={emojis.worldMap} /> Locationiser
      </Title>
      {auth.isAuthenticated ? (
        <button onClick={handleLogout} disabled={auth.isLoading}>
          Logout
        </button>
      ) : (
        <>
          <button onClick={handleLogin} disabled={auth.isLoading}>
            Login
          </button>
          <button onClick={handleSignup} disabled={auth.isLoading}>
            Signup
          </button>
        </>
      )}
    </Header>
  );
}

export default withRouter(Navbar);
