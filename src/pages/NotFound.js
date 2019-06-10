import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomLocation, MapContext } from '../components/Map';
import { Heading } from '../components/styles/Heading';
import { PageWrapper } from '../components/styles/PageWrapper';

function NotFound() {
  const map = useContext(MapContext);

  useEffect(() => {
    const { lat, lng, zoom } = getRandomLocation();
    map.setView([lat, lng], zoom);
  }, [map]);

  return (
    <PageWrapper>
      <Heading>Page not found</Heading>
      <p>
        We couldn't find the page you're looking for. Back to <Link to="/">home</Link>.
      </p>
    </PageWrapper>
  );
}

export default NotFound;
