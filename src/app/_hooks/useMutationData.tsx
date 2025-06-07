import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  queryKey: string[];
  queryFn: (id: string) => Promise<any>;
}

export const useMutationData = ({ queryKey, queryFn }: Props) => {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: async (id: string) => {
      const response = await queryFn(id);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  return { mutate, isError, isPending, isSuccess };
};
