import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '포켓몬 도감 - 1세대 포켓몬 정보',
  description: '1세대 포켓몬들의 정보를 확인할 수 있는 도감입니다.',
  openGraph: {
    title: '포켓몬 도감',
    description: '1세대 포켓몬 정보 도감',
    type: 'website',
  },
};

export default function PokemonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
