import React from 'react';
import styled, { css } from 'styled-components/macro';

const headingCommon = css`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colours.shade['400']};
  margin-top: ${({ theme }) => theme.sizes.nil};
  font-weight: 400;
`;

const H1 = styled.h1`
  ${headingCommon};
  font-size: 1.5rem;
  letter-spacing: 0.1rem;
  margin-bottom: ${({ theme }) => theme.sizes.lg};
`;

const H2 = styled.h2`
  ${headingCommon};
  font-size: 1.3rem;
  letter-spacing: 0.1rem;
  margin-bottom: ${({ theme }) => theme.sizes.md};
`;

const H3 = styled.h3`
  ${headingCommon};
  font-size: 1.1rem;
  letter-spacing: 0.1rem;
  margin-bottom: ${({ theme }) => theme.sizes.md};
`;

export function Heading({ size, children }) {
  switch (size) {
    case 'lg':
      return <H1>{children}</H1>;
    case 'md':
      return <H2>{children}</H2>;
    case 'sm':
      return <H3>{children}</H3>;
    default:
      return children;
  }
}
