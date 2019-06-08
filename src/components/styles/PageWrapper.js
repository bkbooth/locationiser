import styled from 'styled-components/macro';

export const PageWrapper = styled.div`
  padding: ${({ theme }) => theme.sizes.lg} ${({ theme }) => theme.sizes.md};
  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }
`;
