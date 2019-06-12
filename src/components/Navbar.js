import React from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useAuth } from '../components/Auth';
import { WhiteButton } from '../components/styles/Button';
import worldMapEmoji from '../assets/world-map-emoji.png';

const Header = styled.header`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colours.primary['500']};
  color: ${({ theme }) => theme.colours.shade['900']};
  padding: ${({ theme }) => theme.sizes.md};
  box-shadow: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.xs}
    ${({ theme }) => theme.sizes.sm} rgba(0, 0, 0, 0.4);
  z-index: 10;
`;

const Title = styled.h1`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.sizes.nil};
  font-size: 1.7rem;
  letter-spacing: 0.05rem;
`;

const Link = styled(RouterLink)`
  color: ${({ theme }) => theme.colours.shade['900']};
  text-decoration: none;
  transition: opacity ${({ theme }) => theme.speeds.fast};

  &:hover,
  &:focus {
    opacity: 0.8;
    outline: none;
  }
`;

const Logo = styled.img`
  width: ${({ theme }) => theme.sizes.xl};
  height: auto;
  margin-right: ${({ theme }) => theme.sizes.sm};
`;

function Navbar({ history }) {
  const auth = useAuth();

  function handleLogin() {
    history.push('/login');
  }

  function handleLogout() {
    auth.handleLogout();
    history.push('/login');
  }

  return (
    <Header>
      <Link to="/">
        <Title>
          <Logo src={worldMapEmoji} alt="world map emoji" />
          locations
        </Title>
      </Link>
      <nav>
        {auth.isAuthenticated ? (
          <WhiteButton onClick={handleLogout} disabled={auth.isLoading}>
            Logout
          </WhiteButton>
        ) : (
          <WhiteButton onClick={handleLogin} disabled={auth.isLoading}>
            Login
          </WhiteButton>
        )}
      </nav>
    </Header>
  );
}

export default withRouter(Navbar);
