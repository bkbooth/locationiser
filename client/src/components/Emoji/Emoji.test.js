import React from 'react';
import { render } from '@testing-library/react';
import Emoji, { emojis } from './Emoji';

it('renders a waving emoji', () => {
  const { container } = render(<Emoji emoji={emojis.wave} />);
  expect(container.cloneNode(true)).toMatchSnapshot();
});
