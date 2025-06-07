'use client';
import { getMockData, useDeleteMockData, User } from '@/app/_api/mock';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import Button from '../button';
import Card from '../card';
import S from './list.module.css';

export default function List() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data } = useQuery(getMockData());
  const { mutate: deleteMockData } = useDeleteMockData();

  return (
    <div>
      <Button
        color="danger"
        onClick={() => {
          if (selectedUser) {
            deleteMockData(selectedUser.id);
          }
        }}
      >
        Delete
      </Button>
      <div className={S.container}>
        {data?.map((user) => (
          <Card
            key={user.id}
            user={user}
            onClick={() => setSelectedUser(user)}
            isSelected={selectedUser?.id === user.id}
          />
        ))}
      </div>
    </div>
  );
}
