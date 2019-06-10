import styled from 'styled-components/macro';

export const PageWrapper = styled.div`
  background: ${({ theme }) => theme.colours.shade['900']};
  margin: ${({ theme }) => theme.sizes.xl} ${({ theme }) => theme.sizes.sm};
  padding: ${({ theme }) => theme.sizes.lg} ${({ theme }) => theme.sizes.md};
  border-radius: ${({ theme }) => theme.sizes.xs};
  box-shadow: 0 ${({ theme }) => theme.sizes.sm} ${({ theme }) => theme.sizes.xl} rgba(0, 0, 0, 0.3);
  max-height: calc(100% - 2 * ${({ theme }) => theme.sizes.xl});
  overflow-y: auto;

  @media screen and (min-width: 540px) {
    margin: ${({ theme }) => theme.sizes.xl} auto;
    width: 520px;
  }

  *:first-child {
    margin-top: ${({ theme }) => theme.sizes.nil};
  }
  *:last-child {
    margin-bottom: ${({ theme }) => theme.sizes.nil};
  }
`;
