import { useIsFetching } from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

/**
 * 특정 요소가 뷰포트(화면)에 진입했을 때 자동으로 callback을 호출하는 무한 스크롤용 커스텀 훅
 *
 * @param callback - 요소가 화면에 나타났을 때 실행할 함수 (예: fetchNextPage)
 * @param enabled - 무한 스크롤 동작 여부를 제어하는 값 (예: hasNextPage)
 * @returns ref - 화면에 나타남 여부를 감지할 DOM 요소에 연결할 ref
 */
export function useInfiniteScroll(callback: () => void, enabled = true) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isFetching = useIsFetching();

  useEffect(() => {
    if (!enabled || !ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && isFetching === 0) {
          callback();
        }
      },
      {
        threshold: 0.25, // 요소가 25% 보일 때 콜백 실행
      }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback, enabled, isFetching]);

  return ref;
}
