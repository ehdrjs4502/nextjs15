// src/app/_api/pokemon.ts
import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';

export const fetchPokemonDetail = async (id: number) => {
  try {
    const [response, speciesResponse] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
    const data = response.data;
    const koreanNameObj = speciesResponse.data.names.find(
      (name: any) => name.language.name === 'ko',
    );
    return {
      id: data.id,
      name: koreanNameObj ? koreanNameObj.name : data.name,
      image: data.sprites.front_default,
      types: data.types.map((t: any) => t.type.name),
      height: data.height,
      weight: data.weight,
      base_experience: data.base_experience,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { error: '포켓몬을 찾을 수 없습니다.' };
    }
    return { error: '데이터를 불러오는 중 오류가 발생했습니다.' };
  }
};

export type PageData = {
  data: any[];
};

export const pokemonListFetch = async () => {
  const response = await fetch(
    'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0',
  );
  const { results } = await response.json();

  const requests = results.map(async (pokemon: any) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    const [detailResponse, speciesResponse] = await Promise.all([
      fetch(pokemon.url),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
    const detail = await detailResponse.json();
    const species = await speciesResponse.json();
    const koreanNameObj = species.names.find(
      (name: any) => name.language.name === 'ko',
    );
    return {
      id: detail.id,
      name: koreanNameObj ? koreanNameObj.name : detail.name,
      image: detail.sprites.front_default,
      types: detail.types.map((t: any) => t.type.name),
    };
  });

  const data = await Promise.all(requests);

  return data;
};

export const pokemonListAxios = async () => {
  const response = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0',
  );
  const results = response.data.results;

  const requests = results.map(async (pokemon: any) => {
    const id = pokemon.url.split('/').filter(Boolean).pop();
    const [detail, species] = await Promise.all([
      axios.get(pokemon.url),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
    const koreanNameObj = species.data.names.find(
      (name: any) => name.language.name === 'ko',
    );
    return {
      id: detail.data.id,
      name: koreanNameObj ? koreanNameObj.name : detail.data.name,
      image: detail.data.sprites.front_default,
      types: detail.data.types.map((t: any) => t.type.name),
    };
  });

  const data = await Promise.all(requests);

  return data;
};

export const pokemonListWithQuery = () =>
  queryOptions<PageData, Error, PageData, (string | number)[]>({
    queryKey: ['pokemon', 'list'],
    queryFn: async () => {
      const data = await pokemonListAxios();
      return {
        data,
      };
    },
  });
