import React from 'react';
import { render } from '@testing-library/react';
import App from './index';

it('renders correctly', () => {
  const { container } = render(<App />);
  expect(container.cloneNode(true)).toMatchSnapshot();
});
