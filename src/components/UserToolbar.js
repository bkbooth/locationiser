import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components/macro';
import { useAuth } from './Auth';
import Emoji, { emojis } from './Emoji';
import UserPinsList from './UserPinsList';
import { WhiteButton } from './styles/Button';

const TOOLBAR_WIDTH = 400;
const TOOLBAR_COLLAPSED_WIDTH = 80;

const ToggleButton = styled(WhiteButton)`
  position: absolute;
  top: ${({ theme }) => theme.sizes.lg};
  right: ${({ theme }) => theme.sizes.md};
  width: ${({ theme }) => theme.sizes.xl};
  height: ${({ theme }) => theme.sizes.xl};
  padding: ${({ theme }) => theme.sizes.sm};
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  width: ${({ isCollapsed }) => (isCollapsed ? `${TOOLBAR_COLLAPSED_WIDTH}px` : '100%')};
  height: 100%;
  overflow-y: auto;
  background: ${({ theme }) => theme.colours.shade['900']};
  padding: ${({ theme }) => theme.sizes.lg} ${({ theme }) => theme.sizes.md};
  box-shadow: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.nil}
    ${({ theme }) => theme.sizes.xl} rgba(0, 0, 0, 0.3);

  @media screen and (min-width: ${TOOLBAR_WIDTH}px) {
    width: ${({ isCollapsed }) => (isCollapsed ? TOOLBAR_COLLAPSED_WIDTH : TOOLBAR_WIDTH)}px;
  }

  > *:not(${ToggleButton}) {
    ${({ isCollapsed }) => isCollapsed && 'display: none'};
  }

  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }
`;

const Intro = styled.p`
  height: ${({ theme }) => theme.sizes.xl};
  line-height: ${({ theme }) => theme.sizes.xl};
`;

const LogoutButton = styled(WhiteButton)`
  margin-top: ${({ theme }) => theme.sizes.lg};
`;

function UserToolbar({ history }) {
  const auth = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleIsCollapsed() {
    setIsCollapsed(isCollapsed => !isCollapsed);
  }

  function handleLogout() {
    auth.handleLogout();
    history.push('/login');
  }

  return (
    <Wrapper isCollapsed={isCollapsed}>
      <Intro>
        <Emoji emoji={emojis.wave} /> Welcome back, {auth.user.name}!
      </Intro>
      <UserPinsList />
      <ToggleButton onClick={toggleIsCollapsed}>
        <FontAwesomeIcon icon={faBars} />
      </ToggleButton>
      <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
    </Wrapper>
  );
}

export default withRouter(UserToolbar);
