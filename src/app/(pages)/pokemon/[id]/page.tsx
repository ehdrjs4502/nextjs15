import { fetchPokemonDetail } from '@/app/_api/pokemon';
import Image from 'next/image';
import { Suspense } from 'react';

async function PokemonDetail({ id }: { id: number }) {
  const data = await fetchPokemonDetail(id);

  if (data.error) {
    return <div>{data.error}</div>;
  }

  return (
    <div>
      <h2>{data.korean_name}</h2>
      <Image src={data.image} alt={data.name} width={100} height={100} />
    </div>
  );
}

export default function PokemonDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <PokemonDetail id={id} />
    </Suspense>
  );
}
