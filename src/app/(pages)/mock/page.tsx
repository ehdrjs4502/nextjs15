import { getQueryClient } from '@/app/tanstack-query/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getMockData } from '@/app/_api/mock';
import List from './_components/list';

export const revalidate = 10;

export default async function MockPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(getMockData());
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <List />
    </HydrationBoundary>
  );
}
