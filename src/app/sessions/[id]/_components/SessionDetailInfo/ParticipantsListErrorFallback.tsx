'use client';

import { UseQueryResult } from '@tanstack/react-query';
import Link from 'next/link';
import { GetSessionParticipantsResponse } from '@/api/fetch/sessions';
import Button from '@/components/ui/Button';
import { ApiError } from '@/lib/error';

interface ParticipantsListErrorFallbackProps {
  error: UseQueryResult<
    GetSessionParticipantsResponse,
    Error | ApiError
  >['error'];
}

export default function ParticipantsListErrorFallback({
  error,
}: ParticipantsListErrorFallbackProps) {
  let message = '참가자 목록을 불러오는 중 오류가 발생했습니다.';

  if (error instanceof ApiError) {
    if (error.code === '401' || error.code === 'UNAUTHORIZED') {
      message = '참가자 목록을 보려면 로그인이 필요합니다.';
    }
  }

  return (
    <div className="tablet:gap-2 flex flex-col gap-1">
      <h2 className="text-body2-semibold tablet:text-title3-semibold tablet:gap-2 flex gap-1">
        <span className="text-gray-50">참여 멤버</span>
      </h2>
      <div className="tablet:text-body2-medium text-body3-regular flex flex-col items-center gap-4 text-center text-gray-300">
        {message}
        {error instanceof ApiError &&
          (error.code === '401' || error.code === 'UNAUTHORIZED') && (
            <Button asChild className="w-fit" size="sm">
              <Link href="/signin">로그인</Link>
            </Button>
          )}
      </div>
    </div>
  );
}
