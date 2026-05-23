import React from 'react';

export default function StarsRating({ rating = 0, maxStars = 5, size = 'md', interactive = false, onChange }) {
  const stars = Math.round(rating);
  const starsArray = Array.from({ length: maxStars }, (_, i) => i + 1);

  const handleClick = (value) => {
    if (interactive && onChange) onChange(value);
  };

  const sizeClass = size === 'sm' ? 'star-sm' : size === 'lg' ? 'star-lg' : '';

  return (
    <span className={`stars-rating ${sizeClass}`}>
      {starsArray.map((star) => {
        const filled = star <= stars;
        const half = !filled && star - 0.5 <= rating;
        return (
          <span
            key={star}
            className={`star ${filled ? 'filled' : half ? 'half' : 'empty'} ${interactive ? 'interactive' : ''}`}
            onClick={() => handleClick(star)}
            style={interactive ? { cursor: 'pointer' } : {}}
          >
            {filled ? '\u2605' : half ? '\u2605' : '\u2606'}
          </span>
        );
      })}
    </span>
  );
}