import React, { useEffect } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import { useAuth } from 'components/Auth';
import { getRandomLocation, setMapInteractive, useMap } from 'components/Map';
import PageWrapper from 'components/PageWrapper';
import UserToolbar from 'components/UserToolbar';

function Home({ location }) {
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
            <FontAwesomeIcon icon={faSpinnerThird} spin={true} /> Loading...
          </p>
        </PageWrapper>
      ) : isAuthenticated ? (
        <UserToolbar />
      ) : (
        <Redirect
          to={{ pathname: '/signup', search: `?redirectTo=${location.pathname}${location.search}` }}
        />
      )}
    </>
  );
}

export default withRouter(Home);
