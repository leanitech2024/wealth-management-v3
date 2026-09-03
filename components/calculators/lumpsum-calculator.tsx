'use client';

import React, { useState } from 'react';
import {
  calculateLumpsum,
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
import { SparklesIcon, MailIcon } from 'lucide-react';

type LumpsumCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: SessionKey | undefined) => void;
};

export function LumpsumCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: LumpsumCalculatorProps) {
  const [investedAmount, setInvestedAmount] = useState(500000);
  const [investmentPeriod, setInvestmentPeriod] = useState(5);
  const [expectedReturns, setExpectedReturns] = useState(12);

  const result = calculateLumpsum(investedAmount, investmentPeriod, expectedReturns);

  const handleConsultOrEmail = () => {
    // Save state to sessionStorage for the email dialog
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'lumpsum-form',
        JSON.stringify({
          name: 'Investor',
          investmentAmount: String(investedAmount),
          noOfYears: investmentPeriod,
          expectedReturn: expectedReturns,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('lumpsum-form');
    if (onOpenEmail) onOpenEmail(true);
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full pr-1'>
      {/* Left Input Section */}
      <div className='flex-1 space-y-6 bg-card/60 p-5 rounded-2xl border border-border/50'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-foreground'>Lumpsum Investment</h3>
          <p className='text-xs text-muted-foreground'>
            Calculate returns on your one-time mutual fund / wealth investment.
          </p>
        </div>

        <div className='space-y-5'>
          <CalculatorInputSlider
            label='Total Investment'
            value={investedAmount}
            min={1000}
            max={10000000}
            step={5000}
            prefix='₹'
            onChange={setInvestedAmount}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Duration'
            value={investmentPeriod}
            min={1}
            max={40}
            step={1}
            suffix='years'
            onChange={setInvestmentPeriod}
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
            Email Detailed Calculation Report
          </Button>
        </div>
      </div>

      {/* Right Output & Chart Section */}
      <div className='flex-1 flex flex-col justify-between space-y-5 bg-accent/20 p-5 rounded-2xl border border-border/50'>
        {/* KPI Metrics */}
        <div className='grid grid-cols-3 gap-3 text-center'>
          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Total Invested
            </span>
            <span className='text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400'>
              {formatCompactCurrency(result.totalInvested)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.totalInvested)}
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

          <div className='bg-primary/10 p-3 rounded-xl border border-primary/20 shadow-xs'>
            <span className='text-[11px] font-medium text-primary block mb-1'>
              Maturity Value
            </span>
            <span className='text-sm sm:text-base font-extrabold text-foreground'>
              {formatCompactCurrency(result.maturityValue)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.maturityValue)}
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
                  name === 'invested' ? 'Total Invested' : 'Est. Gains',
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
                formatter={(val) => (val === 'invested' ? 'Invested' : 'Gains')}
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
            Invested ₹{investedAmount.toLocaleString('en-IN')} grows to{' '}
            <strong className='text-foreground'>{formatCurrency(result.maturityValue)}</strong> in {investmentPeriod} years at {expectedReturns}% p.a.
          </p>
        </div>
      </div>
    </div>
  );
}
