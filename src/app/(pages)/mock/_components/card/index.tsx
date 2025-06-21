import { User } from '@/app/_api/mock';
import { useUpdateMock } from '@/app/_hooks/useMock';
import Image from 'next/image';
import S from './card.module.css';

interface Props {
  user: User;
  onClick: () => void;
  isSelected: boolean;
}

export default function Card({ user, onClick, isSelected }: Props) {
  const { mutate, isPending } = useUpdateMock();

  const handleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutate({ id: user.id, isFavorite: !user.isFavorite });
  };

  return (
    <div
      className={`${S.card} ${isSelected ? S.selected : ''}`}
      onClick={onClick}
    >
      <div className={S.favoriteContainer}>
        <button
          className={`${S.heartButton} ${user.isFavorite ? S.favorited : ''}`}
          onClick={handleFavorite}
          disabled={isPending}
          aria-label={user.isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          <svg
            className={S.heartIcon}
            viewBox="0 0 24 24"
            fill={user.isFavorite ? '#ff4757' : 'none'}
            stroke={user.isFavorite ? '#ff4757' : '#ddd'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            />
          </svg>
          {isPending && <div className={S.spinner}></div>}
        </button>
      </div>
      <Image src={user.avatar} alt={user.name} width={100} height={100} />
      <p>{user.name}</p>
    </div>
  );
}
