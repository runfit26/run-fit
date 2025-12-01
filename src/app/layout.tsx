import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RunFit - 러너를 위한 지역 기반 러닝 모임 플랫폼',
  description:
    '지역·날짜·페이스에 맞는 러닝 모임을 쉽게 탐색하고 참여할 수 있는 러닝 커뮤니티 플랫폼',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <header>
        {/* GNB */}
        {/* 왼쪽: 로고, 세션 목록, 크루 목록 */}
        {/* 오른쪽: (로그인 상태에 따라) 프로필 / 로그인 & 회원 가입  */}
      </header>
      <body className="antialiased">{children}</body>
    </html>
  );
}
