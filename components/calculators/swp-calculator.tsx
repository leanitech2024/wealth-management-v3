'use client';

import React, { useState } from 'react';
import {
  calculateSWP,
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


type SwpCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: SessionKey | undefined) => void;
};

export function SwpCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: SwpCalculatorProps) {
  const [totalInvestment, setTotalInvestment] = useState(5000000);
  const [withdrawalPerMonth, setWithdrawalPerMonth] = useState(25000);
  const [expectedReturns, setExpectedReturns] = useState(12);
  const [withdrawalPeriod, setWithdrawalPeriod] = useState(10);
  const [waitingPeriod, setWaitingPeriod] = useState(1);
  const [increaseRate, setIncreaseRate] = useState(5);

  const result = calculateSWP(
    totalInvestment,
    withdrawalPerMonth,
    expectedReturns,
    withdrawalPeriod,
    waitingPeriod,
    increaseRate
  );

  const handleConsultOrEmail = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'swp-form',
        JSON.stringify({
          name: 'Investor',
          totalInvestment: String(totalInvestment),
          withdrawalPerMonth: String(withdrawalPerMonth),
          expectedReturns,
          withdrawalPeriod,
          waitingPeriod,
          increaseRate,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('swp-form');
    if (onOpenEmail) onOpenEmail(true);
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full pr-1'>
      <div className='flex-1 space-y-6 bg-card/60 p-5 rounded-2xl border border-border/50'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-foreground'>SWP Calculator</h3>
          <p className='text-xs text-muted-foreground'>
            Plan your systematic withdrawals and ensure your money lasts.
          </p>
        </div>

        <div className='space-y-5 h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
          <CalculatorInputSlider
            label='Total Investment'
            value={totalInvestment}
            min={10000}
            max={200000000}
            step={10000}
            prefix='₹'
            onChange={setTotalInvestment}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Withdrawal Per Month'
            value={withdrawalPerMonth}
            min={1000}
            max={1000000}
            step={1000}
            prefix='₹'
            onChange={setWithdrawalPerMonth}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Expected Rate of Returns'
            value={expectedReturns}
            min={1}
            max={30}
            step={1}
            suffix='%'
            onChange={setExpectedReturns}
          />

          <CalculatorInputSlider
            label='How Long You Want To Withdraw'
            value={withdrawalPeriod}
            min={1}
            max={50}
            step={1}
            suffix='years'
            onChange={setWithdrawalPeriod}
          />

          <CalculatorInputSlider
            label='Waiting Period Before Withdrawal'
            value={waitingPeriod}
            min={0}
            max={30}
            step={1}
            suffix='years'
            onChange={setWaitingPeriod}
          />

          <CalculatorInputSlider
            label='Increase Rate of Withdrawal Amount'
            value={increaseRate}
            min={0}
            max={30}
            step={1}
            suffix='%'
            onChange={setIncreaseRate}
          />
        </div>

        <div className='pt-2'>
          <Button
            onClick={handleConsultOrEmail}
            variant='outline'
            className='w-full rounded-full border-primary/20 hover:bg-primary/5 text-primary'
          >
            <MailIcon className='w-4 h-4 mr-2' />
            Email me the detailed report
          </Button>
        </div>
      </div>

      <div className='flex-1 flex flex-col gap-6'>
        <div className='grid grid-cols-2 gap-4'>
          <div className='bg-primary/5 p-4 rounded-2xl border border-primary/10'>
            <p className='text-xs text-muted-foreground mb-1'>Total Invested</p>
            <p className='text-xl sm:text-2xl font-bold text-foreground'>
              {formatCurrency(result.totalInvested)}
            </p>
          </div>
          <div className='bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10'>
            <p className='text-xs text-muted-foreground mb-1'>Total Withdrawal</p>
            <p className='text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
              {result.isDepleted ? '~ ' : ''}{formatCurrency(result.totalWithdrawal)}
            </p>
          </div>
          <div className='col-span-2 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10'>
            <p className='text-xs text-muted-foreground mb-1'>Final Portfolio Balance</p>
            <p className='text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400'>
              {formatCurrency(result.finalPortfolioBalance)}
            </p>
            {result.isDepleted && (
              <p className='text-xs text-destructive mt-1'>
                Corpus depleted before the end of the withdrawal period!
              </p>
            )}
          </div>
        </div>

        <div className='flex-1 bg-card/60 p-5 rounded-2xl border border-border/50 min-h-[250px]'>
          <h4 className='text-sm font-semibold mb-4 text-center'>
            Portfolio Balance (Yearly)
          </h4>
          <ResponsiveContainer width='100%' height='100%'>
            <BarChart
              data={result.yearlyData}
              margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
            >
              <XAxis
                dataKey='label'
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(value) => formatCompactCurrency(value)}
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                width={50}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), 'Portfolio Balance']}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
              />
              <Bar
                dataKey='portfolioBalance'
                fill='hsl(var(--primary))'
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
