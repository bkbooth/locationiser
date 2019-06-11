import React from 'react';
import { render } from '@testing-library/react';
import Emoji, { emojis } from './Emoji';

it('renders a pin emoji', () => {
  const { container } = render(<Emoji emoji={emojis.pin} />);
  expect(container.cloneNode(true)).toMatchSnapshot();
});

it('renders a waiting emoji', () => {
  const { container } = render(<Emoji emoji={emojis.waiting} />);
  expect(container.cloneNode(true)).toMatchSnapshot();
});

it('renders a waving emoji', () => {
  const { container } = render(<Emoji emoji={emojis.wave} />);
  expect(container.cloneNode(true)).toMatchSnapshot();
});

it('renders a world map emoji', () => {
  const { container } = render(<Emoji emoji={emojis.worldMap} />);
  expect(container.cloneNode(true)).toMatchSnapshot();
});
