'use client';

import React from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type CalculatorInputSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  prefix?: string;
  suffix?: string;
  onChange: (val: number) => void;
  className?: string;
  formatter?: (val: number) => string;
};

export function CalculatorInputSlider({
  label,
  value,
  min,
  max,
  step = 1,
  prefix,
  suffix,
  onChange,
  className,
  formatter,
}: CalculatorInputSliderProps) {
  const [inputValue, setInputValue] = React.useState(String(value));

  React.useEffect(() => {
    setInputValue(String(value));
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9.]/g, '');
    setInputValue(raw);
    const num = parseFloat(raw);
    if (!isNaN(num)) {
      onChange(Math.min(max, Math.max(min, num)));
    }
  };

  const handleBlur = () => {
    const num = parseFloat(inputValue);
    if (isNaN(num) || num < min) {
      setInputValue(String(min));
      onChange(min);
    } else if (num > max) {
      setInputValue(String(max));
      onChange(max);
    } else {
      setInputValue(String(num));
      onChange(num);
    }
  };

  return (
    <div className={cn('space-y-3', className)}>
      <div className='flex flex-col gap-2'>
        <Label className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
          {label}
        </Label>
        <div className='relative flex items-center w-full'>
          {prefix && (
            <span className='absolute left-3 text-xs font-semibold text-muted-foreground select-none pointer-events-none'>
              {prefix}
            </span>
          )}
          <Input
            type='text'
            inputMode='numeric'
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={cn(
              'h-9 text-right font-semibold text-sm bg-accent/30 border-muted focus-visible:ring-1',
              prefix ? 'pl-7' : 'pl-3',
              suffix ? 'pr-12' : 'pr-3'
            )}
          />
          {suffix && (
            <span className='absolute right-3 text-xs text-muted-foreground select-none pointer-events-none'>
              {suffix}
            </span>
          )}
        </div>
      </div>

      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(vals) => {
          if (vals[0] !== undefined) {
            onChange(vals[0]);
          }
        }}
        className='py-1 cursor-pointer'
      />

      <div className='flex items-center justify-between text-[11px] text-muted-foreground/70 font-mono'>
        <span>
          {formatter ? formatter(min) : `${prefix || ''}${min.toLocaleString('en-IN')}${suffix ? ` ${suffix}` : ''}`}
        </span>
        <span>
          {formatter ? formatter(max) : `${prefix || ''}${max.toLocaleString('en-IN')}${suffix ? ` ${suffix}` : ''}`}
        </span>
      </div>
    </div>
  );
}
