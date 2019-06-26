import styled from 'styled-components/macro';

export const Wrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${({ theme }) => theme.colours.shade['900']};
  text-align: center;
  font-size: 0.85rem;
  line-height: 32px;
`;
