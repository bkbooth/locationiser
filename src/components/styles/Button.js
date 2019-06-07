import styled from 'styled-components/macro';

export const PrimaryButton = styled.button`
  text-transform: uppercase;
  font-size: 0.7rem;
  letter-spacing: 0.05rem;
  background: ${({ theme }) => theme.colours.primary['500']};
  color: ${({ theme }) => theme.colours.shade['900']};
  padding: ${({ theme }) => theme.sizes.sm} ${({ theme }) => theme.sizes.md};
  border: none;
  border-radius: ${({ theme }) => theme.sizes.xs};
  cursor: pointer;
  transition: all ${({ theme }) => theme.speeds.fast};

  &:hover,
  &:focus {
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.4);
    outline: none;
  }
`;

export const WhiteButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme.colours.shade['900']};
  color: ${({ theme }) => theme.colours.shade['100']};
  border: 1px solid ${({ theme }) => theme.colours.shade['500']};
`;
