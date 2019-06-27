import styled from 'styled-components/macro';

export const Wrapper = styled.div`
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

  @media screen and (min-width: ${({ theme }) => theme.screens.sm}) {
    width: ${({ isCollapsed }) => (isCollapsed ? '80px' : '320px')};
  }
`;

export const Header = styled.header`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.sm};
  background: ${({ theme }) => theme.colours.primary['500']};
  color: ${({ theme }) => theme.colours.shade['900']};

  @media screen and (min-width: ${({ theme }) => theme.screens.sm}) {
    height: 70px;
    padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.md};
  }
`;

export const Footer = styled.footer`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.sm};

  @media screen and (min-width: ${({ theme }) => theme.screens.sm}) {
    height: 70px;
    padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.md};
  }
`;

export const Body = styled.main`
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

  @media screen and (min-width: ${({ theme }) => theme.screens.sm}) {
    margin: ${({ theme }) => theme.sizes.md} ${({ theme }) => theme.sizes.nil};
    padding: ${({ theme }) => theme.sizes.nil} ${({ theme }) => theme.sizes.md};
  }
`;

export const Title = styled.h1`
  display: flex;
  align-items: center;
  margin: ${({ theme }) => theme.sizes.nil};
  font-size: 1.7rem;
  letter-spacing: 0.05rem;
`;

export const Logo = styled.img`
  width: ${({ theme }) => theme.sizes.xl};
  height: auto;
  margin-right: ${({ theme }) => theme.sizes.sm};
`;

export const Intro = styled.p`
  height: ${({ theme }) => theme.sizes.xl};
  line-height: ${({ theme }) => theme.sizes.xl};
  margin-top: ${({ theme }) => theme.sizes.nil};
  margin-bottom: ${({ theme }) => theme.sizes.md};
`;
