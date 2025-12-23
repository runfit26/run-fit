import DatePicker from '@/components/ui/DatePicker';

export default function DateInputField({ date }: { date: Date }) {
  return (
    <DatePicker
      id="session-date"
      mode="single"
      label="모임 날짜"
      placeholder="모임 날짜를 선택해주세요"
      value={date}
      onChange={() => 0}
    />
  );
}
