'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userQueries } from '@/api/queries/userQueries';
import SessionCard from '@/components/session/SessionCard';
import Button from '@/components/ui/Button';
import Spinner from '@/components/ui/Spinner';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export default function MyCreatedSessionsPage() {
  const isMobile = useMediaQuery({ max: 'tablet' });
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery(userQueries.me.sessions.created());

  const sessions = data?.sessions ?? [];
  const hasNoSessions = !isLoading && sessions.length === 0;

  const bottomRef = useInfiniteScroll(fetchNextPage, !!hasNextPage);

  if (isLoading) {
    return (
      <section className="flex h-[60vh] items-center justify-center">
        <Spinner className="text-brand-500 size-8" />
      </section>
    );
  }

  if (hasNoSessions) {
    return (
      <section className="flex h-[60vh] flex-col items-center justify-center gap-6">
        <Image
          width={isMobile ? 240 : 300}
          height={isMobile ? 180 : 220}
          src="/assets/empty-session.png"
          alt="세션 없음"
        />
        <p className="tablet:text-body2-medium text-body3-regular text-center text-gray-300">
          아직 생성한 세션이 없어요
          <br />
          새로운 세션을 만들어볼까요?
        </p>

        <Button
          variant="default"
          onClick={() => {
            router.push('/sessions/create');
          }}
        >
          세션 만들기
        </Button>
      </section>
    );
  }

  return (
    <section className="tablet:gap-3 flex flex-col gap-2">
      <h2 className="text-body2-semibold tablet:text-body1-semibold text-gray-50">
        내가 만든 세션
      </h2>
      <div className="tablet:gap-x-4 tablet:gap-y-8 laptop:gap-y-10 laptop:grid-cols-3 grid grid-cols-2 gap-x-3 gap-y-2">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}
        {/* infinite scroll sentinel */}
        <div ref={bottomRef} className="h-5" />
        {isFetchingNextPage && (
          <div className="flex justify-center">
            <Spinner className="text-brand-500 size-5" />
          </div>
        )}
      </div>
    </section>
  );
}
