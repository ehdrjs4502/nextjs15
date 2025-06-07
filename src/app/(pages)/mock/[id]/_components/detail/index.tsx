'use client';
import { getMockDataAxiosById } from '@/app/_api/mock';
import { useGetData } from '@/app/_hooks/useGetData';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../../../_components/button';
import DeleteButton from '../delete-button';

export default function Detail({ id }: { id: string }) {
  const { data } = useGetData({
    queryKey: ['mock', 'users', id as string],
    queryFn: () => getMockDataAxiosById(id as string),
  });

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1>사용자 상세 정보</h1>

      {data && (
        <div style={{ marginBottom: '20px' }}>
          <Image src={data.avatar} alt={data.name} width={100} height={100} />
          <h2>{data.name}</h2>
          <p>ID: {data.id}</p>
          <p>생성일: {new Date(data.createdAt).toLocaleDateString()}</p>
        </div>
      )}

      <div style={{ display: 'flex', gap: '10px' }}>
        {data && <DeleteButton userId={data.id} userName={data.name} />}
        <Link href="/mock">
          <Button>목록으로 돌아가기</Button>
        </Link>
      </div>
    </div>
  );
}
