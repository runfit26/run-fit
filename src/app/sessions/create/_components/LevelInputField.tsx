import SessionLevelCard from '@/components/session/SessionLevelCard';

export default function LevelInputField() {
  return (
    <div>
      <label className="mb-4 block">
        <p className="tablet:text-body3-semibold text-caption-semibold">
          난이도
        </p>
        <p className="tablet:text-body3-semibold text-caption-regular text-gray-300">
          페이스와 별개로, 이 세션의 체감 난이도를 선택해주세요
        </p>
      </label>
      <div className="flex flex-col gap-3">
        <SessionLevelCard level="BEGINNER" checked={false} onClick={() => {}} />
        <SessionLevelCard
          level="INTERMEDIATE"
          checked={false}
          onClick={() => {}}
        />
        <SessionLevelCard level="ADVANCED" checked={false} onClick={() => {}} />
      </div>
    </div>
  );
}
