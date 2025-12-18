'use client';

import { useState } from 'react';
import { DateRange } from 'react-day-picker';
import DateFilter from '@/components/ui/DateFilter';
import Dropdown from '@/components/ui/Dropdown';
import FilterButton from '@/components/ui/FilterButton';
import RegionFilter from '@/components/ui/RegionFilter';
import TimeFilter from '@/components/ui/TimeFilter';

const LEVEL_OPTIONS = [
  { label: '초급', value: 'BEGINNER' },
  { label: '중급', value: 'INTERMEDIATE' },
  { label: '고급', value: 'ADVANCED' },
] as const;
const SORT_OPTIONS = [
  { label: '최신 생성순', value: 'createdAtDesc' },
  { label: '모임 시작일순', value: 'sessionAtAsc' },
  { label: '마감 임박순', value: 'registerByAsc' },
] as const;

export default function SessionFilterBar() {
  const [region, setRegion] = useState<Record<string, string[]> | undefined>();
  const [date, setDate] = useState<DateRange | undefined>();
  const [time, setTime] = useState<[number, number] | undefined>();
  const [level, setLevel] = useState<
    (typeof LEVEL_OPTIONS)[number]['value'] | undefined
  >();
  const [sort, setSort] = useState<
    (typeof SORT_OPTIONS)[number]['value'] | undefined
  >();

  return (
    <div className="mb-6 flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <RegionFilter value={region} onChange={setRegion} />
        <DateFilter value={date} onChange={setDate} />
        <TimeFilter value={time} onChange={setTime} />
        <Dropdown size="lg" hasSelected={Boolean(level)}>
          <Dropdown.Trigger>
            {LEVEL_OPTIONS.find((option) => option.value === level)?.label ||
              '난이도'}
          </Dropdown.Trigger>
          <Dropdown.Content>
            {LEVEL_OPTIONS.map((option) => (
              <Dropdown.Item
                key={option.value}
                selected={level === option.value}
                onSelect={() => setLevel(option.value)}
              >
                {option.label}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
        <FilterButton className="pl-2" />
      </div>
      <Dropdown size="lg">
        <Dropdown.Trigger className="bg-transparent">
          {SORT_OPTIONS.find((option) => option.value === sort)?.label ||
            SORT_OPTIONS[0].label}
        </Dropdown.Trigger>
        <Dropdown.Content>
          {SORT_OPTIONS.map((option) => (
            <Dropdown.Item
              key={option.value}
              selected={sort === option.value}
              onSelect={() => setSort(option.value)}
            >
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Content>
      </Dropdown>
    </div>
  );
}
