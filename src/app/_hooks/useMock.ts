import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  deleteMockDataAxios,
  getMockDataAxios,
  getMockDataAxiosById,
  updateMockDataAxios,
} from '../_api/mock';
import { QUERY_KEYS } from '../_constants/keys';

export function useDeleteMock(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMockDataAxios(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MOCK.users() });
      queryClient.removeQueries({ queryKey: QUERY_KEYS.MOCK.user(id) });
    },
  });
}

export function useGetMockList() {
  return useQuery({
    queryKey: QUERY_KEYS.MOCK.users(),
    queryFn: getMockDataAxios,
  });
}

export function useGetMockById(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.MOCK.user(id),
    queryFn: () => getMockDataAxiosById(id as string),
  });
}

export function useUpdateMock() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) =>
      updateMockDataAxios(id, isFavorite),
    onSuccess: () => {
      console.log('onSuccess');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MOCK.users() });
    },
  });
}
