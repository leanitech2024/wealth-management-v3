'use client';

import React, { useState } from 'react';
import {
  calculateRetirementFund,
  formatCurrency,
  formatCompactCurrency,
} from '@/lib/calculators';
import { CalculatorInputSlider } from './calculator-input-slider';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import { Button } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';

type RetirementFundCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: any) => void;
};

export function RetirementFundCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: RetirementFundCalculatorProps) {
  const [currentAge, setCurrentAge] = useState(25);
  const [targetAge, setTargetAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(100);
  const [monthlyExpense, setMonthlyExpense] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(500000);
  const [inflationRate, setInflationRate] = useState(6);
  const [expectedReturns, setExpectedReturns] = useState(12);

  const result = calculateRetirementFund(
    currentAge,
    targetAge,
    lifeExpectancy,
    monthlyExpense,
    currentSavings,
    inflationRate,
    expectedReturns
  );

  const handleConsultOrEmail = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'retirement-form',
        JSON.stringify({
          name: 'Investor',
          currentAge: currentAge,
          targetAge: targetAge,
          retirementAge: targetAge,
          lifeExpectancy: lifeExpectancy,
          monthlyExpense: String(monthlyExpense),
          currentMonthlyExpenses: String(monthlyExpense),
          currentSavings: String(currentSavings),
          existingInvestment: String(currentSavings),
          inflationRate: inflationRate,
          postRetirementInflationRate: inflationRate,
          expectedReturn: expectedReturns,
          returnOnExistingInvestment: expectedReturns,
          returnOnNewInvestment: expectedReturns,
          postRetirementRiskFreeRate: 7,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('retirement-form');
    if (onOpenEmail) onOpenEmail(true);
  };

  const donutData = [
    { name: 'Current Savings Value on Retirement', value: result.futureValueOfCurrentSavings, color: '#3b82f6' },
    { name: 'Additional Saving Required', value: result.additionalCorpusRequired, color: '#10b981' },
  ];

  return (
    <div className='flex flex-col lg:flex-row gap-8 w-full pr-2 pb-2'>
      {/* Left Input Section */}
      <div className='flex-1 space-y-6 bg-card/60 p-6 rounded-2xl border border-border/50'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-foreground'>Retirement Fund Planner</h3>
          <p className='text-xs text-muted-foreground'>
            Plan for financial freedom and a secure retirement.
          </p>
        </div>

        <CalculatorInputSlider
          label='Current Monthly Expenses'
          value={monthlyExpense}
          min={100}
          max={10000000}
          step={5000}
          prefix='₹'
          onChange={setMonthlyExpense}
          formatter={(v) => formatCompactCurrency(v)}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
          <CalculatorInputSlider
            label='Current Age'
            value={currentAge}
            min={18}
            max={60}
            step={1}
            suffix='yrs'
            onChange={setCurrentAge}
          />
          <CalculatorInputSlider
            label='Retirement Age'
            value={targetAge}
            min={40}
            max={80}
            step={1}
            suffix='yrs'
            onChange={setTargetAge}
          />
          <CalculatorInputSlider
            label='Life Expectancy'
            value={lifeExpectancy}
            min={80}
            max={120}
            step={1}
            suffix='yrs'
            onChange={setLifeExpectancy}
          />
        </div>

        <CalculatorInputSlider
          label='Current Savings'
          value={currentSavings}
          min={0}
          max={10000000000}
          step={50000}
          prefix='₹'
          onChange={setCurrentSavings}
          formatter={(v) => formatCompactCurrency(v)}
        />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
          <CalculatorInputSlider
            label='Inflation Rate'
            value={inflationRate}
            min={0}
            max={20}
            step={0.5}
            suffix='%'
            onChange={setInflationRate}
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
        </div>

        <div className='pt-2'>
          <Button
            onClick={handleConsultOrEmail}
            className='w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl h-11 font-semibold shadow-md'
          >
            <MailIcon className='w-4 h-4' />
            Email Detailed Retirement Plan
          </Button>
        </div>
      </div>

      {/* Right Output & Chart Section */}
      <div className='flex-1 flex flex-col justify-between space-y-6 bg-accent/20 p-6 rounded-2xl border border-border/50'>
        {/* KPI Metrics */}
        <div className='grid grid-cols-1 gap-4'>
          <div className='bg-background/80 p-3.5 rounded-xl border border-border/40 shadow-xs flex flex-col gap-1 text-center'>
            <span className='text-xs font-medium text-muted-foreground'>
              Retirement amount required as per current expenses
            </span>
            <span className='text-lg sm:text-xl font-bold text-foreground'>
              {formatCompactCurrency(result.totalCorpusRequired)}
            </span>
          </div>

          <div className='bg-background/80 p-3.5 rounded-xl border border-border/40 shadow-xs flex flex-col gap-1 text-center'>
            <span className='text-xs font-medium text-muted-foreground'>
              Additional Saving Required
            </span>
            <span className='text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400'>
              {formatCompactCurrency(result.additionalCorpusRequired)}
            </span>
          </div>

          <div className='bg-primary/10 p-3.5 rounded-xl border border-primary/20 shadow-xs flex flex-col gap-1 text-center'>
            <span className='text-xs font-medium text-primary'>
              Achievable by a monthly SIP of
            </span>
            <span className='text-lg sm:text-xl font-extrabold text-emerald-600 dark:text-emerald-400'>
              {formatCurrency(result.monthlySipRequired)}
            </span>
          </div>
        </div>

        {/* Donut Chart */}
        <div className='min-h-[280px] flex-1 w-full pt-2 pb-2'>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={donutData}
                cx='50%'
                cy='50%'
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey='value'
                stroke="none"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => formatCurrency(Number(value))}
                contentStyle={{
                  backgroundColor: 'rgba(20, 20, 25, 0.95)',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontSize: '12px',
                }}
              />
              <Legend verticalAlign='bottom' height={70} iconType="circle" wrapperStyle={{ paddingTop: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className='text-center'>
          <p className='text-[11px] text-muted-foreground italic'>
            To retire comfortably with {formatCompactCurrency(result.totalCorpusRequired)} corpus, start saving{' '}
            <strong className='text-foreground'>{formatCurrency(result.monthlySipRequired)}/month</strong>.
          </p>
        </div>
      </div>
    </div>
  );
}
