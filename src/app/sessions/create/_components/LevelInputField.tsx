import SessionLevelCard from '@/components/session/SessionLevelCard';

export default function LevelInputField() {
  return (
    <div>
      <label>
        <span>난이도</span>
        <span>페이스와 별개로, 이 세션의 체감 난이도를 선택해주세요</span>
      </label>
      <div>
        <SessionLevelCard
          label="초급"
          description="천천히 몸을 풀며 가볍게 달리는 데 집중해요"
          size="sm"
          checked={false}
          onClick={() => {}}
        />
        <SessionLevelCard
          label="초급"
          description="천천히 몸을 풀며 가볍게 달리는 데 집중해요"
          size="sm"
          checked={false}
          onClick={() => {}}
        />
        <SessionLevelCard
          label="초급"
          description="천천히 몸을 풀며 가볍게 달리는 데 집중해요"
          size="sm"
          checked={false}
          onClick={() => {}}
        />
      </div>{' '}
    </div>
  );
}
