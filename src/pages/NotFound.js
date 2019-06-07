import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.sizes.lg} ${({ theme }) => theme.sizes.md};
  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }
`;

function NotFound() {
  return (
    <Wrapper>
      <h1>Page not found</h1>
      <p>
        We couldn't find the page you're looking for. Back to <Link to="/">home</Link>.
      </p>
    </Wrapper>
  );
}

export default NotFound;
