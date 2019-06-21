import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/pro-solid-svg-icons';
import styled from 'styled-components/macro';
import { theme } from '../utils/theme';
import { useMap } from './Map';

const Wrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${({ theme }) => theme.colours.shade['900']};
  text-align: center;
  font-size: 0.85rem;
  line-height: 32px;
`;

function UserPinsCount() {
  const { isLoading, pins } = useMap();

  return (
    <Wrapper title={(isLoading ? 'User' : `${pins.length} user`) + ' pins'}>
      <FontAwesomeIcon icon={faMapMarker} size="2x" color={theme.colours.primary['600']} />
      {!isLoading && <Badge>{pins.length}</Badge>}
    </Wrapper>
  );
}

export default UserPinsCount;
