import Card from '@/app/_components/card';
import styles from './page.module.css';

export default async function Cards({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(id);

  return (
    <div>
      <h5>테스트</h5>
      <div className={styles['card-container']}>
        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />

        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
