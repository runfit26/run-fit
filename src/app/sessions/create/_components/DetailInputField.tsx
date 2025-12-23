import Textarea from '@/components/ui/Textarea';

export default function DetailInputField() {
  return (
    <div className="laptop:block hidden">
      <label htmlFor="">상세 내용</label>
      <Textarea placeholder="세션에 대한 상세 설명을 작성해주세요" />
    </div>
  );
}
