'use client';

import { use } from 'react';
import { getMockDataAxiosById, User } from '../../_api/mock';
import styles from './use.module.css';

interface UseDetailProps {
  userId: string;
}

// Promise를 생성하는 함수
const fetchUserById = (id: string) => {
  return getMockDataAxiosById(id);
};

export default function UseDetailExample({ userId }: UseDetailProps) {
  // use 훅으로 특정 사용자 정보를 가져옴
  const user: User = use(fetchUserById(userId));

  return (
    <div className={styles.container}>
      <h3>React 19 use 훅 - 상세 정보</h3>

      <div className={styles.userCard}>
        <img src={user.avatar} alt={user.name} className={styles.avatar} />
        <div className={styles.userInfo}>
          <h3>{user.name}</h3>
          <p>
            <strong>ID:</strong> {user.id}
          </p>
          <p>
            <strong>생성일:</strong> {new Date(user.createdAt).toLocaleString()}
          </p>
          <span className={styles.favorite}>
            {user.isFavorite ? '❤️ 즐겨찾기됨' : '🤍 즐겨찾기 안됨'}
          </span>
        </div>
      </div>
    </div>
  );
}
