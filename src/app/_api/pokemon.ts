// src/app/_api/pokemon.ts
import { queryOptions } from '@tanstack/react-query'
import axios from 'axios'

export const fetchPokemonDetail = async (id: number) => {
  try {
    const [response, speciesResponse] = await Promise.all([
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
      axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);
    const data = response.data;
    const koreanNameObj = speciesResponse.data.names.find(
      (name: any) => name.language.name === 'ko'
    );
    return {
      id: data.id,
      name: data.name,
      korean_name: koreanNameObj ? koreanNameObj.name : data.name,
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
  nextPage: number | null;
  total: number;
};

export const pokemonInfiniteListOptions = (pageSize: number = 10) =>
  queryOptions<PageData, Error, PageData, (string | number)[]>({
    queryKey: ['pokemon', 'gen1', pageSize],
    queryFn: async ({ pageParam = 0 }) => {
      const page = Number(pageParam);
      const offset = page * pageSize;
      // 151번까지만 요청
      const limit = Math.min(pageSize, 151 - offset);

      if (limit <= 0) {
        // 더 이상 불러올 데이터 없음
        return {
          data: [],
          nextPage: null,
          total: 151,
        };
      }

      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
      );
      const results = response.data.results;

      const requests = results.map(async (pokemon: any) => {
        const id = pokemon.url.split('/').filter(Boolean).pop();
        const [detail, species] = await Promise.all([
          axios.get(pokemon.url),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        ]);
        const koreanNameObj = species.data.names.find(
          (name: any) => name.language.name === 'ko'
        );
        return {
          id: detail.data.id,
          name: detail.data.name,
          korean_name: koreanNameObj ? koreanNameObj.name : detail.data.name,
          image: detail.data.sprites.front_default,
          types: detail.data.types.map((t: any) => t.type.name),
        };
      });

      const data = await Promise.all(requests);

      // nextPage 계산: 마지막 포켓몬이 151번이면 더 이상 없음
      const nextOffset = offset + limit;
      const nextPage = nextOffset < 151 ? page + 1 : null;

      return {
        data,
        nextPage,
        total: 151,
      };
    },
  });
  