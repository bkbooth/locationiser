import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarker } from '@fortawesome/pro-solid-svg-icons';
import { theme } from 'utils/theme';
import { useMap } from 'components/Map';
import * as S from './index.styles';

function PinsCount() {
  const { isLoading, pins } = useMap();

  return (
    <S.Wrapper title={(isLoading ? 'Number of' : pins.length) + ' pins'}>
      <FontAwesomeIcon icon={faMapMarker} size="2x" color={theme.colours.primary['600']} />
      {!isLoading && <S.Badge>{pins.length}</S.Badge>}
    </S.Wrapper>
  );
}

export default PinsCount;
