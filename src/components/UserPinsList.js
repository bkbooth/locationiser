import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import L from 'leaflet';
import styled from 'styled-components/macro';
import { theme } from '../utils/theme';
import { useMap } from './Map';

const PinList = styled.ul`
  list-style-type: none;
  padding: ${({ theme }) => theme.sizes.nil};
`;

const Pin = styled.li`
  margin: ${({ theme }) => theme.sizes.md} ${({ theme }) => theme.sizes.nil};
`;

function UserPinsList() {
  const { isLoading, map, markers, pins } = useMap();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (isFirstLoad && map && markers.length) {
      map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [40, 40] });
      setIsFirstLoad(false);
    }
  }, [isFirstLoad, map, markers]);

  return isLoading ? (
    <p>
      <FontAwesomeIcon icon={faSpinner} spin={true} /> Loading...
    </p>
  ) : pins.length ? (
    <PinList>
      {pins.map(pin => (
        <Pin key={pin.id}>
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            color={theme.colours.primary['500']}
            style={{ marginRight: theme.sizes.xs }}
          />
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
