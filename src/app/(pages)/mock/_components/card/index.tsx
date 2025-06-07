import { User } from '@/app/_api/mock';
import Image from 'next/image';
import S from './card.module.css';

interface Props {
  user: User;
  onClick: () => void;
  isSelected: boolean;
}

export default function Card({ user, onClick, isSelected }: Props) {
  return (
    <div
      className={`${S.card} ${isSelected ? S.selected : ''}`}
      onClick={onClick}
    >
      <Image src={user.avatar} alt={user.name} width={100} height={100} />
      <p>{user.name}</p>
    </div>
  );
}
