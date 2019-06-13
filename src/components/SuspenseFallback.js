import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from './PageWrapper';

function SuspenseFallback() {
  return (
    <PageWrapper>
      <p>
        <FontAwesomeIcon icon={faSpinner} spin={true} /> Loading...
      </p>
    </PageWrapper>
  );
}

export default SuspenseFallback;
