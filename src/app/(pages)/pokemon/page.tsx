import React from 'react';
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import { pokemonListWithQuery } from '@/app/_api/pokemon';
import { getQueryClient } from '@/app/tanstack-query/get-query-client';
import PokemonList from './_components/list/list';

const queryClient = getQueryClient();

// 포켓몬 리스트 미리 패칭
await queryClient.prefetchQuery(pokemonListWithQuery());

const dehydratedState = dehydrate(queryClient);

export default async function PokemonPage() {
  <HydrationBoundary state={dehydratedState}>
    <PokemonList />
  </HydrationBoundary>;

  return (
    <main>
      <PokemonList />
    </main>
  );
}
