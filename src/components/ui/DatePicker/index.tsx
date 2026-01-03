'use client';

import Calendar from '@components/ui/Calendar';
import Input from '@components/ui/Input';
import Label from '@components/ui/Label';
import * as Popover from '@radix-ui/react-popover';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { DateRange } from 'react-day-picker';
import { cn } from '@/lib/utils';

function formatSingle(date?: Date) {
  if (!date) return '';
  return date.toLocaleDateString('ko-KR');
}

function formatRange(range?: DateRange) {
  if (!range?.from) return '';
  if (!range.to) return formatSingle(range.from);
  return `${formatSingle(range.from)} ~ ${formatSingle(range.to)}`;
}
interface DatePickerSingleProps {
  mode: 'single';
  label: string;
  placeholder: string;
  id?: string;
  value?: Date;
  onChange: (value: Date) => void;
  className?: string;
  errorMessage?: string;
}

interface DatePickerRangeProps {
  mode: 'range';
  label: string;
  placeholder: string;
  id?: string;
  value?: DateRange;
  onChange: (value: DateRange) => void;
  className?: string;
  errorMessage?: string;
}

export type DatePickerProps = DatePickerSingleProps | DatePickerRangeProps;

export default function DatePicker({
  mode,
  label,
  placeholder,
  id,
  value,
  onChange,
  className,
  errorMessage,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const autoId = React.useId();
  const inputId = id ?? autoId;

  const displayValue =
    mode === 'single' ? formatSingle(value) : formatRange(value);

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <Label htmlFor={inputId}>{label}</Label>

      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild>
          <div>
            <Input
              RightElement={
                <button
                  className="flex size-5 items-center justify-center"
                  type="button"
                >
                  <CalendarIcon />
                </button>
              }
              errorMessage={errorMessage}
              id={inputId}
              placeholder={placeholder}
              readOnly
              value={displayValue}
            />
          </div>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content className="z-50">
            <div className="flex flex-col items-center justify-center gap-6 overflow-hidden rounded-xl border border-gray-600 bg-gray-700 pt-5 pb-6">
              {mode === 'single' ? (
                <Calendar.Single
                  selected={value}
                  onSelect={(nextDate) => {
                    if (!nextDate) return;
                    onChange(nextDate);
                    setOpen(false);
                  }}
                />
              ) : (
                <Calendar.Range
                  selected={value}
                  onSelect={(nextRange) => {
                    if (!nextRange) return;
                    onChange(nextRange);
                    if (nextRange.from && nextRange.to) {
                      setOpen(false);
                    }
                  }}
                />
              )}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
