'use client';

import { useEffect, useRef, useState } from 'react';

interface FixedBottomBarProps {
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement | null>;
}

export default function FixedBottomBar({ children, ref }: FixedBottomBarProps) {
  return (
    <nav
      ref={ref}
      className="bg-gray-750 laptop:hidden fixed right-0 bottom-0 left-0 flex items-center gap-7 p-6"
      role="navigation"
      aria-label="하단 고정 메뉴"
    >
      {children}
    </nav>
  );
}

export function useFixedBottomBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const blockSize = useRef(0);
  const extraPadding = 30;

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const observer = new ResizeObserver(([entry]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newBlockSize = entry.borderBoxSize[0].blockSize;
        if (blockSize.current !== newBlockSize) {
          blockSize.current = newBlockSize;
          setHeight(newBlockSize + extraPadding);
        }
      }, 1000);
    });

    const currentRef = ref.current;
    if (currentRef) {
      blockSize.current = currentRef.offsetHeight;
      setHeight(blockSize.current + extraPadding);
      observer.observe(currentRef);
      return () => observer.disconnect();
    }
  }, []);

  return { ref, height };
}
