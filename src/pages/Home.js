import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../components/Auth';
import { getRandomLocation, setMapInteractive, MapContext } from '../components/Map';
import Emoji, { emojis } from '../components/Emoji';
import UserToolbar from '../components/UserToolbar';
import { PageWrapper } from '../components/styles/PageWrapper';

function Home() {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const map = useContext(MapContext);

  useEffect(() => {
    if (isAuthenticated) {
      setMapInteractive(map, true);
    } else {
      const { lat, lng, zoom } = getRandomLocation();
      map.setView([lat, lng], zoom);
    }
  }, [isAuthenticated, map]);

  return (
    <>
      {isLoading ? (
        <PageWrapper>
          <p>
            <Emoji emoji={emojis.waiting} /> Loading...
          </p>
        </PageWrapper>
      ) : isAuthenticated ? (
        <UserToolbar />
      ) : (
        <Redirect to="/signup" />
      )}
    </>
  );
}

export default Home;
