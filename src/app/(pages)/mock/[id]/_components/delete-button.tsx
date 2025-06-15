'use client';
import { deleteMockDataAxios } from '@/app/_api/mock';
import { useRouter } from 'next/navigation';
import Button from '../../_components/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface Props {
  userId: string;
  userName: string;
}

export default function DeleteButton({ userId, userName }: Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteMockDataAxios,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mock', 'users'] });
    },
  });

  const handleDelete = () => {
    if (confirm(`정말로 ${userName}를 삭제하시겠습니까?`)) {
      mutate(userId, {
        onSuccess: () => {
          alert('삭제되었습니다!');
          router.push('/mock');
        },
        onError: (error) => {
          alert('삭제 중 오류가 발생했습니다.');
          console.error(error);
        },
      });
    }
  };

  return (
    <Button color="danger" onClick={handleDelete} disabled={isPending}>
      {isPending ? '삭제 중...' : `${userName} 삭제`}
    </Button>
  );
}
