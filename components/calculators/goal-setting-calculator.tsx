'use client';

import React, { useState } from 'react';
import {
  calculateGoalSetting,
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
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';

type GoalSettingCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: SessionKey | undefined) => void;
};

export function GoalSettingCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: GoalSettingCalculatorProps) {
  const [targetGoal, setTargetGoal] = useState(1000000);
  const [years, setYears] = useState(5);
  const [expectedReturns, setExpectedReturns] = useState(12);
  const [inflationRate, setInflationRate] = useState(6);

  const result = calculateGoalSetting(
    targetGoal,
    years,
    expectedReturns,
    inflationRate,
    'lumpsum'
  );

  const handleConsultOrEmail = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'goal-planner-form',
        JSON.stringify({
          name: 'Investor',
          targetAmount: String(targetGoal),
          timePeriod: years,
          noOfYears: years,
          expectedReturn: expectedReturns,
          inflationRate: inflationRate,
          mode: 'lumpsum',
          lumpsum: result.lumpsumRequired,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('goal-planner-form');
    if (onOpenEmail) onOpenEmail(true);
  };

  const donutData = [
    { name: 'Lumpsum Required', value: result.totalInvested, color: '#3b82f6' },
    { name: 'Estimated Gains', value: result.totalGains, color: '#10b981' },
  ];

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full pr-1'>
      {/* Left Input Section */}
      <div className='flex-1 space-y-5 bg-card/60 p-5 rounded-2xl border border-border/50'>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-lg font-bold text-foreground'>Goal Setting</h3>
            <p className='text-xs text-muted-foreground'>
              Plan for milestones with inflation adjustment.
            </p>
          </div>
        </div>

        <div className='space-y-4'>
          <CalculatorInputSlider
            label="Goal Value in Today's Terms"
            value={targetGoal}
            min={50000}
            max={50000000}
            step={50000}
            prefix='₹'
            onChange={setTargetGoal}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Target Time Horizon'
            value={years}
            min={1}
            max={35}
            step={1}
            suffix='years'
            onChange={setYears}
          />

          <CalculatorInputSlider
            label='Expected Return Rate'
            value={expectedReturns}
            min={1}
            max={30}
            step={0.5}
            suffix='%'
            onChange={setExpectedReturns}
          />

          <CalculatorInputSlider
            label='Expected Inflation Rate'
            value={inflationRate}
            min={0}
            max={15}
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
            Email Detailed Goal Plan
          </Button>
        </div>
      </div>

      {/* Right Output & Chart Section */}
      <div className='flex-1 flex flex-col justify-between space-y-5 bg-accent/20 p-5 rounded-2xl border border-border/50'>
        {/* KPI Metrics */}
        <div className='grid grid-cols-3 gap-3 text-center'>
          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Inflated Target Goal
            </span>
            <span className='text-sm sm:text-base font-bold text-foreground'>
              {formatCompactCurrency(result.inflatedGoal)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.inflatedGoal)}
            </span>
          </div>

          <div className='bg-primary/10 p-3 rounded-xl border border-primary/20 shadow-xs'>
            <span className='text-[11px] font-medium text-primary block mb-1'>
              Lumpsum Needed
            </span>
            <span className='text-sm sm:text-base font-extrabold text-blue-600 dark:text-blue-400'>
              {formatCompactCurrency(result.lumpsumRequired || 0)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.lumpsumRequired || 0)}
            </span>
          </div>

          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Est. Gains
            </span>
            <span className='text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400'>
              {formatCompactCurrency(result.totalGains)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.totalGains)}
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
                  name === 'invested' ? 'Total Investment' : 'Est. Gains',
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
                formatter={(val) => (val === 'invested' ? 'Investment' : 'Gains')}
              />
              <Bar
                dataKey='invested'
                stackId='a'
                fill='#3b82f6'
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey='gains'
                stackId='a'
                fill='#10b981'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='text-center'>
          <p className='text-[11px] text-muted-foreground italic'>
            To reach ₹{targetGoal.toLocaleString('en-IN')} (worth {formatCompactCurrency(result.inflatedGoal)} with {inflationRate}% inflation) in {years} years, start{' '}
            <strong className='text-foreground'>
              Lumpsum of {formatCurrency(result.lumpsumRequired || 0)}
            </strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
