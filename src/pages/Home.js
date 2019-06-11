import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../components/Auth';
import { getRandomLocation, MapContext } from '../components/Map';
import Emoji, { emojis } from '../components/Emoji';
import UserToolbar from '../components/UserToolbar';
import { PageWrapper } from '../components/styles/PageWrapper';

function Home() {
  const auth = useContext(AuthContext);
  const map = useContext(MapContext);

  useEffect(() => {
    const { lat, lng, zoom } = getRandomLocation();
    map.setView([lat, lng], zoom);
  }, [map]);

  return (
    <>
      {auth.isLoading ? (
        <PageWrapper>
          <p>
            <Emoji emoji={emojis.waiting} /> Loading...
          </p>
        </PageWrapper>
      ) : auth.isAuthenticated ? (
        <UserToolbar />
      ) : (
        <Redirect to="/signup" />
      )}
    </>
  );
}

export default Home;
