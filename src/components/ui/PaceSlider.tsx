'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';
import { formatSecondsToPace } from '@/lib/pace';
import { cn } from '@/lib/utils';

export default function PaceSlider({
  className,
  defaultValue = [420],
  value,
  min = 240,
  max = 600,
  step = 10,
  onValueChange,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const currentValue = Array.isArray(value)
    ? value[0]
    : Array.isArray(defaultValue)
      ? defaultValue[0]
      : min;
  return (
    <div className="w-full">
      <div className="pt-3 pb-3.5 text-center text-[16px]/[24px] font-semibold text-white">
        {formatSecondsToPace(currentValue)}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="shrink-0 text-[14px]/[20px] text-[#5D616F]">4분</div>
        <SliderPrimitive.Root
          data-slot="slider"
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          onValueChange={onValueChange}
          className={cn(
            'relative flex w-full touch-none items-center select-none data-disabled:opacity-50',
            className
          )}
          step={step}
          {...props}
        >
          <SliderPrimitive.Track
            data-slot="slider-track"
            className={cn(
              'relative grow overflow-hidden rounded-full bg-[#181820] data-[orientation=horizontal]:h-2 data-[orientation=horizontal]:w-full'
            )}
          >
            {Array.from({ length: 9 }, (_, index) => {
              return (
                <div
                  key={index}
                  className="absolute top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[#2B2D3A]"
                  style={{
                    // Left = (index+1)*10% + (0.6*index - 5.4)px
                    left: `calc(${index + 1}*10% + ${0.6 * index}px - 5.4px)`,
                  }}
                />
              );
            })}
          </SliderPrimitive.Track>
          <SliderPrimitive.Thumb
            data-slot="slider-thumb"
            className="block size-6 shrink-0 rounded-full border-2 border-[#6C6BE2] bg-white shadow-sm ring-[#6C6BE2]/50 transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          />
        </SliderPrimitive.Root>
        <div className="shrink-0 text-[14px]/[20px] text-[#5D616F]">10분</div>
      </div>
    </div>
  );
}
