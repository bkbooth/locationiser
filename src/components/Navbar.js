import React, { useContext } from 'react';
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

function Navbar() {
  const auth = useContext(AuthContext);

  return (
    <Header>
      <Title>
        <Emoji emoji={emojis.worldMap} /> Locationiser
      </Title>
      {auth.isAuthenticated ? (
        <button onClick={auth.handleLogout}>Logout</button>
      ) : (
        <button onClick={() => auth.handleLogin('mario@example.com', 'mario123')}>Login</button>
      )}
    </Header>
  );
}

export default Navbar;
