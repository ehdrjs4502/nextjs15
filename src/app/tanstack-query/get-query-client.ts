import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 30,
        gcTime: 1000 * 60,
      },
      dehydrate: {
        // 대기 중인 쿼리를 데이터 조회에 포함
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === 'pending',
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // 서버: 항상 새로운 쿼리 클라이언트 생성
    return makeQueryClient();
  } else {
    // 브라우저: 쿼리 클라이언트가 없는 경우에만 새로 생성
    // React가 초기 렌더링 중에 일시 중단되더라도 새 클라이언트를 다시 만들지 않도록 하는 것이 매우 중요
    // 쿼리 클라이언트 생성 아래에 Suspense 경계가 있는 경우에는 필요하지 않을 수 있음
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
