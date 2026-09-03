'use client';

import React, { useState } from 'react';
import {
  calculateEmi,
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

type EmiCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: SessionKey | undefined) => void;
};

export function EmiCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: EmiCalculatorProps) {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(20);

  const result = calculateEmi(loanAmount, interestRate, tenureYears);

  const handleConsultOrEmail = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'emi-form',
        JSON.stringify({
          name: 'Investor',
          loanAmount: String(loanAmount),
          interestRate: interestRate,
          tenureYears: tenureYears,
          monthlyEmi: result.monthlyEmi,
          totalInterest: result.totalInterest,
          totalPayable: result.totalPayable,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('emi-form');
    if (onOpenEmail) onOpenEmail(true);
  };

  const pieData = [
    { name: 'Principal Loan Amount', value: result.loanAmount, color: '#3b82f6' },
    { name: 'Total Interest Payable', value: result.totalInterest, color: '#f97316' },
  ];

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full pr-1'>
      {/* Left Input Section */}
      <div className='flex-1 space-y-5 bg-card/60 p-5 rounded-2xl border border-border/50'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-foreground'>Loan EMI Calculator</h3>
          <p className='text-xs text-muted-foreground'>
            Calculate monthly EMI, interest burden, and total payment for home or personal loans.
          </p>
        </div>

        <div className='space-y-4'>
          <CalculatorInputSlider
            label='Loan Amount'
            value={loanAmount}
            min={50000}
            max={50000000}
            step={50000}
            prefix='₹'
            onChange={setLoanAmount}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Interest Rate (p.a.)'
            value={interestRate}
            min={1}
            max={25}
            step={0.1}
            suffix='%'
            onChange={setInterestRate}
          />

          <CalculatorInputSlider
            label='Loan Tenure'
            value={tenureYears}
            min={1}
            max={35}
            step={1}
            suffix='years'
            onChange={setTenureYears}
          />
        </div>

        <div className='pt-2'>
          <Button
            onClick={handleConsultOrEmail}
            className='w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl h-11 font-semibold shadow-md'
          >
            <MailIcon className='w-4 h-4' />
            Email Detailed Loan Schedule
          </Button>
        </div>
      </div>

      {/* Right Output & Chart Section */}
      <div className='flex-1 flex flex-col justify-between space-y-5 bg-accent/20 p-5 rounded-2xl border border-border/50'>
        {/* KPI Metrics */}
        <div className='grid grid-cols-3 gap-3 text-center'>
          <div className='bg-primary/10 p-3 rounded-xl border border-primary/20 shadow-xs'>
            <span className='text-[11px] font-medium text-primary block mb-1'>
              Monthly EMI
            </span>
            <span className='text-sm sm:text-base font-extrabold text-foreground'>
              {formatCurrency(result.monthlyEmi)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              Per Month
            </span>
          </div>

          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Total Interest
            </span>
            <span className='text-sm sm:text-base font-bold text-amber-600 dark:text-amber-400'>
              {formatCompactCurrency(result.totalInterest)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.totalInterest)}
            </span>
          </div>

          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Total Amount
            </span>
            <span className='text-sm sm:text-base font-bold text-foreground'>
              {formatCompactCurrency(result.totalPayable)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.totalPayable)}
            </span>
          </div>
        </div>

        {/* Amortization Chart */}
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
                  name === 'principalRepaid' ? 'Principal Repaid' : 'Interest Paid',
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
                formatter={(val) => (val === 'principalRepaid' ? 'Principal' : 'Interest')}
              />
              <Bar
                dataKey='principalRepaid'
                stackId='a'
                fill='#3b82f6'
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey='interestPaid'
                stackId='a'
                fill='#f97316'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='text-center'>
          <p className='text-[11px] text-muted-foreground italic'>
            Loan of {formatCurrency(loanAmount)} over {tenureYears} yrs requires an EMI of{' '}
            <strong className='text-foreground'>{formatCurrency(result.monthlyEmi)}/mo</strong>. Total interest: {formatCurrency(result.totalInterest)}.
          </p>
        </div>
      </div>
    </div>
  );
}
