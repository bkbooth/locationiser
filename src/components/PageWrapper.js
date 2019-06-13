import React from 'react';
import styled from 'styled-components/macro';
import worldMapEmoji from '../assets/world-map-emoji.png';

const CenterPage = styled.div`
  align-self: center;
  width: 100%;
  max-height: calc(100% - 2 * ${({ theme }) => theme.sizes.md});
  overflow-y: auto;
  margin: ${({ theme }) => theme.sizes.md};
  border-radius: ${({ theme }) => theme.sizes.xs};
  background: ${({ theme }) => theme.colours.shade['900']};
  box-shadow: 0 ${({ theme }) => theme.sizes.sm} ${({ theme }) => theme.sizes.xl} rgba(0, 0, 0, 0.3);

  @media screen and (min-width: 540px) {
    width: 500px;
    margin: ${({ theme }) => theme.sizes.md} auto;
  }
`;

const ContentWrapper = styled.div`
  padding: ${({ theme }) => theme.sizes.lg} ${({ theme }) => theme.sizes.md};

  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  display: flex;
  padding: 0 ${({ theme }) => theme.sizes.md};
  background: ${({ theme }) => theme.colours.primary['500']};
  color: ${({ theme }) => theme.colours.shade['900']};
  box-shadow: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.xs}
    ${({ theme }) => theme.sizes.sm} rgba(0, 0, 0, 0.4);
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

function PageWrapper({ children }) {
  return (
    <CenterPage>
      <Header>
        <Title>
          <Logo src={worldMapEmoji} alt="world map emoji" />
          locations
        </Title>
      </Header>
      <ContentWrapper>{children}</ContentWrapper>
    </CenterPage>
  );
}

export default PageWrapper;
