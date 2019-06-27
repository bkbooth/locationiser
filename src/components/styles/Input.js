import styled, { css } from 'styled-components/macro';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.sizes.sm};

  @media screen and (min-width: ${({ theme }) => theme.screens.sm}) {
    flex-direction: row;
    align-items: center;
  }
`;

export const Label = styled.label`
  flex: 0;
  min-width: 110px;
  margin-bottom: ${({ theme }) => theme.sizes.xxs};
`;

const commonInputStyles = css`
  flex: 1;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
  background: ${({ theme }) => theme.colours.shade['900']};
  color: ${({ theme }) => theme.colours.shade['100']};
  border: 1px solid ${({ theme }) => theme.colours.shade['700']};
  border-radius: ${({ theme }) => theme.sizes.xs};
  padding: ${({ theme }) => theme.sizes.sm};

  ::placeholder {
    color: ${({ theme }) => theme.colours.shade['600']};
  }
`;

export const Input = styled.input`
  ${commonInputStyles};
`;

export const TextArea = styled.textarea`
  ${commonInputStyles};
`;
