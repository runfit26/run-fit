import { useState } from 'react';
import DatePicker from '@/components/ui/DatePicker';
import TimePicker from '@/components/ui/TimePicker';
import { cn } from '@/lib/utils';

interface DateInputFieldProps {
  className?: string;
}

export default function DateInputField({ className }: DateInputFieldProps) {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState<number>(0);
  return (
    <div className={cn('tablet:gap-3 flex items-center gap-5', className)}>
      <DatePicker
        id="session-date"
        mode="single"
        label="모임 날짜"
        placeholder="모임 날짜를 선택해주세요"
        value={date}
        onChange={() => 0}
      />
      <div>
        <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
          모임 시간
        </label>
        <TimePicker
          value={time}
          onChange={setTime}
          className="tablet:w-60 laptop:w-[120px] w-[110px]"
        />
      </div>
    </div>
  );
}
