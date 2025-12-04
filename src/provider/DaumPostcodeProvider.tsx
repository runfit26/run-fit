'use client';

import Script from 'next/script';
import React, { createContext, useContext, useState } from 'react';

const DAUM_POSTCODE_SCRIPT_SRC = `${process.env.NEXT_PUBLIC_DAUM_POSTCODE_URL || '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js'}`;

interface DaumPostcodeContextValue {
  loaded: boolean;
  error: Error | null;
  openAddressSearch: (options: {
    onSelectComplete: (address: string) => void;
  }) => void;
}

const DaumPostcodeContext = createContext<DaumPostcodeContextValue | null>(
  null
);

export function DaumPostcodeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const openAddressSearch = ({
    onSelectComplete,
  }: {
    onSelectComplete: (address: string) => void;
  }) => {
    if (!loaded || !window.daum?.Postcode) {
      return;
    }

    return new window.daum.Postcode({
      oncomplete: (data) => {
        onSelectComplete(data.address);
      },
    }).open({
      popupTitle: '도로명 주소 검색',
      popupKey: 'postcodePopup',
    });
  };

  return (
    <>
      <Script
        src={DAUM_POSTCODE_SCRIPT_SRC}
        strategy="afterInteractive"
        onLoad={() => {
          if (window.daum?.Postcode) {
            setLoaded(true);
          } else {
            setError(
              new Error(
                'Daum Postcode script loaded, but window.daum.Postcode is not available.'
              )
            );
          }
        }}
      />
      <DaumPostcodeContext.Provider
        value={{ loaded, error, openAddressSearch }}
      >
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
