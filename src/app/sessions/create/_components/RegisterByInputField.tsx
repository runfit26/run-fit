import DatePicker from '@/components/ui/DatePicker';

export default function RegisterByInputField({ date }: { date: Date }) {
  return (
    <DatePicker
      id="session-date"
      mode="single"
      label="마감날짜"
      placeholder="마감 날짜를 선택해주세요"
      value={date}
      onChange={() => 0}
    />
  );
}
