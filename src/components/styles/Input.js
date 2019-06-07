import styled from 'styled-components/macro';

export const Label = styled.label`
  display: inline-block;
  width: 90px;
`;

export const Input = styled.input`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1rem;
  background: ${({ theme }) => theme.colours.shade['900']};
  color: ${({ theme }) => theme.colours.shade['100']};
  border: 1px solid ${({ theme }) => theme.colours.shade['500']};
  border-radius: ${({ theme }) => theme.sizes.xs};
  padding: ${({ theme }) => theme.sizes.xs};
`;

export const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.sizes.sm};
`;
