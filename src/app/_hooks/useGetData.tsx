import { useQuery } from '@tanstack/react-query';

interface Props<T> {
  queryKey: string[];
  queryFn: () => Promise<T>;
}

export const useGetData = <T,>({ queryKey, queryFn }: Props<T>) => {
  const { data, isLoading, isError, isSuccess } = useQuery<T>({
    queryKey,
    queryFn,
  });
  return { data, isLoading, isError, isSuccess };
};
