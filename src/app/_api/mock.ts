'use server';
import axios from 'axios';
import { revalidatePath } from 'next/cache';

export interface User {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export const getMockDataAxios = async () => {
  const response = await axios.get<User[]>(
    'https://68432a98e1347494c31f4d83.mockapi.io/api/v1/users',
  );
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
  revalidatePath('/mock');
  return response.data;
};

export const postMockDataAxios = async (userData: { name: string }) => {
  await axios.post<User>(
    'https://68432a98e1347494c31f4d83.mockapi.io/api/v1/users',
    {
      name: userData.name,
    },
  );

  revalidatePath('/mock');
};
