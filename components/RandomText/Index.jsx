'use client'

import { useState } from 'react';

function RandomText() {
  const [isVisible, setIsVisible] = useState(false);

  const getRandomPosition = () => {
    const maxX = window.innerWidth - 200; // Adjust this value as needed
    const maxY = window.innerHeight - 50; // Adjust this value as needed
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    return { left: randomX, top: randomY };
  };

  const toggleText = () => {
    setIsVisible(!isVisible);
  };

  const containerStyle = isVisible
    ? {
        display: 'block',
        position: 'absolute',
        ...getRandomPosition(),
      }
    : { display: 'none' };

  return (
    <div
      style={containerStyle}
      onClick={toggleText}
      className="text-container"
    >
      Click to Show/Hide Text
    </div>
  );
}

export default RandomText;
