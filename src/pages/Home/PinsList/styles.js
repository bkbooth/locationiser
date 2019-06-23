import styled from 'styled-components/macro';

export const PinList = styled.ul`
  list-style-type: none;
  padding: ${({ theme }) => theme.sizes.nil};
`;

export const Pin = styled.li`
  margin: ${({ theme }) => theme.sizes.md} ${({ theme }) => theme.sizes.nil};
`;

export const UnstyledLink = styled.a`
  color: unset;
  text-decoration: none;
`;

export const Truncated = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
