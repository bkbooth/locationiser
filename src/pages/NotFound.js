import React from 'react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/styles/PageWrapper';

function NotFound() {
  return (
    <PageWrapper>
      <h1>Page not found</h1>
      <p>
        We couldn't find the page you're looking for. Back to <Link to="/">home</Link>.
      </p>
    </PageWrapper>
  );
}

export default NotFound;
