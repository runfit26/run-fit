'use client';

import * as Popover from '@radix-ui/react-popover';
import { parseDate } from 'chrono-node';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import Calendar from '../ui/Calendar';
import Input from '../ui/Input';
import Label from '../ui/Label';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('ko-KR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function DatePicker({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);

  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor="date">{label}</Label>
      <Input
        id="date"
        value={value}
        placeholder={placeholder}
        onChange={(e) => {
          setValue(e.target.value);
          const date = parseDate(e.target.value);
          if (date) {
            setDate(date);
            setMonth(date);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
        RightElement={
          <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
              <button className="flex size-5 items-center justify-center">
                <CalendarIcon />
              </button>
            </Popover.Trigger>
            <Popover.Content>
              <Calendar
                mode="single"
                selected={date}
                month={month}
                onMonthChange={setMonth}
                onSelect={(date) => {
                  setDate(date);
                  setValue(formatDate(date));
                  setOpen(false);
                }}
              />
            </Popover.Content>
          </Popover.Root>
        }
      />
    </div>
  );
}
