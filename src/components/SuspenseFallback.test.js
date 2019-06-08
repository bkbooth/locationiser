import React from 'react';
import { renderWithTheme } from '../utils/renderWithTheme';
import SuspenseFallback from './SuspenseFallback';

it('renders correctly', () => {
  const { container } = renderWithTheme(<SuspenseFallback />);
  expect(container.cloneNode(true)).toMatchSnapshot();
});
