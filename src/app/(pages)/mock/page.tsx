import { getQueryClient } from '@/app/tanstack-query/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import List from './_components/list';
import { getMockDataAxios } from '@/app/_api/mock';
import { QUERY_KEYS } from '@/app/_constants/keys';

export default async function MockPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.MOCK.users(),
    queryFn: getMockDataAxios,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <List />
    </HydrationBoundary>
  );
}
