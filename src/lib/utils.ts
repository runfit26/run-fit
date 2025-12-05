import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { API_SIDO_TO_SIDO_MAP, Sido } from '@/types/region';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * API로 반환한 시군구 문자열에서 Sigungu 타입에 맞는 부분을 추출합니다.
 * @example
 * extractSigungu('창원시 성산구') // '창원시'
 * extractSigungu('제주시') // '제주시'
 */
export const extractSigungu = (fullAddress: string): string => {
  const parts = fullAddress.split(' ');
  return parts[0];
};

/**
 * API로 반환한 시도 문자열을 Sido 타입에 맞게 변환합니다.
 * 변환할 수 없는 경우 null을 반환합니다.
 * @example
 * normalizeSido('서울') // '서울'
 * normalizeSido('제주특별자치도') // '제주'
 */
export const normalizeSido = (apiSido: string): Sido | null => {
  return API_SIDO_TO_SIDO_MAP[apiSido] ?? null;
};
