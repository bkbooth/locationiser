import styled from 'styled-components/macro';
import { PrimaryButton, WhiteButton } from 'components/styles/Button';

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.sizes.md};

  ${PrimaryButton}, ${WhiteButton} {
    flex-grow: 1;
    flex-shrink: 0;
    margin-bottom: ${({ theme }) => theme.sizes.nil};
    margin-left: ${({ theme }) => theme.sizes.sm};
    &:first-child {
      margin-left: ${({ theme }) => theme.sizes.nil};
    }
  }
`;
