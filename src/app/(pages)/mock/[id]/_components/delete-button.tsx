'use client';
import { deleteMockDataAxios } from '@/app/_api/mock';
import { useMutationData } from '@/app/_hooks/useMutationData';
import { useRouter } from 'next/navigation';
import Button from '../../_components/button';

interface Props {
  userId: string;
  userName: string;
}

export default function DeleteButton({ userId, userName }: Props) {
  const router = useRouter();

  const { mutate: deleteMockData, isPending } = useMutationData({
    queryKey: ['mock', 'users'],
    queryFn: deleteMockDataAxios,
  });

  const handleDelete = () => {
    if (confirm(`정말로 ${userName}를 삭제하시겠습니까?`)) {
      deleteMockData(userId, {
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
