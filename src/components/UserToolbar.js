import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components/macro';
import { useAuth } from './Auth';
import Emoji, { emojis } from './Emoji';
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
  margin: ${({ theme }) => theme.sizes.md} ${({ theme }) => theme.sizes.nil};
  padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.md};
  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
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
`;

function UserToolbar({ history }) {
  const auth = useAuth();
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
          <SquareWhiteButton onClick={toggleIsCollapsed}>
            <FontAwesomeIcon icon={faBars} />
          </SquareWhiteButton>
        </Header>
        <Body>
          <Intro>
            <Emoji emoji={emojis.wave} /> Welcome back, {auth.user.name}!
          </Intro>
          <UserPinsList />
        </Body>
        <Footer>
          <WhiteButton onClick={handleLogout} isFullWidth={true}>
            <FontAwesomeIcon icon={faSignOutAlt} rotation={180} /> Logout
          </WhiteButton>
        </Footer>
      </>
    );
  }

  function renderCollapsedToolbar() {
    return (
      <>
        <Header>
          <SquareWhiteButton onClick={toggleIsCollapsed}>
            <FontAwesomeIcon icon={faBars} />
          </SquareWhiteButton>
        </Header>
        <Body />
        <Footer>
          <SquareWhiteButton onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} rotation={180} />
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
