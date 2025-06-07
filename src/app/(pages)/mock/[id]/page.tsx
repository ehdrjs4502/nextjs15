import { getMockDataAxios, getMockDataAxiosById } from '@/app/_api/mock';
import { getQueryClient } from '@/app/tanstack-query/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import Detail from './_components/detail';

export const generateStaticParams = async () => {
  const users = await getMockDataAxios();
  return users.map((user) => ({ id: user.id }));
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MockDetailPage({ params }: Props) {
  const { id } = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['mock', 'users', id],
    queryFn: () => getMockDataAxiosById(id),
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Detail id={id} />
    </HydrationBoundary>
  );
}
