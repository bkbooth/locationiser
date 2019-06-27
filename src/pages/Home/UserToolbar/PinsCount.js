import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/pro-solid-svg-icons';
import { theme } from 'utils/theme';
import { useMap } from 'components/Map';
import * as S from './PinsCount.styles';

function PinsCount({ disabled, onClick }) {
  const { isLoading, pins } = useMap();

  return (
    <S.Button
      onClick={onClick}
      disabled={disabled}
      title={(isLoading ? 'Number of' : pins.length) + ' pins'}
    >
      <FontAwesomeIcon
        icon={faMapMarker}
        size="2x"
        transform="grow-4"
        color={theme.colours.primary['500']}
      />
      {!isLoading && <S.Badge>{pins.length}</S.Badge>}
    </S.Button>
  );
}

export default PinsCount;
