import { fetchPokemonDetail } from '@/app/_api/pokemon';
import { getQueryClient } from '@/app/tanstack-query/get-query-client';
import {
  HydrationBoundary,
  dehydrate,
  queryOptions,
} from '@tanstack/react-query';
import Image from 'next/image';
import Button from './_components/button';

// SSG로 만들기 위한 정적 파라미터 생성
// export async function generateStaticParams() {
//   const paths = Array.from({ length: 9 }, (_, i) => ({
//     id: (i + 1).toString(),
//   }));

//   return paths;
// }

export default async function PokemonDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  // 서버에서 포켓몬 데이터 미리 가져오기
  await queryClient.prefetchQuery(pokemonDetailOptions(Number(id)));
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <PokemonDetail id={Number(id)} />
    </HydrationBoundary>
  );
}

// 포켓몬 상세 정보를 위한 쿼리 옵션
const pokemonDetailOptions = (id: number) =>
  queryOptions({
    queryKey: ['pokemon', 'detail', id],
    queryFn: () => fetchPokemonDetail(id),
  });

async function PokemonDetail({ id }: { id: number }) {
  const data = await fetchPokemonDetail(id);

  if (data.error) {
    return <div>{data.error}</div>;
  }

  return (
    <div>
      <h2>{data.name}</h2>
      <Image src={data.image} alt={data.name} width={100} height={100} />
      <p>타입: {data.types.join(', ')}</p>
      <p>높이: {data.height / 10}m</p>
      <p>무게: {data.weight / 10}kg</p>
      <Button />
    </div>
  );
}
