'use client';

import { ErrorBoundary, Suspense } from '@suspensive/react';
import Spinner from '@/components/ui/Spinner';
import SessionDetail from './SessionDetail';
import SessionDetailErrorFallback from './SessionDetailErrorFallback';

export default function SessionDetailContainer({
  sessionId,
}: {
  sessionId: number;
}) {
  return (
    <ErrorBoundary
      fallback={({ error }) => <SessionDetailErrorFallback error={error} />}
    >
      <Suspense fallback={<Spinner />} clientOnly>
        <SessionDetail sessionId={sessionId} />
      </Suspense>
    </ErrorBoundary>
  );
}
