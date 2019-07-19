import React from 'react';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components/macro';
import { theme } from 'utils/theme';

function WithThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export function renderWithTheme(ui, options) {
  return render(ui, { wrapper: WithThemeProvider, ...options });
}
