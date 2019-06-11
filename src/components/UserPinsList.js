import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { getPins } from '../api/pins';
import Emoji, { emojis } from './Emoji';

const PinList = styled.ul`
  list-style-type: none;
  padding: ${({ theme }) => theme.sizes.nil};
`;

const Pin = styled.li`
  margin: ${({ theme }) => theme.sizes.md} ${({ theme }) => theme.sizes.nil};
`;

function UserPinsList() {
  const [pins, setPins] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // TODO: make map interactive, show pin on map
  useEffect(() => {
    setIsLoading(true);
    getPins()
      .then(pins => setPins(pins))
      .catch(err => console.error(err))
      .then(() => setIsLoading(false));
  }, []);

  return isLoading ? (
    <p>
      <Emoji emoji={emojis.waiting} /> Loading...
    </p>
  ) : pins.length ? (
    <PinList>
      {pins.map(pin => (
        <Pin key={pin.id}>
          <Emoji emoji={emojis.pin} />
          <b>{pin.title}</b>
          <br />
          {pin.description}
        </Pin>
      ))}
    </PinList>
  ) : (
    <p>No pins.</p>
  );
}

export default UserPinsList;
