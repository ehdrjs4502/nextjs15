'use client';
import S from './button.module.css';

interface Props {
  children: React.ReactNode;
  onClick: () => void;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary' | 'danger';
}

export default function Button({
  children,
  onClick,
  type = 'button',
  color = 'primary',
}: Props) {
  return (
    <button className={`${S.button} ${S[color]}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
