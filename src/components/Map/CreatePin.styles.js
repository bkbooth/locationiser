import styled from 'styled-components/macro';
import { PrimaryButton, WhiteButton } from 'components/styles/Button';

const WRAPPER_WIDTH = 350;

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 3;
  background: ${({ theme }) => theme.colours.shade['900']};
  padding: ${({ theme }) => theme.sizes.md};
  border-radius: ${({ theme }) => theme.sizes.xs} ${({ theme }) => theme.sizes.xs} 0 0;
  box-shadow: 0 ${({ theme }) => theme.sizes.sm} ${({ theme }) => theme.sizes.xl} rgba(0, 0, 0, 0.3);
  transform: ${({ isShowing }) => `translateY(${isShowing ? '0' : '110%'})`};
  transition: transform ${({ theme }) => theme.speeds.slow};

  @media screen and (min-width: ${WRAPPER_WIDTH + 1}px) {
    left: calc(50% - ${Math.floor(WRAPPER_WIDTH / 2)}px);
    width: ${WRAPPER_WIDTH}px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.sizes.md};

  ${PrimaryButton}, ${WhiteButton} {
    flex: 1;
    margin-bottom: ${({ theme }) => theme.sizes.nil};
    &:first-child {
      margin-right: ${({ theme }) => theme.sizes.sm};
    }
  }
`;
