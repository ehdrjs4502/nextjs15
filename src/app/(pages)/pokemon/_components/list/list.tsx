'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useRef, useEffect } from 'react';
import { pokemonInfiniteListOptions } from '@/app/_api/pokemon';
import Card from '../card/card';
import S from './list.module.css';

interface PokemonData {
  id: number;
  korean_name: string;
  image: string;
  types: string[];
}

export default function List() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    ...pokemonInfiniteListOptions(),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 0,
  });

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 },
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생!</div>;

  // 모든 페이지의 포켓몬을 하나의 배열로 합치기
  const pokemonList = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <div>
      <h1>1세대 포켓몬</h1>
      <div className={S.container}>
        {pokemonList.map((pokemon: PokemonData) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.korean_name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
      <div ref={loaderRef} style={{ height: 40, textAlign: 'center' }}>
        {isFetchingNextPage
          ? '불러오는 중...'
          : !hasNextPage && '모든 포켓몬을 다 불러왔습니다!'}
      </div>
    </div>
  );
}
