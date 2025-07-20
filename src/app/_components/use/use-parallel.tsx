'use client';

import { use, Suspense } from 'react';
import axios from 'axios';
import { User } from '@/app/_api/mock';
import styles from './use.module.css';

// 여러 API를 병렬로 호출하는 함수
const fetchAllData = async () => {
  const [usersResponse, pokemonResponse] = await Promise.all([
    axios.get<User[]>(
      `https://${process.env.NEXT_PUBLIC_API_KEY}.mockapi.io/api/v1/users`,
    ),
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=5'),
  ]);

  return {
    users: usersResponse.data,
    pokemons: pokemonResponse.data.results,
  };
};

// 개별 사용자 데이터를 가져오는 함수
const fetchUserById = async (id: string) => {
  const response = await axios.get<User>(
    `https://${process.env.NEXT_PUBLIC_API_KEY}.mockapi.io/api/v1/users/${id}`,
  );
  return response.data;
};

// 사용자 상세 정보 컴포넌트
function UserDetail({ userId }: { userId: string }) {
  const user = use(fetchUserById(userId));

  return (
    <div className={styles.userCard}>
      <img src={user.avatar} alt={user.name} className={styles.avatar} />
      <div className={styles.userInfo}>
        <h3>{user.name}</h3>
        <p>ID: {user.id}</p>
        <span className={styles.favorite}>
          {user.isFavorite ? '❤️ 즐겨찾기' : '🤍 즐겨찾기 안함'}
        </span>
      </div>
    </div>
  );
}

// 메인 데이터 컴포넌트
function ParallelData() {
  const { users, pokemons } = use(fetchAllData());

  return (
    <div className={styles.container}>
      <h2>병렬 API 호출 + Suspense</h2>

      <div className={styles.sections}>
        <section className={styles.section}>
          <h3>사용자 목록 ({users.length}명)</h3>
          <div className={styles.userList}>
            {users.slice(0, 3).map((user) => (
              <div key={user.id} className={styles.userCard}>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.avatar}
                />
                <div className={styles.userInfo}>
                  <h4>{user.name}</h4>
                  <p>ID: {user.id}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h3>포켓몬 목록 ({pokemons.length}마리)</h3>
          <div className={styles.pokemonList}>
            {pokemons.map((pokemon: any, index: number) => (
              <div key={pokemon.name} className={styles.pokemonCard}>
                <div className={styles.pokemonAvatar}>
                  {pokemon.name.charAt(0).toUpperCase()}
                </div>
                <div className={styles.pokemonInfo}>
                  <h4>{pokemon.name}</h4>
                  <p>번호: {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className={styles.section}>
        <h3>개별 사용자 상세 정보 (Suspense 중첩)</h3>
        <div className={styles.userList}>
          <Suspense
            fallback={
              <div className={styles.loadingContainer}>
                사용자 정보 로딩 중...
              </div>
            }
          >
            <UserDetail userId="1" />
          </Suspense>
          <Suspense
            fallback={
              <div className={styles.loadingContainer}>
                사용자 정보 로딩 중...
              </div>
            }
          >
            <UserDetail userId="2" />
          </Suspense>
        </div>
      </section>
    </div>
  );
}

export default function UseParallelExample() {
  return (
    <Suspense
      fallback={
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>데이터를 불러오는 중...</p>
        </div>
      }
    >
      <ParallelData />
    </Suspense>
  );
}
