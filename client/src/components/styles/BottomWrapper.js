import { animated } from 'react-spring';
import styled from 'styled-components/macro';

const WRAPPER_WIDTH = 350;

export const BottomWrapper = styled(animated.div).attrs(props => ({
  width: props.width || WRAPPER_WIDTH,
}))`
  position: fixed;
  bottom: 0;
  width: 100vw;
  z-index: 3;
  background: ${({ theme }) => theme.colours.shade['900']};
  padding: ${({ theme }) => theme.sizes.md};
  border-radius: ${({ theme }) => theme.sizes.xs} ${({ theme }) => theme.sizes.xs} 0 0;
  box-shadow: 0 ${({ theme }) => theme.sizes.sm} ${({ theme }) => theme.sizes.xl} rgba(0, 0, 0, 0.3);

  @media screen and (min-width: ${({ width }) => width + 1}px) {
    left: calc(50% - ${({ width }) => Math.floor(width / 2)}px);
    width: ${({ width }) => width}px;
  }
`;
