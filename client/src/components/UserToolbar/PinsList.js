import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import { theme } from 'utils/theme';
import { useMap } from 'components/Map';
import * as S from './PinsList.styles';

function PinsList({ closeUserToolbar }) {
  const { isLoading, pins, selectPin } = useMap();

  function handlePinClick(pin) {
    return e => {
      e.preventDefault();
      selectPin(pin);
      closeUserToolbar();
    };
  }

  return isLoading ? (
    <p>
      <FontAwesomeIcon icon={faSpinnerThird} spin={true} /> Loading...
    </p>
  ) : pins.length ? (
    <S.PinList>
      {pins.map(pin => (
        <S.Pin key={pin.id}>
          <S.UnstyledLink onClick={handlePinClick(pin)} href="#">
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              color={theme.colours.secondary['500']}
              style={{ marginRight: theme.sizes.xs }}
            />
            <b>{pin.title}</b>
            <S.Truncated>{pin.description}</S.Truncated>
          </S.UnstyledLink>
        </S.Pin>
      ))}
    </S.PinList>
  ) : (
    <p>No pins.</p>
  );
}

export default PinsList;
