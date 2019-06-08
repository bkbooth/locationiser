import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithTheme } from '../utils/renderWithTheme';
import Navbar from './Navbar';

it('renders correctly', () => {
  const { container } = renderWithTheme(
    <Router>
      <Navbar />
    </Router>
  );
  expect(container.cloneNode(true)).toMatchSnapshot();
});
