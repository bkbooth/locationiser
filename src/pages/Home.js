import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../components/Auth';
import Emoji, { emojis } from '../components/Emoji';
import { getRandomLocation, setMapInteractive, useMap } from '../components/Map';
import UserToolbar from '../components/UserToolbar';
import { PageWrapper } from '../components/styles/PageWrapper';

function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const map = useMap();

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
