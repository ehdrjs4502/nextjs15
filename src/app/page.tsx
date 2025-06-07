import Link from 'next/link';
import S from './page.module.css';

export default function Home() {
  return (
    <div className={S['button-container']}>
      <Link href="/cards">카드</Link>
      <Link href="/pokemon">포켓몬</Link>
      <Link href="/mock">CRUD</Link>
    </div>
  );
}
