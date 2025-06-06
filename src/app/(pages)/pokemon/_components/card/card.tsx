'use client';
import Image from 'next/image';
import S from './card.module.css';
import { typeColorMap, typeMap } from '@/app/_constants/type';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default function Card({ id, name, image, types }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
    console.log(`${name} 즐겨찾기: ${!isFavorite}`);
  };

  return (
    <div
      className={S.card}
      style={{
        border: isFavorite ? '3px solid gold' : '1px solid #ccc',
      }}
    >
      <Link href={`/pokemon/${id}`}>
        <h2>{name}</h2>
        <h4>도감 번호: {id.toString().padStart(4, '0')}</h4>
        <div className={S.imgContainer}>
          <Image src={image} alt={name} width={100} height={100} />
        </div>
        <div className={S.typeContainer}>
          {types.map((type) => (
            <div
              key={type}
              className={S.type}
              style={{
                backgroundColor:
                  typeColorMap[type as keyof typeof typeColorMap],
              }}
            >
              {typeMap[type as keyof typeof typeMap]}
            </div>
          ))}
        </div>
      </Link>

      <button
        onClick={handleFavoriteClick}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: isFavorite ? 'gold' : 'white',
          border: '1px solid #ccc',
          borderRadius: '50%',
          width: '30px',
          height: '30px',
          cursor: 'pointer',
        }}
      >
        {isFavorite ? '⭐' : '☆'}
      </button>
    </div>
  );
}
