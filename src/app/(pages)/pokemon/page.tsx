import React from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { pokemonInfiniteListOptions } from '@/app/_api/pokemon';
import { getQueryClient } from '@/app/tanstack-query/get-query-client';
import PokemonList from './_components/list/list';

export default async function PokemonPage() {
  const queryClient = getQueryClient();
  // 첫 페이지(0번) 미리 패칭
  await queryClient.prefetchInfiniteQuery({
    ...pokemonInfiniteListOptions(),
    initialPageParam: 0,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <HydrationBoundary state={dehydratedState}>
        <PokemonList />
      </HydrationBoundary>
    </main>
  );
}
