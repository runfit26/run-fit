import { LEVEL_OPTIONS, SORT_OPTIONS } from '@/constants/session-filter';
import { PaginationQueryParams } from './api';
import { CrewMember } from './crew';
import { Sido, Sigungu } from './region';

export type LevelValue = (typeof LEVEL_OPTIONS)[number]['value'];
export type SortValue = (typeof SORT_OPTIONS)[number]['value'];
export type RegionValue = Record<string, string[]>;

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
