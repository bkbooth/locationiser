import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../components/Auth';
import Emoji, { emojis } from '../components/Emoji';
import { PageWrapper } from '../components/styles/PageWrapper';

function Home() {
  const auth = useContext(AuthContext);

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}

export default Home;
