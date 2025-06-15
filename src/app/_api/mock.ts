'use server';
import axios from 'axios';
// import { revalidatePath } from 'next/cache';

export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  isFavorite: boolean;
}

export const getMockDataAxios = async () => {
  const response = await axios.get<User[]>(
    'https://68432a98e1347494c31f4d83.mockapi.io/api/v1/users',
  );
  console.log('서버에서 데이터 불러옴');
  return response.data;
};

export const getMockDataAxiosById = async (id: string) => {
  const response = await axios.get<User>(
    `https://68432a98e1347494c31f4d83.mockapi.io/api/v1/users/${id}`,
  );
  return response.data;
};

export const deleteMockDataAxios = async (id: string) => {
  const response = await axios.delete(
    `https://68432a98e1347494c31f4d83.mockapi.io/api/v1/users/${id}`,
  );
  // revalidatePath('/mock');
  return response.data;
};

export const postMockDataAxios = async (userData: { name: string }) => {
  await axios.post<User>(
    'https://68432a98e1347494c31f4d83.mockapi.io/api/v1/users',
    {
      name: userData.name,
    },
  );

  // 클라이언트에서 불러오기 때문에 서버 컴포넌트에서 캐싱 업데이트 할 필요 없음
  // revalidatePath('/mock');
};

export const updateMockDataAxios = async (id: string, isFavorite: boolean) => {
  await axios.put<User>(
    `https://68432a98e1347494c31f4d83.mockapi.io/api/v1/users/${id}`,
    {
      isFavorite,
    },
  );
};
