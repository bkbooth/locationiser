import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
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

const UnstyledLink = styled.a`
  color: unset;
  text-decoration: none;
`;

const Truncated = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function UserPinsList({ closeUserToolbar }) {
  const { isLoading, pins, showPin } = useMap();

  function handlePinClick(e) {
    e.preventDefault();
    showPin(e.currentTarget.dataset.pinId);
    closeUserToolbar();
  }

  return isLoading ? (
    <p>
      <FontAwesomeIcon icon={faSpinnerThird} spin={true} /> Loading...
    </p>
  ) : pins.length ? (
    <PinList>
      {pins.map(pin => (
        <Pin key={pin.id}>
          <UnstyledLink onClick={handlePinClick} data-pin-id={pin.id} href="#">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              color={theme.colours.primary['500']}
              style={{ marginRight: theme.sizes.xs }}
            />
            <b>{pin.title}</b>
            <Truncated>{pin.description}</Truncated>
          </UnstyledLink>
        </Pin>
      ))}
    </PinList>
  ) : (
    <p>No pins.</p>
  );
}

export default UserPinsList;
