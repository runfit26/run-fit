import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from '@/components/ui/DatePicker';
import TimePicker from '@/components/ui/TimePicker';
import { cn } from '@/lib/utils';
import { SessionCreateFormValues } from '../_others/schema';

interface DateInputFieldProps {
  className?: string;
}

function parseIsoToDateAndMinutes(iso: string) {
  const d = new Date(iso);
  const minutes = d.getHours() * 60 + d.getMinutes();
  // date만 쓰기 위해 시간 00:00으로 정규화
  const dateOnly = new Date(d);
  dateOnly.setHours(0, 0, 0, 0);
  return { dateOnly, minutes };
}

function combineDateAndMinutesToLocalIso(dateOnly: Date, minutes: number) {
  const y = dateOnly.getFullYear();
  const m = String(dateOnly.getMonth() + 1).padStart(2, '0');
  const d = String(dateOnly.getDate()).padStart(2, '0');

  const h = String(Math.floor(minutes / 60)).padStart(2, '0');
  const min = String(minutes % 60).padStart(2, '0');

  // 🔥 로컬 시간 그대로
  return `${y}-${m}-${d}T${h}:${min}:00`;
}

export default function SessionAtInputField({
  className,
}: DateInputFieldProps) {
  const { control } = useFormContext<SessionCreateFormValues>();

  return (
    <Controller
      name="sessionAt"
      control={control}
      render={({ field, fieldState }) => {
        const { dateOnly, minutes } = parseIsoToDateAndMinutes(field.value);

        return (
          <div
            className={cn('tablet:gap-3 flex items-center gap-5', className)}
          >
            <DatePicker
              id="session-date"
              mode="single"
              label="모임 날짜"
              placeholder="모임 날짜를 선택해주세요"
              value={dateOnly}
              onChange={(nextDate) => {
                if (!nextDate) return;
                field.onChange(
                  combineDateAndMinutesToLocalIso(nextDate, minutes)
                );
              }}
              className="flex-1"
            />

            <div>
              <label className="text-caption-semibold tablet:text-body3-semibold text-gray-50">
                모임 시간
              </label>
              <TimePicker
                value={minutes}
                onChange={(nextMinutes) => {
                  field.onChange(
                    combineDateAndMinutesToLocalIso(dateOnly, nextMinutes)
                  );
                }}
                className="tablet:w-[240px] laptop:w-[120px] w-[110px]"
              />
              {fieldState.error?.message && (
                <p className="mt-2 text-sm text-red-400">
                  {fieldState.error.message}
                </p>
              )}
            </div>
          </div>
        );
      }}
    />
  );
}
