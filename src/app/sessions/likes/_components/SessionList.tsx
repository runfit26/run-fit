'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { userQueries } from '@/api/queries/userQueries';
import SessionCard from '@/components/session/SessionCard';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function SessionList() {
  const query = useSuspenseInfiniteQuery(userQueries.me.likes());
  const loadMoreRef = useInfiniteScroll(query.fetchNextPage, query.hasNextPage);

  return (
    <>
      <ul className="laptop:grid-cols-3 grid w-full grid-cols-2 gap-6">
        {query.data?.sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            displayParticipants={true}
          />
        ))}
      </ul>
      <div ref={loadMoreRef} className="h-1" />
    </>
  );
}
