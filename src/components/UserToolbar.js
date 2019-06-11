import React, { useContext, useState } from 'react';
import styled from 'styled-components/macro';
import { AuthContext } from './Auth';
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

  *:not(${ToggleButton}) {
    ${({ isCollapsed }) => isCollapsed && 'display: none'};
  }

  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }
`;

function UserToolbar() {
  const auth = useContext(AuthContext);
  const [isCollapsed, setIsCollapsed] = useState(false);

  function toggleIsCollapsed() {
    setIsCollapsed(isCollapsed => !isCollapsed);
  }

  return (
    <Wrapper isCollapsed={isCollapsed}>
      <p>
        <Emoji emoji={emojis.wave} /> Welcome back, {auth.user.name}!
      </p>
      <UserPinsList />
      <ToggleButton onClick={toggleIsCollapsed}>{isCollapsed ? '▶️' : '◀️'}</ToggleButton>
    </Wrapper>
  );
}

export default UserToolbar;
