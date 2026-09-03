'use client';

import React, { useState } from 'react';
import {
  calculateInflation,
  formatCurrency,
  formatCompactCurrency,
} from '@/lib/calculators';
import { CalculatorInputSlider } from './calculator-input-slider';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';

type InflationCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: SessionKey | undefined) => void;
};

export function InflationCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: InflationCalculatorProps) {
  const [currentAmount, setCurrentAmount] = useState(100000);
  const [period, setPeriod] = useState(10);
  const [inflationRate, setInflationRate] = useState(6);

  const result = calculateInflation(currentAmount, period, inflationRate);

  const handleConsultOrEmail = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'inflation-form',
        JSON.stringify({
          name: 'Investor',
          currentAmount: String(currentAmount),
          investmentPeriod: period,
          yearsFromNow: period,
          inflationRate: inflationRate,
          futureCost: result.futureCost,
          costIncrease: result.costIncrease,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('inflation-form');
    if (onOpenEmail) onOpenEmail(true);
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full pr-1'>
      {/* Left Input Section */}
      <div className='flex-1 space-y-5 bg-card/60 p-5 rounded-2xl border border-border/50'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-foreground'>Inflation Calculator</h3>
          <p className='text-xs text-muted-foreground'>
            See how inflation erodes purchasing power and increases the future cost of living.
          </p>
        </div>

        <div className='space-y-4'>
          <CalculatorInputSlider
            label='Current Cost / Expense'
            value={currentAmount}
            min={5000}
            max={10000000}
            step={5000}
            prefix='₹'
            onChange={setCurrentAmount}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Time Horizon'
            value={period}
            min={1}
            max={40}
            step={1}
            suffix='years'
            onChange={setPeriod}
          />

          <CalculatorInputSlider
            label='Expected Annual Inflation'
            value={inflationRate}
            min={1}
            max={20}
            step={0.5}
            suffix='%'
            onChange={setInflationRate}
          />
        </div>

        <div className='pt-2'>
          <Button
            onClick={handleConsultOrEmail}
            className='w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl h-11 font-semibold shadow-md'
          >
            <MailIcon className='w-4 h-4' />
            Email Inflation Impact & Protection Plan
          </Button>
        </div>
      </div>

      {/* Right Output & Chart Section */}
      <div className='flex-1 flex flex-col justify-between space-y-5 bg-accent/20 p-5 rounded-2xl border border-border/50'>
        {/* KPI Metrics */}
        <div className='grid grid-cols-3 gap-3 text-center'>
          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Current Cost
            </span>
            <span className='text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400'>
              {formatCompactCurrency(result.currentAmount)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.currentAmount)}
            </span>
          </div>

          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Cost Increase
            </span>
            <span className='text-sm sm:text-base font-bold text-rose-600 dark:text-rose-400'>
              +{formatCompactCurrency(result.costIncrease)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              +{formatCurrency(result.costIncrease)}
            </span>
          </div>

          <div className='bg-primary/10 p-3 rounded-xl border border-primary/20 shadow-xs'>
            <span className='text-[11px] font-medium text-primary block mb-1'>
              Future Cost
            </span>
            <span className='text-sm sm:text-base font-extrabold text-foreground'>
              {formatCompactCurrency(result.futureCost)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.futureCost)}
            </span>
          </div>
        </div>

        {/* Growth Bar Chart */}
        <div className='h-[240px] w-full pt-2'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={result.yearlyData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <XAxis
                dataKey='label'
                stroke='#888888'
                fontSize={11}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='#888888'
                fontSize={11}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCompactCurrency(value)}
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  formatCurrency(Number(value)),
                  name === 'currentCost' ? 'Initial Cost' : 'Inflated Cost',
                ]}
                contentStyle={{
                  backgroundColor: 'rgba(20, 20, 25, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              />
              <Legend
                verticalAlign='top'
                height={30}
                formatter={(val) => (val === 'currentCost' ? 'Initial Cost' : 'Future Cost')}
              />
              <Bar
                dataKey='currentCost'
                fill='#3b82f6'
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey='inflatedCost'
                fill='#f43f5e'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='text-center'>
          <p className='text-[11px] text-muted-foreground italic'>
            What costs {formatCurrency(currentAmount)} today will cost{' '}
            <strong className='text-foreground'>{formatCurrency(result.futureCost)}</strong> in {period} years at {inflationRate}% annual inflation.
          </p>
        </div>
      </div>
    </div>
  );
}
