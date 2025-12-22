'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { sessionQueries } from '@/api/queries/sessionQueries';
import DateFilter from '@/components/session/DateFilter';
import FilterModal from '@/components/session/FilterModal';
import LevelFilter from '@/components/session/LevelFilter';
import RegionFilter from '@/components/session/RegionFilter';
import SessionCard from '@/components/session/SessionCard';
import SortOptions from '@/components/session/SortOptions';
import TimeFilter from '@/components/session/TimeFilter';
import FilterButton from '@/components/ui/FilterButton';
import { SessionFilterState } from '@/constants/session-filter';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import { SessionFilterProvider } from '@/provider/SessionFilterProvider';

export default function SessionPage() {
  const { filters, queryFilters, applyFilters, activeFilterCount } =
    useSessionFilters();

  const {
    data: sessions,
    isLoading,
    isError,
  } = useQuery(
    sessionQueries.list({
      size: 10,
      ...queryFilters,
    })
  );

  const isDesktop = useMediaQuery({ min: 'laptop' });
  const isTablet = useMediaQuery({ min: 'tablet', max: 'laptop' });
  const isMobile = useMediaQuery({ max: 'tablet' });

  if (isLoading) {
    return (
      <div className="h-main flex items-center justify-center text-gray-300">
        로딩 중...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="h-main text-error-100 flex items-center justify-center">
        세션 목록을 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <SessionFilterProvider initialFilters={filters} applyFilters={applyFilters}>
      <main
        className={cn(
          'h-main mx-auto flex max-w-[1120px] flex-col items-center justify-start',
          isMobile && 'px-4 pt-6',
          isTablet && 'px-8',
          isDesktop && 'px-0'
        )}
      >
        <div
          className={cn(
            'flex w-full items-center justify-between',
            isMobile && 'hidden',
            isTablet && 'py-[26px]',
            isDesktop && 'pt-[33px]'
          )}
        >
          <div>
            <h2 className="text-title1-bold mb-4 italic">
              <Image
                src="/assets/session-list-title.png"
                alt="Sessions"
                width={245.18}
                height={70}
              />
            </h2>
            <span className="text-body3-regular text-gray-200">
              러닝 페이스와 선호하는 스타일에 딱 맞는 세션을 찾아보세요!
            </span>
          </div>
          <div className="pt-[30px] pb-5">
            <Image
              src="/assets/session-list.png"
              alt="Session List"
              width={isDesktop ? 417 : 302}
              height={isDesktop ? 235 : 170}
            />
          </div>
        </div>

        <ScrollFilterBar
          filters={filters}
          applyFilters={applyFilters}
          activeFilterCount={activeFilterCount}
        />

        <div className="mt-6 flex w-full flex-1 items-center justify-center py-20">
          {sessions?.content?.length ? (
            <div className="desktop:grid-cols-3 grid w-full grid-cols-2 gap-6">
              {sessions.content.map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-10">
              <Image
                src="/assets/empty-session.png"
                alt="No Sessions"
                width={300}
                height={150}
              />
              <span className="text-body2-medium text-center text-gray-300">
                아직 생성된 세션이 없어요 <br /> 세션은 크루를 개설하거나 <br />
                운영진으로 활동할 때 만들 수 있어요!
              </span>
            </div>
          )}
        </div>
      </main>
    </SessionFilterProvider>
  );
}

interface ScrollFilterBarProps {
  filters: SessionFilterState;
  applyFilters: (filters: SessionFilterState) => void;
  activeFilterCount: number;
}

function ScrollFilterBar({
  filters,
  applyFilters,
  activeFilterCount,
}: ScrollFilterBarProps) {
  const isDesktop = useMediaQuery({ min: 'laptop' });
  const isMobile = useMediaQuery({ max: 'tablet' });

  return (
    <>
      <div id="scrollable-filter-list" className="flex w-full items-center">
        <div className="scrollbar-hide tablet:pt-5 relative flex flex-1 items-center gap-2 overflow-x-auto">
          <div className="scrollbar-hide relative flex items-center overflow-x-auto">
            <div
              id="scrollable-filter-list"
              className="flex w-max items-center gap-2"
            >
              <RegionFilter
                value={filters.region}
                onChange={(region) => applyFilters({ ...filters, region })}
              />
              <DateFilter
                value={filters.date}
                onChange={(date) => applyFilters({ ...filters, date })}
              />
              <TimeFilter
                value={filters.time}
                onChange={(time) => applyFilters({ ...filters, time })}
              />
              <LevelFilter
                value={filters.level}
                onChange={(level) => applyFilters({ ...filters, level })}
              />
            </div>
          </div>
          {isDesktop && (
            <div className="relative overflow-visible">
              <FilterModal>
                <FilterButton count={activeFilterCount} />
              </FilterModal>
            </div>
          )}
          <div
            className={
              'pointer-events-none absolute top-0 right-0 h-full w-[54px] bg-gradient-to-l from-gray-900 to-transparent backdrop-blur-[0.5px]'
            }
          />
        </div>
        <div className="tablet:pt-5 flex items-center">
          {!isDesktop && (
            <FilterModal>
              <FilterButton count={activeFilterCount} />
            </FilterModal>
          )}
          {!isMobile && (
            <SortOptions
              value={filters.sort}
              onChange={(sort) => applyFilters({ ...filters, sort })}
            />
          )}
        </div>
      </div>
      {isMobile && (
        <div className="mt-4 mb-2 flex w-full shrink-0 justify-end">
          <SortOptions
            value={filters.sort}
            onChange={(sort) => applyFilters({ ...filters, sort })}
          />
        </div>
      )}
    </>
  );
}
