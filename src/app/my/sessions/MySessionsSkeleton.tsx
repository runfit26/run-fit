export default function MySessionsSkeleton() {
  return (
    <section className="tablet:gap-16 flex flex-col gap-10">
      {/* 예정된 세션 섹션 */}
      <div>
        {/* 제목 */}
        <div className="mb-5 h-6 w-32 animate-pulse rounded bg-gray-600" />

        {/* 가로 스크롤 세션 카드들 */}
        <div className="tablet:gap-4 flex gap-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="laptop:w-[calc((100%-32px)/3)] tablet:w-[calc((100%-16px)/2)] w-[calc((100%-12px)/2)] shrink-0"
            >
              {/* SessionCard */}
              <div className="relative flex w-full flex-col">
                {/* 하트 아이콘 */}
                <div className="absolute top-3 right-3 z-3">
                  <div className="size-7 animate-pulse rounded-full bg-gray-600" />
                </div>

                {/* 세션 이미지 */}
                <div className="tablet:aspect-video relative aspect-165/185 w-full overflow-hidden rounded-lg">
                  <div className="h-full w-full animate-pulse bg-gray-600" />

                  {/* D-day 뱃지 */}
                  <div className="absolute top-3 left-3">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-600" />
                  </div>

                  {/* 위치 */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1">
                    <div className="size-4 animate-pulse rounded-full bg-gray-600" />
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-600" />
                  </div>
                </div>

                {/* 세션 정보 */}
                <div className="tablet:mt-[18px] my-3">
                  <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-600" />
                  <div className="mb-2 h-5 w-1/2 animate-pulse rounded bg-gray-600" />
                  <div className="flex items-center gap-1">
                    <div className="h-6 w-16 animate-pulse rounded-full bg-gray-600" />
                    <div className="h-6 w-12 animate-pulse rounded-full bg-gray-600" />
                  </div>
                </div>

                {/* 참가자 */}
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[1, 2, 3].map((j) => (
                      <div
                        key={j}
                        className="size-6 animate-pulse rounded-full bg-gray-600"
                      />
                    ))}
                  </div>
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 완료된 세션 섹션 */}
      <div>
        {/* 제목 */}
        <div className="mb-5 h-6 w-32 animate-pulse rounded bg-gray-600" />

        {/* 세로 리스트 */}
        <div className="tablet:gap-3 flex flex-col gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex flex-col gap-3">
              {/* CompletedSessionCard */}
              <div className="flex w-full items-center">
                <div className="flex w-full items-center gap-3">
                  {/* 세션 이미지 - 모바일: 126x90, 태블릿: 148x92 */}
                  <div className="tablet:h-[92px] tablet:w-[148px] h-[90px] w-[126px] shrink-0 animate-pulse rounded-lg bg-gray-600" />

                  {/* 세션 정보 */}
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      {/* 세션 이름 */}
                      <div className="tablet:h-6 h-5 w-40 animate-pulse rounded bg-gray-600" />
                      {/* 날짜/시간 */}
                      <div className="h-4 w-32 animate-pulse rounded bg-gray-600" />
                    </div>

                    {/* 배지들 (태블릿 이상) */}
                    <div className="tablet:flex hidden items-center gap-1">
                      <div className="h-6 w-16 animate-pulse rounded-full bg-gray-600" />
                      <div className="h-6 w-12 animate-pulse rounded-full bg-gray-600" />
                    </div>
                  </div>
                </div>

                {/* 리뷰 작성 버튼 (태블릿 이상) */}
                <div className="tablet:block hidden shrink-0">
                  <div className="h-11 w-[120px] animate-pulse rounded-lg bg-gray-600" />
                </div>
              </div>

              {/* 리뷰 작성 버튼 (모바일) */}
              <div className="tablet:hidden block">
                <div className="h-9 w-full animate-pulse rounded-lg bg-gray-600" />
              </div>

              {/* 구분선 */}
              <hr className="border-gray-750 w-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
