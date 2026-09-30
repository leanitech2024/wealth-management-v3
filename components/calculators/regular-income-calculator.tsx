'use client';

import React, { useState } from 'react';
import {
  calculateRegularIncome,
  formatCurrency,
  formatCompactCurrency,
} from '@/lib/calculators';
import { CalculatorInputSlider } from './calculator-input-slider';
import { Button } from '@/components/ui/button';
import { MailIcon } from 'lucide-react';


type RegularIncomeCalculatorProps = {
  onOpenEmail?: (open: boolean) => void;
  onUpdateSessionKey?: (key: SessionKey | undefined) => void;
};

export function RegularIncomeCalculator({
  onOpenEmail,
  onUpdateSessionKey,
}: RegularIncomeCalculatorProps) {
  const [mode, setMode] = useState<'NO_OF_YEARS' | 'MONTHLY_SWP'>('NO_OF_YEARS');
  const [sipAmount, setSipAmount] = useState(10000);
  const [lumpsumAmount, setLumpsumAmount] = useState(2500000);
  const [investmentPeriod, setInvestmentPeriod] = useState(20);
  const [expectedReturnRate, setExpectedReturnRate] = useState(12);
  const [waitingPeriod, setWaitingPeriod] = useState(10);
  const [expectedReturnInWithdrawal, setExpectedReturnInWithdrawal] = useState(5);
  const [withdrawalYears, setWithdrawalYears] = useState(20);
  const [monthlyWithdrawalRequirement, setMonthlyWithdrawalRequirement] = useState(25000);

  const result = calculateRegularIncome(
    sipAmount,
    lumpsumAmount,
    investmentPeriod,
    expectedReturnRate,
    waitingPeriod,
    expectedReturnInWithdrawal,
    mode,
    withdrawalYears,
    monthlyWithdrawalRequirement
  );

  const handleConsultOrEmail = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(
        'regular-income-form',
        JSON.stringify({
          name: 'Investor',
          sipAmount: String(sipAmount),
          lumpsumAmount: String(lumpsumAmount),
          investmentPeriod,
          expectedReturnRate,
          waitingPeriod,
          expectedReturnInWithdrawal,
          withdrawalYears,
          monthlyWithdrawalRequirement: String(monthlyWithdrawalRequirement),
          mode,
        })
      );
    }
    if (onUpdateSessionKey) onUpdateSessionKey('regular-income-form');
    if (onOpenEmail) onOpenEmail(true);
  };

  return (
    <div className='flex flex-col lg:flex-row gap-6 w-full pr-1'>
      <div className='flex-1 space-y-6 bg-card/60 p-5 rounded-2xl border border-border/50'>
        <div className='space-y-1'>
          <h3 className='text-lg font-bold text-foreground'>Regular Income Calculator</h3>
          <p className='text-xs text-muted-foreground'>
            Determine how much monthly income you can generate.
          </p>
        </div>

        <div className="flex gap-2 p-1 bg-muted/50 rounded-lg">
          <button
            className={`flex-1 text-xs font-semibold py-2 rounded-md transition-colors ${
              mode === 'NO_OF_YEARS' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setMode('NO_OF_YEARS')}
          >
            NO. OF YEARS
          </button>
          <button
            className={`flex-1 text-xs font-semibold py-2 rounded-md transition-colors ${
              mode === 'MONTHLY_SWP' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => setMode('MONTHLY_SWP')}
          >
            MONTHLY SWP
          </button>
        </div>

        <div className='space-y-5 h-[400px] overflow-y-auto pr-2 custom-scrollbar'>
          <CalculatorInputSlider
            label='SIP'
            value={sipAmount}
            min={10000}
            max={200000}
            step={1000}
            prefix='₹'
            onChange={setSipAmount}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Lumpsum'
            value={lumpsumAmount}
            min={10000}
            max={20000000}
            step={10000}
            prefix='₹'
            onChange={setLumpsumAmount}
            formatter={(v) => formatCompactCurrency(v)}
          />

          <CalculatorInputSlider
            label='Investment Period'
            value={investmentPeriod}
            min={1}
            max={30}
            step={1}
            suffix='years'
            onChange={setInvestmentPeriod}
          />

          <CalculatorInputSlider
            label='Expected Returns'
            value={expectedReturnRate}
            min={1}
            max={30}
            step={1}
            suffix='%'
            onChange={setExpectedReturnRate}
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

          {mode === 'NO_OF_YEARS' ? (
            <CalculatorInputSlider
              label='How Long You Want To Withdraw'
              value={withdrawalYears}
              min={1}
              max={30}
              step={1}
              suffix='years'
              onChange={setWithdrawalYears}
            />
          ) : (
            <CalculatorInputSlider
              label='Monthly Withdrawal'
              value={monthlyWithdrawalRequirement}
              min={1000}
              max={1000000}
              step={1000}
              prefix='₹'
              onChange={setMonthlyWithdrawalRequirement}
              formatter={(v) => formatCompactCurrency(v)}
            />
          )}

          <CalculatorInputSlider
            label='Exp Returns In Withdrawal Period'
            value={expectedReturnInWithdrawal}
            min={1}
            max={30}
            step={1}
            suffix='%'
            onChange={setExpectedReturnInWithdrawal}
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
        <div className='grid grid-cols-1 gap-4'>
          <div className='bg-primary/5 p-4 rounded-2xl border border-primary/10'>
            <p className='text-xs text-muted-foreground mb-1'>Portfolio Value at the end of {investmentPeriod}th Year</p>
            <p className='text-xl sm:text-2xl font-bold text-foreground'>
              {formatCurrency(result.portfolioValueAtEnd)}
            </p>
          </div>
          <div className='bg-emerald-500/5 p-4 rounded-2xl border border-emerald-500/10'>
            <p className='text-xs text-muted-foreground mb-1'>Portfolio Value before withdrawal Begins</p>
            <p className='text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400'>
              {formatCurrency(result.portfolioBeforeWithdrawal)}
            </p>
          </div>
          <div className='bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10'>
            <p className='text-xs text-muted-foreground mb-1'>
              {mode === 'NO_OF_YEARS' ? `Monthly Withdrawal for ${withdrawalYears} Years` : 'How long you can keep withdrawing'}
            </p>
            <p className='text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400'>
              {mode === 'NO_OF_YEARS' ? formatCurrency(result.monthlyWithdrawal) : result.durationText}
            </p>
          </div>
        </div>
        
        <div className='flex-1 bg-card/60 p-5 rounded-2xl border border-border/50 min-h-[250px] flex items-center justify-center text-center'>
          <p className="text-muted-foreground text-sm">
            By investing a SIP of {formatCurrency(sipAmount)} every month and a lumpsum of {formatCurrency(lumpsumAmount)} for {investmentPeriod} years, your corpus will grow.
            {mode === 'NO_OF_YEARS' 
              ? ` You can then withdraw ${formatCurrency(result.monthlyWithdrawal)} every month for ${withdrawalYears} years.`
              : ` You can then withdraw ${formatCurrency(monthlyWithdrawalRequirement)} every month ${result.durationText === 'For Life' ? 'for life' : 'for ' + result.durationText}.`}
          </p>
        </div>
      </div>
    </div>
  );
}
