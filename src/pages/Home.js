import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components/macro';
import { AuthContext } from '../components/Auth';
import Emoji, { emojis } from '../components/Emoji';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.sizes.lg} ${({ theme }) => theme.sizes.md};
  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }
`;

function Home() {
  const auth = useContext(AuthContext);

  return (
    <Wrapper>
      {auth.isLoading ? (
        <p>
          <Emoji emoji={emojis.waiting} /> Loading...
        </p>
      ) : auth.isAuthenticated ? (
        <p>
          <Emoji emoji={emojis.wave} /> Welcome back, {auth.user.name}!
        </p>
      ) : (
        <Redirect to="/signup" />
      )}
    </Wrapper>
  );
}

export default Home;
