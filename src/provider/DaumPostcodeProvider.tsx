'use client';

import Script from 'next/script';
import React, { createContext, useContext, useState } from 'react';

type DaumPostcodeContextValue = {
  loaded: boolean;
};

const DaumPostcodeContext = createContext<DaumPostcodeContextValue | null>(
  null
);

export function DaumPostcodeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Script
        src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.daum?.Postcode) {
            setLoaded(true);
          } else {
            console.error(
              'Daum Postcode script loaded, but window.daum.Postcode is not available.'
            );
          }
        }}
      />
      <DaumPostcodeContext.Provider value={{ loaded }}>
        {children}
      </DaumPostcodeContext.Provider>
    </>
  );
}

export function useDaumPostcode() {
  const ctx = useContext(DaumPostcodeContext);
  if (!ctx) {
    throw new Error('useDaumPostcode must be used within DaumPostcodeProvider');
  }
  return ctx;
}
