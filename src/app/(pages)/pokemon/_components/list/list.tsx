// 'use client';
// import { pokemonListWithQuery } from '@/app/_api/pokemon';
// import { useQuery } from '@tanstack/react-query';
import { pokemonListAxios } from '@/app/_api/pokemon';
import Card from '../card/card';
import S from './list.module.css';

interface PokemonData {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default async function List() {
  // const { data } = useQuery(pokemonListWithQuery());
  const data = await pokemonListAxios();

  console.log(data);

  if (!data || data.length === 0) {
    return (
      <div>
        <h1>1세대 포켓몬</h1>
        <p>포켓몬 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>1세대 포켓몬</h1>
      <div className={S.container}>
        {data.map((pokemon: PokemonData) => (
          <Card
            key={pokemon.id}
            id={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            types={pokemon.types}
          />
        ))}
      </div>
    </div>
  );
}
