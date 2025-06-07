import axios from 'axios';
import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

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

export const deleteMockDataAxios = async (id: string) => {
  const response = await axios.delete(
    `https://68432a98e1347494c31f4d83.mockapi.io/api/v1/users/${id}`,
  );
  return response.data;
};

export const getMockData = () =>
  queryOptions<User[]>({
    queryKey: ['mock', 'users'],
    queryFn: async () => {
      const response = await getMockDataAxios();
      return response;
    },
  });

export const useDeleteMockData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await deleteMockDataAxios(id);
      return response;
    },

    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['mock', 'users'] });
      queryClient.setQueryData(['mock', 'users'], (old: User[]) =>
        old.filter((u) => u.id !== id),
      );
    },

    onError: (error) => {
      console.error(error);
    },
  });
};
