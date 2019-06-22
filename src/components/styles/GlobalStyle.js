import { createGlobalStyle } from 'styled-components/macro';
import { theme } from '../../utils/theme';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    font-family: ${theme.fonts.sans};
    margin: 0;
    padding: 0;
    background: ${theme.colours.shade['900']};
    color: ${theme.colours.shade['100']};
  }

  a {
    color: ${theme.colours.primary['500']};
    transition: opacity ${theme.speeds.fast};

    &:hover,
    &:focus {
      opacity: 0.8;
    }
  }

  #leaflet-map {
    .leaflet-popup-content {
      color: ${theme.colours.shade['100']};
      font-family: ${theme.fonts.sans};
      font-size: 0.9rem;
      line-height: 1.3rem;
      margin: ${theme.sizes.sm} ${theme.sizes.md};
    }
    a.leaflet-popup-close-button {
      width: ${theme.sizes.md};
      height: ${theme.sizes.md};
      color: ${theme.colours.shade['600']};
    }
    .leaflet-popup-title {
      color: ${theme.colours.shade['400']};
      font-weight: bold;
      margin-bottom: ${theme.sizes.xs};
    }
  }
`;

export default GlobalStyle;
