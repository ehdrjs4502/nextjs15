'use client';
import { getMockDataAxios } from '@/app/_api/mock';
import Button from '../button';
import Card from '../card';
import S from './list.module.css';
import { useGetData } from '@/app/_hooks/useGetData';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function List() {
  const router = useRouter();
  const { data } = useGetData({
    queryKey: ['mock', 'users'],
    queryFn: getMockDataAxios,
  });

  return (
    <div>
      <Link href="/mock/add">
        <Button>Add</Button>
      </Link>
      <div className={S.container}>
        {data?.map((user) => (
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
