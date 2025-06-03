'use client';
import { pokemonDetailOptions } from '@/app/_api/pokemon';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

export default function PokemonDetailPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useQuery(pokemonDetailOptions(Number(id)));

  if (error) {
    return <div>데이터를 불러오는데 실패했습니다.</div>;
  }

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  return (
    <div>
      <h2>{data?.korean_name}</h2>
      <Image src={data?.image} alt={data?.name} width={100} height={100} />
    </div>
  );
}
