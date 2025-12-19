import { PaginationQueryParams } from './api';
import { CrewMember } from './crew';
import { Sido, Sigungu } from './region';

export const LEVEL_OPTIONS = [
  { label: '전체', value: undefined },
  { label: '초급', value: 'BEGINNER' },
  { label: '중급', value: 'INTERMEDIATE' },
  { label: '고급', value: 'ADVANCED' },
] as const;

export const SORT_OPTIONS = [
  { label: '최신 생성순', value: 'createdAtDesc' },
  { label: '모임 시작일순', value: 'sessionAtAsc' },
  { label: '마감 임박순', value: 'registerByAsc' },
] as const;

export type LevelValue = (typeof LEVEL_OPTIONS)[number]['value'];
export type SortValue = (typeof SORT_OPTIONS)[number]['value'];

export interface Session<City extends Sido = Sido> {
  id: number;
  crewId: number;
  hostUserId: number;
  name: string;
  description: string;
  image: string;
  city: City;
  district: Sigungu<City>;
  location: string;
  coords: {
    lat: number;
    lng: number;
  };
  sessionAt: string;
  registerBy: string;
  level: LevelValue
  status: SessionStatus;
  pace: number;
  maxParticipantCount: number;
  currentParticipantCount: number;
  createdAt: string;
  liked: boolean;
  participants: CrewMember[];
}

export type SessionListFilters = PaginationQueryParams & {
  city?: string[];
  district?: string[];
  crewId?: number;
  level?: LevelValue;
  dateFrom?: string;
  dateTo?: string;
  timeFrom?: string;
  timeTo?: string;
  sort: SortValue;
};

export type Level = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
export type SessionStatus = 'OPEN' | 'CLOSED';
