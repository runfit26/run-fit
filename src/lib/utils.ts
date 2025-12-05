import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Coords } from '@/types/kakaoMap';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 카카오맵 링크 생성
 * @param address - 주소 (한글)
 * @param coords - 좌표 { lat, lng }
 * @returns 카카오맵 링크 URL
 */
export function createKakaoMapLink(address: string, coords: Coords): string {
  return `https://map.kakao.com/link/map/${encodeURIComponent(address)},${coords.lat},${coords.lng}`;
}
