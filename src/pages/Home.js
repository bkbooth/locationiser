import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../components/Auth';
import Emoji, { emojis } from '../components/Emoji';

function Home() {
  const auth = useContext(AuthContext);

  return auth.isLoading ? (
    <p>
      <Emoji emoji={emojis.waiting} /> Loading...
    </p>
  ) : auth.isAuthenticated ? (
    <p>
      <Emoji emoji={emojis.wave} /> Welcome back, {auth.user.name}!
    </p>
  ) : (
    <p>
      <Emoji emoji={emojis.wave} /> Hi there! Please <Link to="/login">login</Link>.
    </p>
  );
}

export default Home;
