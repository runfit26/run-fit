'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { sessionQueries } from '@/api/queries/sessionQueries';
import SessionCard from '@/components/session/SessionCard';
import SessionFilterBar from '@/components/session/SessionFilterBar';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';

export default function SessionPage() {
  const filters = useSessionFilters();

  const { data: sessions } = useQuery(
    sessionQueries.list({
      page: 0,
      size: 10,
      ...filters.queryFilters,
    })
  );

  return (
    <main className="h-main mx-auto flex max-w-[1120px] flex-col items-center justify-start">
      <div className="flex w-full items-center justify-between">
        {/** 배너 */}
        <div>
          <h2 className="text-title1-bold mb-4 italic">
            나와 FIT한
            <br />
            러닝 메이트를 찾다
          </h2>
          <span className="text-body3-regular text-gray-200">
            러닝 페이스와 선호하는 스타일에 딱 맞는 세션을 찾아보세요!
          </span>
        </div>
        <div className="pt-[30px] pb-5">
          <Image
            src="/assets/session-list.png"
            alt="Session List"
            // className="origin-center scale-[0.8]"
            width={417}
            height={235}
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center">
        <SessionFilterBar {...filters} />
        <div className="grid w-full grid-cols-3 gap-6">
          {sessions?.content?.map((session) => (
            <SessionCard key={session.id} session={session} />
          ))}
        </div>
      </div>
    </main>
  );
}
