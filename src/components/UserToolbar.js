import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faLocation, faSignOut, faSpinnerThird } from '@fortawesome/pro-solid-svg-icons';
import styled from 'styled-components/macro';
import { useAuth } from './Auth';
import Emoji, { emojis } from './Emoji';
import { useMap } from './Map';
import UserPinsList from './UserPinsList';
import { WhiteButton } from './styles/Button';
import worldMapEmoji from '../assets/world-map-emoji.png';

const EXTRA_WIDTH = '376px';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ isCollapsed }) => (isCollapsed ? '60px' : '85%')};
  height: 100%;
  overflow-y: hidden;
  background: rgba(251, 251, 251, 0.7);
  box-shadow: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.nil}
    ${({ theme }) => theme.sizes.xl} rgba(0, 0, 0, 0.3);

  @media screen and (min-width: ${EXTRA_WIDTH}) {
    width: ${({ isCollapsed }) => (isCollapsed ? '80px' : '320px')};
  }
`;

const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.sm};
  background: ${({ theme }) => theme.colours.primary['500']};
  color: ${({ theme }) => theme.colours.shade['900']};

  @media screen and (min-width: ${EXTRA_WIDTH}) {
    height: 70px;
    padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.md};
  }
`;

const Footer = styled.footer`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.sm};

  @media screen and (min-width: ${EXTRA_WIDTH}) {
    height: 70px;
    padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.md};
  }
`;

const Body = styled.main`
  flex: 1;
  overflow-y: auto;
  margin: ${({ theme }) => theme.sizes.sm} ${({ theme }) => theme.sizes.nil};
  padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.sm};
  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }

  @media screen and (min-width: ${EXTRA_WIDTH}) {
    margin: ${({ theme }) => theme.sizes.md} ${({ theme }) => theme.sizes.nil};
    padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.md};
  }
`;

const SquareWhiteButton = styled(WhiteButton)`
  width: ${({ theme }) => theme.sizes.xl};
  height: ${({ theme }) => theme.sizes.xl};
  padding: ${({ theme }) => theme.sizes.sm};
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.sizes.nil};
  font-size: 1.7rem;
  letter-spacing: 0.05rem;
`;

const Logo = styled.img`
  width: ${({ theme }) => theme.sizes.xl};
  height: auto;
  margin-right: ${({ theme }) => theme.sizes.sm};
`;

const Intro = styled.p`
  height: ${({ theme }) => theme.sizes.xl};
  line-height: ${({ theme }) => theme.sizes.xl};
  margin-top: ${({ theme }) => theme.sizes.nil};
  margin-bottom: ${({ theme }) => theme.sizes.md};
`;

function UserToolbar({ history }) {
  const auth = useAuth();
  const map = useMap();
  const [isCollapsed, setIsCollapsed] = useState(true);

  function toggleIsCollapsed() {
    setIsCollapsed(isCollapsed => !isCollapsed);
  }

  function handleLogout() {
    auth.handleLogout();
    history.push('/login');
  }

  function renderFullToolbar() {
    return (
      <>
        <Header>
          <Title>
            <Logo src={worldMapEmoji} alt="world map emoji" />
            locations
          </Title>
          <SquareWhiteButton onClick={toggleIsCollapsed} title="Hide sidebar">
            <FontAwesomeIcon icon={faBars} />
          </SquareWhiteButton>
        </Header>
        <Body>
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
          <Intro>
            <Emoji emoji={emojis.wave} /> Welcome back, {auth.user.name}!
          </Intro>
          <UserPinsList closeUserToolbar={toggleIsCollapsed} />
        </Body>
        <Footer>
          <WhiteButton onClick={handleLogout} isFullWidth={true}>
            <FontAwesomeIcon icon={faSignOut} rotation={180} /> Logout
          </WhiteButton>
        </Footer>
      </>
    );
  }

  function renderCollapsedToolbar() {
    return (
      <>
        <Header>
          <SquareWhiteButton onClick={toggleIsCollapsed} title="Show sidebar">
            <FontAwesomeIcon icon={faBars} />
          </SquareWhiteButton>
        </Header>
        <Body>
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
        </Body>
        <Footer>
          <SquareWhiteButton onClick={handleLogout} title="Logout">
            <FontAwesomeIcon icon={faSignOut} rotation={180} />
          </SquareWhiteButton>
        </Footer>
      </>
    );
  }

  return (
    <Wrapper isCollapsed={isCollapsed}>
      {isCollapsed ? renderCollapsedToolbar() : renderFullToolbar()}
    </Wrapper>
  );
}

export default withRouter(UserToolbar);
