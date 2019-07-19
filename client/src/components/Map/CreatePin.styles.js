import styled from 'styled-components/macro';
import { PrimaryButton, WhiteButton } from 'components/styles/Button';

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.sizes.md};

  ${PrimaryButton}, ${WhiteButton} {
    flex: 1;
    margin-bottom: ${({ theme }) => theme.sizes.nil};
    &:first-child {
      margin-right: ${({ theme }) => theme.sizes.sm};
    }
  }
`;
