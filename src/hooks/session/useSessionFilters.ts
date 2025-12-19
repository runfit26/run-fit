'use client';

import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  DEFAULT_SESSION_FILTER,
  LevelFilterValue,
  SessionFilterState,
} from '@/constants/session-filter';
import { formatMinutesToHHmm } from '@/lib/time';
import { SessionListFilters, SessionSort } from '@/types';

/**
 * 세션 페이지의 필터 훅
 * 읽기 전용 필터 상태와 URL 쿼리 변환 및 적용 함수 제공
 * @returns
 * - filters: UI에서 사용하는 필터 상태
 * - queryFilters: API 쿼리에 사용할 필터 객체
 * - applyFilters: 필터 상태를 받아 URL 쿼리로 적용하는 함수
 * - resetFilters: 필터를 기본값으로 리셋하는 함수
 */
export function useSessionFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();

  /* --------------------------
   * 1) URL 쿼리 -> UI 필터 변환
   * -------------------------- */
  const filters: SessionFilterState = useMemo(() => {
    // 다중 지역 가져오기
    const cityList = searchParams.getAll('city');
    const districtList = searchParams.getAll('district');

    // region 객체 재구성
    let region: Record<string, string[]> | undefined = undefined;

    if (cityList.length > 0 && districtList.length > 0) {
      region = cityList.reduce(
        (acc, city, i) => {
          const district = districtList[i];
          if (!acc[city]) acc[city] = [];
          if (district) acc[city].push(district);
          return acc;
        },
        {} as Record<string, string[]>
      );
    }

    return {
      page: Number(searchParams.get('page')) || DEFAULT_SESSION_FILTER.page,
      sort:
        (searchParams.get('sort') as SessionSort) ??
        DEFAULT_SESSION_FILTER.sort,
      level:
        (searchParams.get('level') as LevelFilterValue) ??
        DEFAULT_SESSION_FILTER.level,
      region,
      date: searchParams.get('dateFrom')
        ? {
            from: new Date(searchParams.get('dateFrom')!),
            to: new Date(searchParams.get('dateTo')!),
          }
        : DEFAULT_SESSION_FILTER.date,
      time:
        searchParams.get('timeFrom') && searchParams.get('timeTo')
          ? [
              Number(searchParams.get('timeFrom')),
              Number(searchParams.get('timeTo')),
            ]
          : DEFAULT_SESSION_FILTER.time,
    };
  }, [searchParams]);

  /* --------------------------
   * 2) UI 필터 -> API 필터 변환
   * -------------------------- */
  const queryFilters: SessionListFilters = useMemo(() => {
    const { region, date, time, level, sort, page } = filters;

    const timeFrom = time ? formatMinutesToHHmm(time[0]) : undefined;
    const rawTimeTo = time ? time[1] : undefined;
    const safeTimeTo = rawTimeTo === 1440 ? 1439 : rawTimeTo;

    const timeTo =
      safeTimeTo !== undefined ? formatMinutesToHHmm(safeTimeTo) : undefined;

    return {
      level,
      city: region ? Object.keys(region) : undefined,
      district: region ? Object.values(region).flat() : undefined,
      dateFrom: date?.from ? format(date.from, 'yyyy-MM-dd') : undefined,
      dateTo: date?.to ? format(date.to, 'yyyy-MM-dd') : undefined,
      timeFrom,
      timeTo,
      sort,
      page,
    };
  }, [filters]);

  /* --------------------------
   * 3) 필터 적용 시 URL 업데이트
   * -------------------------- */
  const applyFilters = (next: SessionFilterState) => {
    const { region, date, time, level, sort, page } = next;
    const params = new URLSearchParams();

    if (level) params.set('level', level);
    if (sort) params.set('sort', sort);
    if (page != null) params.set('page', String(page));

    // 다중 지역 설정
    if (region) {
      Object.entries(region).forEach(([city, districts]) => {
        districts.forEach((district) => {
          params.append('city', city);
          params.append('district', district);
        });
      });
    }

    if (date?.from) {
      params.set('dateFrom', format(date.from, 'yyyy-MM-dd'));
      params.set('dateTo', format(date.to!, 'yyyy-MM-dd'));
    }

    if (time) {
      params.set('timeFrom', time[0] + '');
      params.set('timeTo', time[1] + '');
    }

    router.push(`/sessions?${params.toString()}`);
  };

  /* --------------------------
   * 4) 필터 개수 계산
   * -------------------------- */
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.region && Object.keys(filters.region).length > 0) count++;
    if (filters.date?.from || filters.date?.to) count++;
    if (filters.time && (filters.time[0] !== 0 || filters.time[1] !== 720))
      count++;
    if (filters.level) count++;
    if (filters.sort !== DEFAULT_SESSION_FILTER.sort) count++;
    return count;
  }, [filters]);

  return {
    filters,
    queryFilters,
    applyFilters,
    activeFilterCount,
  };
}
