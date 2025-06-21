'use client';
// import { getMockDataAxios } from '@/app/_api/mock';
import { useGetMockList } from '@/app/_hooks/useMock';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '../button';
import Card from '../card';
import S from './list.module.css';

export default function List() {
  const router = useRouter();
  const { data, isLoading, error } = useGetMockList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Link href="/mock/add">
        <Button>Add</Button>
      </Link>
      <div className={S.container}>
        {data?.map((user: any) => (
          <Card
            key={user.id}
            user={user}
            onClick={() => router.push(`/mock/${user.id}`)}
            isSelected={false}
          />
        ))}
      </div>
    </div>
  );
}
