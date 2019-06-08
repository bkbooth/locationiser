import React from 'react';
import Emoji, { emojis } from './Emoji';
import { PageWrapper } from './styles/PageWrapper';

function SuspenseFallback() {
  return (
    <PageWrapper>
      <p>
        <Emoji emoji={emojis.waiting} /> Loading...
      </p>
    </PageWrapper>
  );
}

export default SuspenseFallback;
