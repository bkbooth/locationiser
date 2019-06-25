import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faLocation,
  faMapMarkerPlus,
  faSignOut,
  faSpinnerThird,
} from '@fortawesome/pro-solid-svg-icons';
import { useAuth } from 'components/Auth';
import Emoji, { emojis } from 'components/Emoji';
import { useMap } from 'components/Map';
import { SquareWhiteButton, WhiteButton } from 'components/styles/Button';
import worldMapEmoji from 'assets/world-map-emoji.png';
import PinsCount from '../PinsCount';
import PinsList from '../PinsList';
import * as S from './index.styles';

function UserToolbar() {
  const auth = useAuth();
  const map = useMap();
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleIsCollapsed() {
    setIsCollapsed(isCollapsed => !isCollapsed);
  }

  function handleAddPin() {
    map.addPin();
    setIsCollapsed(true);
  }

  function renderFullToolbar() {
    return (
      <>
        <S.Header>
          <S.Title>
            <S.Logo src={worldMapEmoji} alt="world map emoji" />
            locations
          </S.Title>
          <SquareWhiteButton onClick={toggleIsCollapsed} title="Hide sidebar">
            <FontAwesomeIcon icon={faBars} />
          </SquareWhiteButton>
        </S.Header>
        <S.Body>
          <WhiteButton
            onClick={map.locate}
            disabled={map.isLocating}
            isFullWidth={true}
            title="Locate user on map"
          >
            {map.isLocating ? (
              <>
                <FontAwesomeIcon icon={faSpinnerThird} spin={true} /> Locating user
              </>
            ) : (
              <>
                <FontAwesomeIcon icon={faLocation} /> Locate user
              </>
            )}
          </WhiteButton>
          <WhiteButton
            onClick={handleAddPin}
            disabled={map.isAddingPin}
            isFullWidth={true}
            title="Add a pin at the current location"
          >
            <FontAwesomeIcon icon={faMapMarkerPlus} /> Add pin
          </WhiteButton>
          <S.Intro>
            <Emoji emoji={emojis.wave} /> Welcome back, {auth.user.name}!
          </S.Intro>
          <PinsList closeUserToolbar={toggleIsCollapsed} />
        </S.Body>
        <S.Footer>
          <WhiteButton onClick={auth.handleLogout} isFullWidth={true}>
            <FontAwesomeIcon icon={faSignOut} rotation={180} /> Logout
          </WhiteButton>
        </S.Footer>
      </>
    );
  }

  function renderCollapsedToolbar() {
    return (
      <>
        <S.Header>
          <SquareWhiteButton onClick={toggleIsCollapsed} title="Show sidebar">
            <FontAwesomeIcon icon={faBars} />
          </SquareWhiteButton>
        </S.Header>
        <S.Body>
          <SquareWhiteButton
            onClick={map.locate}
            disabled={map.isLocating}
            title="Locate user on map"
          >
            {map.isLocating ? (
              <FontAwesomeIcon icon={faSpinnerThird} spin={true} />
            ) : (
              <FontAwesomeIcon icon={faLocation} size="lg" />
            )}
          </SquareWhiteButton>
          <SquareWhiteButton
            onClick={handleAddPin}
            disabled={map.isAddingPin}
            title="Add a pin at the current location"
          >
            <FontAwesomeIcon icon={faMapMarkerPlus} size="lg" />
          </SquareWhiteButton>
          <PinsCount />
        </S.Body>
        <S.Footer>
          <SquareWhiteButton onClick={auth.handleLogout} title="Logout">
            <FontAwesomeIcon icon={faSignOut} rotation={180} />
          </SquareWhiteButton>
        </S.Footer>
      </>
    );
  }

  return (
    <S.Wrapper isCollapsed={isCollapsed}>
      {isCollapsed ? renderCollapsedToolbar() : renderFullToolbar()}
    </S.Wrapper>
  );
}

export default UserToolbar;
