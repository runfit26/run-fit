'use client';

import Calendar from '@/components/ui/Calendar';

export interface DatePickerProps {
  value?: Date;
  onChange: (next?: Date) => void;
  label?: string;
  inline?: boolean;
  captionLayout?: 'dropdown' | 'label';
  placeholder?: string;
  disabled?: boolean;
}

export default function DatePicker({
  value,
  onChange,
  captionLayout = 'label',
  disabled = false,
}: DatePickerProps) {
  const handleSelect = (next?: Date) => {
    if (disabled) return;
    onChange?.(next);
  };

  return (
    <Calendar
      mode="single"
      selected={value}
      captionLayout={captionLayout}
      onSelect={handleSelect}
      disabled={disabled}
    />
  );
}
