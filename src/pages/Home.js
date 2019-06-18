import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../components/Auth';
import { getRandomLocation, setMapInteractive, useMap } from '../components/Map';
import PageWrapper from '../components/PageWrapper';
import UserToolbar from '../components/UserToolbar';

function Home() {
  const { isAuthenticated, isLoading } = useAuth();
  const { map, pins } = useMap();

  useEffect(() => {
    if (isAuthenticated) {
      setMapInteractive(map, true);
      if (!pins.length) {
        map.locate({ setView: true });
      }
    } else if (!pins.length) {
      const { lat, lng, zoom } = getRandomLocation();
      map.setView([lat, lng], zoom);
    }
  }, [isAuthenticated, map, pins]);

  return (
    <>
      {isLoading ? (
        <PageWrapper>
          <p>
            <FontAwesomeIcon icon={faSpinner} spin={true} /> Loading...
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
