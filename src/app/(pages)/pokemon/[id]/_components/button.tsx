'use client';

import { useState } from 'react';

export default function Button() {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

  return <button onClick={handleFavoriteClick}>버튼</button>;
}
