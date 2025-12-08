'use client';

import { Label } from '@radix-ui/react-label';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import * as React from 'react';
import { cn } from '@/lib/utils';

type ProgressBarProps = React.ComponentProps<typeof ProgressPrimitive.Root>;

export default function ProgressBar({
  className,
  value,
  max,
  ...props
}: ProgressBarProps) {
  const safeMax = typeof max === 'number' && max > 0 ? max : 1;

  const rawValue = typeof value === 'number' ? value : 0;
  const clampedValue = Math.min(Math.max(rawValue, 0), safeMax);

  const progressRatio = clampedValue / safeMax;
  const translateX = 100 - progressRatio * 100;

  return (
    <div className="flex h-[38px] flex-col">
      <div className="flex justify-between">
        <Label className="text-sm">{clampedValue}명</Label>
        <div className="flex items-center gap-0.5">
          <span>/</span>
          <Label className="text-sm">{safeMax}명 모집</Label>
        </div>
      </div>
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          'relative h-2.5 w-[319px] overflow-hidden rounded-md bg-gray-500',
          className
        )}
        value={clampedValue}
        max={safeMax}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="from-brand-200 via-brand-400 to-brand-500 h-full w-full flex-1 rounded-md bg-linear-to-r transition-all"
          style={{
            transform: `translateX(-${translateX}%)`,
          }}
        />
      </ProgressPrimitive.Root>
    </div>
  );
}
