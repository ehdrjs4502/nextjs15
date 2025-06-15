'use client';
import { getMockDataAxios } from '@/app/_api/mock';
import Button from '../button';
import Card from '../card';
import S from './list.module.css';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

export default function List() {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ['mock', 'users'],
    queryFn: getMockDataAxios,
    staleTime: 1000 * 10, // 10초
    gcTime: 1000 * 15,
    // staleTime: 1000 * 60 * 5, // 5분
    // gcTime: 1000 * 60 * 10, // 10분
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
