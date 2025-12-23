import PaceSlider from '@/components/ui/PaceSlider';

export default function PaceInputField() {
  return (
    <div>
      <label>
        <span>{'페이스 (분/km)'}</span>
        <span>세션에서 함께 달릴 기준 페이스를 선택해주세요!</span>
      </label>
      <PaceSlider className="" value={300} onValueChange={() => {}} />
    </div>
  );
}
