import { Suspense } from "react";

export default function PokemonLayout({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>로딩중...</div>}>{children}</Suspense>;
}
