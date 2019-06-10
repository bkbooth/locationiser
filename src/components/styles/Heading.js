import styled from 'styled-components/macro';

export const Heading = styled.h1`
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.shade['600']};
  margin-top: ${({ theme }) => theme.sizes.nil};
  margin-bottom: ${({ theme }) => theme.sizes.lg};
`;
