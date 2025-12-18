'use client';

import { useEffect, useState } from 'react';

type Device = 'desktop' | 'laptop' | 'tablet' | 'mobile';

const queryMap: Record<Device, string> = {
  desktop: '(min-width: 1400px)',
  laptop: '(min-width: 1200px) and (max-width: 1399px)',
  tablet: '(min-width: 744px) and (max-width: 1199px)',
  mobile: '(max-width: 743px)',
};

export function useMediaQuery(device: Device): boolean {
  const query = queryMap[device];
  const [matches, setMatches] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };

    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}
