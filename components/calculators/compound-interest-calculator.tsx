'use client';

import React, { useState } from 'react';
import {
  calculateCompoundInterest,
  formatCurrency,
  formatCompactCurrency,
  CompoundingInterval,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type CompoundInterestCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: SessionKey | undefined) => void;
};

export function CompoundInterestCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: CompoundInterestCalculatorProps) {
  const [principal, setPrincipal] = useState(100000);
  const [interestRate, setInterestRate] = useState(10);
  const [period, setPeriod] = useState(5);
  const [interval, setInterval] = useState<CompoundingInterval>('Annually');

  const result = calculateCompoundInterest(principal, interestRate, period, interval);

  const handleConsultOrEmail = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'compound-interest-form',
        JSON.stringify({
          name: 'Investor',
          principalAmount: String(principal),
          interestRate: interestRate,
          investmentPeriod: period,
          interval: interval,
          maturityAmount: result.maturityAmount,
          totalInterest: result.totalInterest,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('compound-interest-form' as any);
    if (onOpenEmail) onOpenEmail(true);
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full pr-1'>
      {/* Left Input Section */}
      <div className='flex-1 space-y-5 bg-card/60 p-5 rounded-2xl border border-border/50'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-foreground'>Compound Interest</h3>
          <p className='text-xs text-muted-foreground'>
            Visualize the exponential power of compounding interest over time.
          </p>
        </div>

        <div className='space-y-4'>
          <CalculatorInputSlider
            label='Principal Amount'
            value={principal}
            min={5000}
            max={10000000}
            step={5000}
            prefix='₹'
            onChange={setPrincipal}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Annual Interest Rate'
            value={interestRate}
            min={1}
            max={30}
            step={0.5}
            suffix='%'
            onChange={setInterestRate}
          />

          <CalculatorInputSlider
            label='Time Period'
            value={period}
            min={1}
            max={35}
            step={1}
            suffix='years'
            onChange={setPeriod}
          />

          <div className='space-y-2'>
            <Label className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
              Compounding Frequency
            </Label>
            <Select
              value={interval}
              onValueChange={(v) => setInterval(v as CompoundingInterval)}
            >
              <SelectTrigger className='w-full bg-accent/30'>
                <SelectValue placeholder='Select frequency' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='Annually'>Compounded Annually (1x/yr)</SelectItem>
                <SelectItem value='Half-Yearly'>Compounded Semi-Annually (2x/yr)</SelectItem>
                <SelectItem value='Quarterly'>Compounded Quarterly (4x/yr)</SelectItem>
                <SelectItem value='Monthly'>Compounded Monthly (12x/yr)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='pt-2'>
          <Button
            onClick={handleConsultOrEmail}
            className='w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl h-11 font-semibold shadow-md'
          >
            <MailIcon className='w-4 h-4' />
            Email Detailed Compounding Growth Plan
          </Button>
        </div>
      </div>

      {/* Right Output & Chart Section */}
      <div className='flex-1 flex flex-col justify-between space-y-5 bg-accent/20 p-5 rounded-2xl border border-border/50'>
        {/* KPI Metrics */}
        <div className='grid grid-cols-3 gap-3 text-center'>
          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Principal
            </span>
            <span className='text-sm sm:text-base font-bold text-blue-600 dark:text-blue-400'>
              {formatCompactCurrency(result.principalAmount)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.principalAmount)}
            </span>
          </div>

          <div className='bg-background/80 p-3 rounded-xl border border-border/40 shadow-xs'>
            <span className='text-[11px] font-medium text-muted-foreground block mb-1'>
              Compound Interest
            </span>
            <span className='text-sm sm:text-base font-bold text-emerald-600 dark:text-emerald-400'>
              {formatCompactCurrency(result.totalInterest)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.totalInterest)}
            </span>
          </div>

          <div className='bg-primary/10 p-3 rounded-xl border border-primary/20 shadow-xs'>
            <span className='text-[11px] font-medium text-primary block mb-1'>
              Total Maturity
            </span>
            <span className='text-sm sm:text-base font-extrabold text-foreground'>
              {formatCompactCurrency(result.maturityAmount)}
            </span>
            <span className='text-[10px] text-muted-foreground block truncate'>
              {formatCurrency(result.maturityAmount)}
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
                  name === 'invested' ? 'Principal' : 'Compound Interest',
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
                formatter={(val) => (val === 'invested' ? 'Principal' : 'Interest')}
              />
              <Bar
                dataKey='invested'
                stackId='a'
                fill='#3b82f6'
                radius={[0, 0, 4, 4]}
              />
              <Bar
                dataKey='interest'
                stackId='a'
                fill='#10b981'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className='text-center'>
          <p className='text-[11px] text-muted-foreground italic'>
            ₹{principal.toLocaleString('en-IN')} compounded {interval.toLowerCase()} at {interestRate}% yields{' '}
            <strong className='text-foreground'>{formatCurrency(result.maturityAmount)}</strong> after {period} years.
          </p>
        </div>
      </div>
    </div>
  );
}
