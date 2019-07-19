import styled from 'styled-components/macro';

export const Button = styled.button`
  position: relative;
  width: ${({ theme }) => theme.sizes.xl};
  height: ${({ theme }) => theme.sizes.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.sizes.xs};
  padding: ${({ theme }) => theme.sizes.nil};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: inherit;
  transition: all ${({ theme }) => theme.speeds.fast};

  &:hover,
  &:focus {
    background: ${({ theme }) => theme.colours.shade['800']};
    outline: none;
  }
`;

export const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  color: ${({ theme }) => theme.colours.shade['900']};
  text-align: center;
  font-size: 0.9rem;
  line-height: ${({ theme }) => theme.sizes.lg};
`;
