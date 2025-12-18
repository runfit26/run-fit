import { useSyncExternalStore } from 'react';

export const BREAK_POINTS = {
  mobile: 0,
  tablet: 744,
  laptop: 1200,
  desktop: 1400,
} as const;

export type BreakPointKey = keyof typeof BREAK_POINTS;

export const MQ = {
  mobile: `(min-width: ${BREAK_POINTS.mobile}px)`,
  tablet: `(min-width: ${BREAK_POINTS.tablet}px)`,
  laptop: `(min-width: ${BREAK_POINTS.laptop}px)`,
  desktop: `(min-width: ${BREAK_POINTS.desktop}px)`,
} as const;

export function useMediaQuery(query: keyof typeof MQ) {
  const subscribe = (onStoreChange: () => void) => {
    const mql = window.matchMedia(MQ[query]);
    mql.addEventListener('change', onStoreChange);
    return () => mql.removeEventListener('change', onStoreChange);
  };

  const getSnapshot = () => window.matchMedia(MQ[query]).matches;
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
