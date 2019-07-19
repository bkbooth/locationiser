import styled from 'styled-components/macro';

export const LeafletMap = styled.div`
  height: 100%;
  z-index: 1;
`;

export const ContentWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  pointer-events: none;
  > * {
    pointer-events: auto;
  }
`;
