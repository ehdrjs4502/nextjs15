export const QUERY_KEYS = {
  MOCK: {
    users: () => ['users'] as const,
    user: (id: string) => [...QUERY_KEYS.MOCK.users(), id] as const,
  },
};
