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

  /* Reset box model inside Leaflet container */
  #leaflet-map {
    box-sizing: initial;
  }
  #leaflet-map *, #leaflet-map *:before, #leaflet-map *:after {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
