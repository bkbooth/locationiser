import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRandomLocation, useMap } from '../components/Map';
import PageWrapper from '../components/PageWrapper';
import { Heading } from '../components/styles/Heading';

function NotFound() {
  const map = useMap();

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
