'use client';

import Script from 'next/script';
import React, { createContext, useCallback, useContext, useState } from 'react';
import { Coords } from '@/types/kakaoMap';

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const KAKAO_MAP_SCRIPT_SRC = `${process.env.NEXT_PUBLIC_KAKAO_MAP_URL}?appkey=${KAKAO_JS_KEY}&autoload=false`;

type CreateMapFn = (
  container: HTMLElement,
  options: Omit<kakao.maps.MapOptions, 'center'> & {
    center: Coords;
  }
) => kakao.maps.Map | undefined;

type CreateMarkerFn = (
  map: kakao.maps.Map,
  position: Coords
) => kakao.maps.Marker | undefined;

interface KakaoMapContextValue {
  loaded: boolean;
  createMap: CreateMapFn;
  createMarker: CreateMarkerFn;
}

const KakaoMapContext = createContext<KakaoMapContextValue | null>(null);

export function KakaoMapProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [, setError] = useState<Error | null>(null);

  const createMap: CreateMapFn = useCallback(
    (container, options) => {
      if (!loaded || !window.kakao?.maps) {
        return;
      }

      const center = new window.kakao.maps.LatLng(
        options.center.lat,
        options.center.lng
      );

      const mapOptions = {
        draggable: false,
        scrollwheel: false,
        ...options,
        center: center,
      };

      return new window.kakao.maps.Map(container, mapOptions);
    },
    [loaded]
  );

  const createMarker: CreateMarkerFn = useCallback(
    (map, position) => {
      if (!loaded || !window.kakao?.maps) {
        return;
      }

      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(position.lat, position.lng),
      });

      marker.setMap(map);
      return marker;
    },
    [loaded]
  );

  const handleLoad = () => {
    if (window.kakao) {
      window.kakao.maps.load(() => {
        setLoaded(true);
      });
    } else {
      setError(
        new Error(
          'Kakao Map script loaded, but window.kakao.maps is not available.'
        )
      );
    }
  };

  const handleError = () => {
    setError(new Error('Failed to load Daum Postcode script'));
  };

  /*
    useEffect(() => {
      if (error) {
        throw error;
      }
    }, [error]);
  */

  return (
    <>
      <Script
        src={KAKAO_MAP_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => handleLoad()}
        onError={() => handleError()}
      />
      <KakaoMapContext.Provider value={{ loaded, createMap, createMarker }}>
        {children}
      </KakaoMapContext.Provider>
    </>
  );
}

export function useKakaoMap() {
  const ctx = useContext(KakaoMapContext);
  if (!ctx) {
    throw new Error('useKakaoMap must be used within KakaoMapProvider');
  }
  return ctx;
}
