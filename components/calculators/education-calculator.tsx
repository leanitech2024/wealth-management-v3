'use client';

import React, { useState } from 'react';
import {
  calculateEducation,
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

type EducationCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: SessionKey | undefined) => void;
};

export function EducationCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: EducationCalculatorProps) {
  const [currentAge, setCurrentAge] = useState(5);
  const [targetAge, setTargetAge] = useState(18);
  const [courseCost, setCourseCost] = useState(2000000);
  const [currentSavings, setCurrentSavings] = useState(300000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturns, setExpectedReturns] = useState(12);

  const result = calculateEducation(
    currentAge,
    targetAge,
    courseCost,
    currentSavings,
    inflationRate,
    expectedReturns
  );

  const handleConsultOrEmail = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'education-form',
        JSON.stringify({
          name: 'Investor',
          childName: 'Child',
          childAge: currentAge,
          childCurrentAge: currentAge,
          collegeAge: targetAge,
          higherEducationAge: targetAge,
          courseCost: String(courseCost),
          currentCost: String(courseCost),
          currentSavings: String(currentSavings),
          currentInvestment: String(currentSavings),
          inflationRate: inflationRate,
          expectedReturn: expectedReturns,
          existingInvestmentRate: expectedReturns,
          newInvestmentRate: expectedReturns,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('education-form');
    if (onOpenEmail) onOpenEmail(true);
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full pr-1'>
      {/* Left Input Section */}
      <div className='flex-1 space-y-4 bg-card/60 p-5 rounded-2xl border border-border/50'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-foreground'>Child Higher Education</h3>
          <p className='text-xs text-muted-foreground'>
            Ensure your child’s educational dreams are fully funded against rising college inflation.
          </p>
        </div>

        <div className='grid grid-cols-2 gap-3'>
          <CalculatorInputSlider
            label="Child's Age"
            value={currentAge}
            min={0}
            max={17}
            step={1}
            suffix='yrs'
            onChange={setCurrentAge}
          />
          <CalculatorInputSlider
            label='College Age'
            value={targetAge}
            min={Math.max(currentAge + 1, 16)}
            max={25}
            step={1}
            suffix='yrs'
            onChange={setTargetAge}
          />
        </div>

        <CalculatorInputSlider
          label='Estimated Course Cost in Today’s Value'
          value={courseCost}
          min={100000}
          max={20000000}
          step={50000}
          prefix='₹'
          onChange={setCourseCost}
          formatter={(v) => formatCompactCurrency(v)}
        />

        <CalculatorInputSlider
          label='Current Savings Allocated'
          value={currentSavings}
          min={0}
          max={10000000}
          step={50000}
          prefix='₹'
          onChange={setCurrentSavings}
          formatter={(v) => formatCompactCurrency(v)}
        />

        <div className='grid grid-cols-2 gap-3'>
          <CalculatorInputSlider
            label='Education Inflation'
            value={inflationRate}
            min={1}
            max={20}
            step={0.5}
            suffix='%'
            onChange={setInflationRate}
          />
          <CalculatorInputSlider
            label='Return Rate'
            value={expectedReturns}
            min={1}
            max={25}
            step={0.5}
            suffix='%'
            onChange={setExpectedReturns}
          />
        </div>

        <div className='pt-2'>
          <Button
            onClick={handleConsultOrEmail}
            className='w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl h-11 font-semibold shadow-md'
          >
            <MailIcon className='w-4 h-4' />
            Email Detailed Education Plan
          </Button>
        </div>
      </div>

      {/* Right Output & Chart Section */}
      <div className='flex-1 flex flex-col justify-between space-y-4 bg-accent/20 p-5 rounded-2xl border border-border/50'>
        {/* KPI Metrics */}
        <div className='grid grid-cols-3 gap-2 text-center'>
          <div className='bg-background/80 p-2.5 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[10px] font-medium text-muted-foreground block mb-0.5'>
              Future College Cost
            </span>
            <span className='text-xs sm:text-sm font-bold text-foreground'>
              {formatCompactCurrency(result.inflatedCourseCost)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.inflatedCourseCost)}
            </span>
          </div>

          <div className='bg-background/80 p-2.5 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[10px] font-medium text-muted-foreground block mb-0.5'>
              Savings Growth
            </span>
            <span className='text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400'>
              {formatCompactCurrency(result.futureValueOfCurrentSavings)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.futureValueOfCurrentSavings)}
            </span>
          </div>

          <div className='bg-primary/10 p-2.5 rounded-xl border border-primary/20 shadow-xs'>
            <span className='text-[10px] font-medium text-primary block mb-0.5'>
              Monthly SIP Needed
            </span>
            <span className='text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400'>
              {formatCurrency(result.monthlySipRequired)}/mo
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              for {result.yearsToCollege} yrs
            </span>
          </div>
        </div>

        {/* Growth Bar Chart */}
        <div className='h-[230px] w-full pt-1'>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={result.yearlyData}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
            >
              <XAxis
                dataKey='label'
                stroke='#888888'
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke='#888888'
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => formatCompactCurrency(value)}
              />
              <Tooltip
                formatter={(value: any, name: any) => [
                  formatCurrency(Number(value)),
                  name === 'invested' ? 'Total Saved' : 'Est. Growth',
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
                height={25}
                formatter={(val) => (val === 'invested' ? 'Saved' : 'Growth')}
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
            To fund ₹{courseCost.toLocaleString('en-IN')} course (costing {formatCompactCurrency(result.inflatedCourseCost)} in {result.yearsToCollege} yrs), start{' '}
            <strong className='text-foreground'>{formatCurrency(result.monthlySipRequired)}/month</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
