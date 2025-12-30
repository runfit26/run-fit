'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useSessionFilters } from '@/hooks/session/useSessionFilters';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';
import { sessionQueries } from '@/lib/api/queries/sessionQueries';
import { SessionFilterProvider } from '@/provider/SessionFilterProvider';
import FilterBar from '../FilterBar';
import SessionList from '../SessionList';

export default function SessionPageInner() {
  const { filters, queryFilters, applyFilters, activeFilterCount } =
    useSessionFilters();

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
    sessionQueries.infiniteList({ ...queryFilters })
  );

  const loadMoreRef = useInfiniteScroll(() => fetchNextPage(), hasNextPage);

  return (
    <SessionFilterProvider initialFilters={filters} applyFilters={applyFilters}>
      <FilterBar
        filters={filters}
        applyFilters={applyFilters}
        activeFilterCount={activeFilterCount}
      />
      <SessionList data={data?.sessions} loadMoreRef={loadMoreRef} />
    </SessionFilterProvider>
  );
}
