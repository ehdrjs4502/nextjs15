'use client';

import { use, Suspense } from 'react';
import styles from './use.module.css';
import axios from 'axios';
import { User } from '@/app/_api/mock';
import { ErrorBoundary } from 'react-error-boundary';

// Promise를 생성하는 함수
const getMockDataAxios = async () => {
  const response = await axios.get<User[]>(
    `https://${process.env.NEXT_PUBLIC_API_KEY}.mockapi.io/api/v1/users`,
  );
  return response.data;
};

// 로딩 컴포넌트
function LoadingUsers() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p>사용자 데이터를 불러오는 중...</p>
    </div>
  );
}

// 실제 데이터를 가져오는 컴포넌트
function UserList() {
  const users = use(getMockDataAxios());

  return (
    <div className={styles.container}>
      <h2>React 19 use 훅 + Suspense 예제</h2>
      <p>서버에서 {users.length}명의 사용자를 불러왔습니다.</p>

      <div className={styles.userList}>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <img src={user.avatar} alt={user.name} className={styles.avatar} />
            <div className={styles.userInfo}>
              <h3>{user.name}</h3>
              <p>ID: {user.id}</p>
              <p>생성일: {new Date(user.createdAt).toLocaleDateString()}</p>
              <span className={styles.favorite}>
                {user.isFavorite ? '❤️ 즐겨찾기' : '🤍 즐겨찾기 안함'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UseHookExample() {
  return (
    <ErrorBoundary fallback={<div>에러가 발생했습니다.</div>}>
      <Suspense fallback={<LoadingUsers />}>
        <UserList />
      </Suspense>
    </ErrorBoundary>
  );
}
