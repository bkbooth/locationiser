import React from 'react';

export const emojis = {
  pin: { emoji: '📍', label: 'round pushpin' },
  waiting: { emoji: '⏳', label: 'hourglass not done' },
  wave: { emoji: '👋', label: 'waving hand' },
  worldMap: { emoji: '🗺️', label: 'world map' },
};

function Emoji({ emoji: { emoji, label } }) {
  return (
    <span role="img" aria-label={label}>
      {emoji}
    </span>
  );
}

export default Emoji;
