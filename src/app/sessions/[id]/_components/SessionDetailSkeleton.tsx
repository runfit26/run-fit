'use client';

import { cn } from '@/lib/utils';

export default function SessionDetailSkeleton() {
  return (
    <>
      {/* Mobile/Tablet Layout */}
      <div className={cn('laptop:hidden flex', 'flex-col bg-gray-800 py-10')}>
        {/* SessionImage Skeleton */}
        <div className="relative w-full animate-pulse rounded-lg bg-gray-700">
          <div className="h-[220px] w-full bg-gray-700" />
        </div>

        {/* SessionShortInfo Skeleton */}
        <div className="flex flex-col gap-4 px-6 py-6">
          <div className="flex gap-3">
            <div className="h-6 w-3/4 animate-pulse rounded bg-gray-700" />
            <div className="h-6 w-1/4 animate-pulse rounded bg-gray-700" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-gray-700" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-gray-700" />
          </div>
        </div>

        {/* SessionDetailInfo Skeleton */}
        <div className="flex flex-col gap-4 border-t border-gray-700 px-6 py-6">
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-700" />
          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-gray-700" />
            <div className="h-4 w-full animate-pulse rounded bg-gray-700" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-700" />
          </div>
        </div>

        {/* CrewShortInfo Skeleton */}
        <div className="flex flex-col gap-4 border-t border-gray-700 px-6 py-6">
          <div className="h-5 w-1/3 animate-pulse rounded bg-gray-700" />
          <div className="flex gap-3">
            <div className="h-10 w-10 animate-pulse rounded-full bg-gray-700" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 animate-pulse rounded bg-gray-700" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Laptop Layout */}
      <div
        className={cn(
          'laptop:flex hidden',
          'mx-auto max-w-[1120px] gap-10 bg-gray-900 py-10'
        )}
      >
        {/* Left Column */}
        <div className="flex flex-1 flex-col gap-10 px-5">
          {/* SessionImage Skeleton */}
          <div className="relative w-full animate-pulse rounded-[20px] bg-gray-700">
            <div className="h-[360px] w-full rounded-[20px] bg-gray-700" />
          </div>

          {/* SessionDetailInfo Skeleton */}
          <div className="flex flex-col gap-4">
            <div className="h-6 w-1/3 animate-pulse rounded bg-gray-700" />
            <div className="space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-gray-700" />
              <div className="h-4 w-full animate-pulse rounded bg-gray-700" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-700" />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="laptop:w-[360px] flex flex-col gap-10">
          {/* SessionShortInfo Skeleton */}
          <div className="flex flex-col gap-4 rounded-[20px] bg-gray-800 p-6">
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-700" />
            <div className="space-y-2">
              <div className="h-4 w-full animate-pulse rounded bg-gray-700" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-gray-700" />
            </div>
          </div>

          {/* CrewShortInfo Skeleton */}
          <div className="flex flex-col gap-4 rounded-[20px] bg-gray-800 p-6">
            <div className="h-6 w-1/3 animate-pulse rounded bg-gray-700" />
            <div className="space-y-3">
              <div className="flex gap-3">
                <div className="h-12 w-12 animate-pulse rounded-full bg-gray-700" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 animate-pulse rounded bg-gray-700" />
                  <div className="h-3 w-1/3 animate-pulse rounded bg-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
