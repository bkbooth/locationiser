import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import PageWrapper from './PageWrapper';

function SuspenseFallback() {
  return (
    <PageWrapper>
      <p>
        <FontAwesomeIcon icon={faSpinnerThird} spin={true} /> Loading...
      </p>
    </PageWrapper>
  );
}

export default SuspenseFallback;
