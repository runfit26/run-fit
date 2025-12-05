'use client';

import Script from 'next/script';
import React, { createContext, useContext, useState } from 'react';

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
const KAKAO_MAP_SCRIPT_SRC = `${process.env.NEXT_PUBLIC_KAKAO_MAP_URL}${KAKAO_JS_KEY}`;

interface KakaoMapContextValue {
  loaded: boolean;
}

const KakaoMapContext = createContext<KakaoMapContextValue | null>(null);

export function KakaoMapProvider({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [, setError] = useState<Error | null>(null);

  const handleLoad = () => {
    if (window.kakao && window.kakao.maps) {
      setLoaded(true);
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
      <KakaoMapContext.Provider value={{ loaded }}>
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
