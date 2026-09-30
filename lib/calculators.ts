/**
 * Financial Calculation Engine for Wealth Management Calculators
 * Matches exact logic and compounding methods from AssetPlus.
 */

// Helper: Inflated amount / compound growth = P * (1 + r/100)^t
export function compoundAnnual(principal: number, ratePercent: number, years: number): number {
  if (principal <= 0 || years <= 0) return 0;
  return principal * Math.pow(1 + ratePercent / 100, years);
}

// Helper: Monthly SIP required to accumulate target corpus after n years at r% annual returns
// Formula: target / sum_{l=1}^{n*12} (1 + r/1200)^(n*12 - l + 1)
export function calculateRequiredSip(targetAmount: number, annualReturnRate: number, years: number): number {
  if (targetAmount <= 0 || years <= 0) return 0;
  const totalMonths = years * 12;
  const monthlyRate = 1 + annualReturnRate / 1200;
  let factorSum = 0;
  for (let l = 1; l <= totalMonths; l++) {
    factorSum += Math.pow(monthlyRate, totalMonths - l + 1);
  }
  if (factorSum === 0) return 0;
  return Math.ceil(targetAmount / factorSum);
}

// Helper: SIP future value with optional annual step-up
export function calculateSipFutureValue(
  monthlyAmount: number,
  annualStepUp: number,
  annualReturnRate: number,
  years: number,
): number {
  if (monthlyAmount <= 0 || years <= 0) return 0;
  const totalMonths = years * 12;
  const monthlyFactor = 1 + annualReturnRate / 1200;
  let totalFutureValue = 0;

  for (let l = 1; l <= totalMonths; l++) {
    const yearIndex = Math.floor((l - 1) / 12);
    const installment = monthlyAmount + yearIndex * annualStepUp;
    totalFutureValue += installment * Math.pow(monthlyFactor, totalMonths - l + 1);
  }
  return totalFutureValue;
}

// Helper: Total invested in SIP with optional annual step-up
export function calculateSipTotalInvested(
  monthlyAmount: number,
  annualStepUp: number,
  years: number,
): number {
  if (monthlyAmount <= 0 || years <= 0) return 0;
  const totalMonths = years * 12;
  let total = 0;
  for (let l = 1; l <= totalMonths; l++) {
    const yearIndex = Math.floor((l - 1) / 12);
    total += monthlyAmount + yearIndex * annualStepUp;
  }
  return total;
}

// -------------------------------------------------------------
// 1. LUMPSUM CALCULATOR
// -------------------------------------------------------------
export type LumpsumResult = {
  totalInvested: number;
  maturityValue: number;
  totalGains: number;
  yearlyData: {
    year: number;
    label: string;
    invested: number;
    gains: number;
    total: number;
  }[];
};

export function calculateLumpsum(
  investedAmount: number,
  investmentPeriod: number,
  expectedReturns: number,
): LumpsumResult {
  const years = Math.max(1, Math.min(50, Math.round(investmentPeriod)));
  const principal = Math.max(0, investedAmount);
  const rate = Math.max(0, expectedReturns);

  const yearlyData = [];
  for (let t = 1; t <= years; t++) {
    const maturity = compoundAnnual(principal, rate, t);
    const gains = maturity - principal;
    yearlyData.push({
      year: t,
      label: `Year ${t}`,
      invested: Math.round(principal),
      gains: Math.round(gains),
      total: Math.round(maturity),
    });
  }

  const finalMaturity = yearlyData[yearlyData.length - 1]?.total || principal;
  const totalGains = Math.max(0, finalMaturity - principal);

  return {
    totalInvested: Math.round(principal),
    maturityValue: Math.round(finalMaturity),
    totalGains: Math.round(totalGains),
    yearlyData,
  };
}

// -------------------------------------------------------------
// 2. SIP RETURNS CALCULATOR (with optional Annual Step-Up)
// -------------------------------------------------------------
export type SipResult = {
  totalInvested: number;
  maturityValue: number;
  totalGains: number;
  yearlyData: {
    year: number;
    label: string;
    invested: number;
    gains: number;
    total: number;
  }[];
};

export function calculateSipReturns(
  monthlyInvestment: number,
  investmentPeriod: number,
  expectedReturns: number,
  annualIncrement: number = 0,
): SipResult {
  const years = Math.max(1, Math.min(50, Math.round(investmentPeriod)));
  const monthly = Math.max(0, monthlyInvestment);
  const rate = Math.max(0, expectedReturns);
  const stepUp = Math.max(0, annualIncrement);

  const yearlyData = [];
  for (let t = 1; t <= years; t++) {
    const invested = calculateSipTotalInvested(monthly, stepUp, t);
    const maturity = calculateSipFutureValue(monthly, stepUp, rate, t);
    const gains = Math.max(0, maturity - invested);
    yearlyData.push({
      year: t,
      label: `Year ${t}`,
      invested: Math.round(invested),
      gains: Math.round(gains),
      total: Math.round(maturity),
    });
  }

  const last = yearlyData[yearlyData.length - 1];
  return {
    totalInvested: last?.invested || 0,
    maturityValue: last?.total || 0,
    totalGains: last?.gains || 0,
    yearlyData,
  };
}

// -------------------------------------------------------------
// 3. GOAL SETTING CALCULATOR (Lumpsum or SIP mode)
// -------------------------------------------------------------
export type GoalSettingResult = {
  mode: 'sip' | 'lumpsum';
  requiredAmount: number;
  inflatedGoal: number;
  lumpsumRequired?: number;
  monthlySipRequired?: number;
  totalInvested: number;
  totalGains: number;
  yearlyData: {
    year: number;
    label: string;
    invested: number;
    gains: number;
    total: number;
  }[];
};

export function calculateGoalSetting(
  requiredAmount: number,
  investmentPeriod: number,
  expectedReturns: number,
  inflationRate: number,
  mode: 'sip' | 'lumpsum' = 'sip',
): GoalSettingResult {
  const years = Math.max(1, Math.min(50, Math.round(investmentPeriod)));
  const goal = Math.max(0, requiredAmount);
  const r = Math.max(0, expectedReturns);
  const inf = Math.max(0, inflationRate);

  const inflatedGoal = Math.round(compoundAnnual(goal, inf, years));

  if (mode === 'lumpsum') {
    const lumpsumRequired = Math.round(inflatedGoal / Math.pow(1 + r / 100, years));
    const totalGains = Math.max(0, inflatedGoal - lumpsumRequired);

    const yearlyData = [];
    for (let t = 1; t <= years; t++) {
      const currentVal = compoundAnnual(lumpsumRequired, r, t);
      yearlyData.push({
        year: t,
        label: `Year ${t}`,
        invested: Math.round(lumpsumRequired),
        gains: Math.round(currentVal - lumpsumRequired),
        total: Math.round(currentVal),
      });
    }

    return {
      mode: 'lumpsum',
      requiredAmount: goal,
      inflatedGoal,
      lumpsumRequired,
      totalInvested: lumpsumRequired,
      totalGains,
      yearlyData,
    };
  } else {
    const monthlySip = calculateRequiredSip(inflatedGoal, r, years);
    const sipRes = calculateSipReturns(monthlySip, years, r, 0);

    return {
      mode: 'sip',
      requiredAmount: goal,
      inflatedGoal,
      monthlySipRequired: monthlySip,
      totalInvested: sipRes.totalInvested,
      totalGains: Math.max(0, sipRes.maturityValue - sipRes.totalInvested),
      yearlyData: sipRes.yearlyData,
    };
  }
}

// -------------------------------------------------------------
// 4. RETIREMENT FUND CALCULATOR
// -------------------------------------------------------------
export type RetirementResult = {
  yearsToRetire: number;
  yearsInRetirement: number;
  monthlyExpenseToday: number;
  monthlyExpenseAtRetirement: number;
  totalCorpusRequired: number;
  futureValueOfCurrentSavings: number;
  additionalCorpusRequired: number;
  monthlySipRequired: number;
  yearlyData: {
    year: number;
    label: string;
    invested: number;
    gains: number;
    total: number;
  }[];
};

export function calculateRetirementFund(
  currentAge: number,
  targetAge: number,
  lifeExpectancy: number,
  monthlyExpense: number,
  currentSavings: number,
  inflationRate: number,
  expectedReturns: number,
): RetirementResult {
  const curAge = Math.max(18, Math.min(60, currentAge));
  const retAge = Math.max(40, Math.min(80, Math.max(curAge + 1, targetAge)));
  const expAge = Math.max(80, Math.min(120, Math.max(retAge + 1, lifeExpectancy)));

  const yearsToRetire = retAge - curAge;
  const yearsInRetirement = expAge - retAge;
  const expense = Math.max(0, monthlyExpense);
  const savings = Math.max(0, currentSavings);
  const inf = Math.max(0, inflationRate);
  const r = Math.max(0, expectedReturns);

  // Monthly expense adjusted for inflation at the time of retirement
  const monthlyExpenseAtRetirement = expense * Math.pow(1 + inf / 100, yearsToRetire);
  // Total corpus = monthly expense at retirement * 12 * post-retirement years
  const totalCorpusRequired = Math.round(monthlyExpenseAtRetirement * 12 * yearsInRetirement);

  // Future value of existing savings compounded till retirement
  const futureValueOfCurrentSavings = Math.round(compoundAnnual(savings, r, yearsToRetire));
  // Additional corpus needed
  const additionalCorpusRequired = Math.max(0, totalCorpusRequired - futureValueOfCurrentSavings);

  // Monthly SIP needed during accumulation phase
  const monthlySipRequired = calculateRequiredSip(additionalCorpusRequired, r, yearsToRetire);

  // Growth trajectory during accumulation
  const sipRes = calculateSipReturns(monthlySipRequired, yearsToRetire, r, 0);
  const yearlyData = sipRes.yearlyData.map((d, i) => {
    const curSavingsCompounded = compoundAnnual(savings, r, i + 1);
    return {
      year: d.year,
      label: `Age ${curAge + d.year}`,
      invested: Math.round(d.invested + savings),
      gains: Math.round(d.gains + (curSavingsCompounded - savings)),
      total: Math.round(d.total + curSavingsCompounded),
    };
  });

  return {
    yearsToRetire,
    yearsInRetirement,
    monthlyExpenseToday: expense,
    monthlyExpenseAtRetirement: Math.round(monthlyExpenseAtRetirement),
    totalCorpusRequired,
    futureValueOfCurrentSavings,
    additionalCorpusRequired,
    monthlySipRequired,
    yearlyData,
  };
}

// -------------------------------------------------------------
// 5. EDUCATION CALCULATOR
// -------------------------------------------------------------
export type EducationResult = {
  yearsToCollege: number;
  courseCostToday: number;
  inflatedCourseCost: number;
  futureValueOfCurrentSavings: number;
  additionalSavingsRequired: number;
  monthlySipRequired: number;
  yearlyData: {
    year: number;
    label: string;
    invested: number;
    gains: number;
    total: number;
  }[];
};

export function calculateEducation(
  childCurrentAge: number,
  collegeAge: number,
  courseCostToday: number,
  currentSavings: number,
  inflationRate: number,
  expectedReturns: number,
): EducationResult {
  const curAge = Math.max(0, Math.min(25, childCurrentAge));
  const targetAge = Math.max(curAge + 1, Math.min(30, collegeAge));
  const yearsToCollege = targetAge - curAge;

  const cost = Math.max(0, courseCostToday);
  const savings = Math.max(0, currentSavings);
  const inf = Math.max(0, inflationRate);
  const r = Math.max(0, expectedReturns);

  const inflatedCourseCost = Math.round(compoundAnnual(cost, inf, yearsToCollege));
  const futureValueOfCurrentSavings = Math.round(compoundAnnual(savings, r, yearsToCollege));
  const additionalSavingsRequired = Math.max(0, inflatedCourseCost - futureValueOfCurrentSavings);
  const monthlySipRequired = calculateRequiredSip(additionalSavingsRequired, r, yearsToCollege);

  const sipRes = calculateSipReturns(monthlySipRequired, yearsToCollege, r, 0);
  const yearlyData = sipRes.yearlyData.map((d, i) => {
    const curSavingsCompounded = compoundAnnual(savings, r, i + 1);
    return {
      year: d.year,
      label: `Age ${curAge + d.year}`,
      invested: Math.round(d.invested + savings),
      gains: Math.round(d.gains + (curSavingsCompounded - savings)),
      total: Math.round(d.total + curSavingsCompounded),
    };
  });

  return {
    yearsToCollege,
    courseCostToday: cost,
    inflatedCourseCost,
    futureValueOfCurrentSavings,
    additionalSavingsRequired,
    monthlySipRequired,
    yearlyData,
  };
}

// -------------------------------------------------------------
// 6. SWP CALCULATOR
// -------------------------------------------------------------
export type SwpResult = {
  totalInvested: number;
  totalWithdrawal: number;
  finalPortfolioBalance: number;
  isDepleted: boolean;
  yearlyData: {
    year: number;
    label: string;
    portfolioBalance: number;
  }[];
};

export function calculateSWP(
  totalInvestment: number,
  withdrawalPerMonth: number,
  expectedReturns: number,
  withdrawalPeriod: number,
  waitingPeriodBeforeWithdrawal: number,
  withdrawalIncreaseRate: number,
): SwpResult {
  let corpus = totalInvestment;
  for (let y = 1; y <= waitingPeriodBeforeWithdrawal; y++) {
    corpus = corpus * (1 + expectedReturns / 100);
  }
  
  const initialCorpusAfterWaiting = corpus;
  const yearlyData = [];
  if (waitingPeriodBeforeWithdrawal > 0) {
    yearlyData.push({
      year: 0,
      label: 'Year 0',
      portfolioBalance: Math.round(initialCorpusAfterWaiting)
    });
  }

  const rMonthly = expectedReturns / 1200;
  let currentWithdrawal = withdrawalPerMonth;
  let totalWithdrawal = 0;
  let u = 0;
  let isDepleted = false;

  for (let m = 1; m <= withdrawalPeriod * 12; m++) {
    const corpusMinusWithdrawal = corpus - currentWithdrawal;
    const corpusWithReturn = (m === 1 ? corpusMinusWithdrawal : u) * (1 + rMonthly);
    
    totalWithdrawal += currentWithdrawal;
    
    if (m % 12 === 0 && withdrawalIncreaseRate > 0) {
      currentWithdrawal += currentWithdrawal * (withdrawalIncreaseRate / 100);
    }
    
    u = corpusWithReturn - currentWithdrawal;
    
    if (corpusWithReturn < 0 && !isDepleted) {
      isDepleted = true;
    }

    if (m % 12 === 0 || m === withdrawalPeriod * 12) {
      yearlyData.push({
        year: m / 12,
        label: `Year ${m / 12}`,
        portfolioBalance: Math.max(0, Math.round(corpusWithReturn))
      });
    }
  }

  let finalPortfolioBalance = yearlyData.length > 0 ? yearlyData[yearlyData.length - 1].portfolioBalance : 0;
  if (isDepleted) {
    finalPortfolioBalance = 0;
  }

  return {
    totalInvested: totalInvestment,
    totalWithdrawal: Math.round(totalWithdrawal),
    finalPortfolioBalance,
    isDepleted,
    yearlyData
  };
}

// -------------------------------------------------------------
// 7. REGULAR INCOME CALCULATOR
// -------------------------------------------------------------
export type RegularIncomeResult = {
  portfolioValueAtEnd: number;
  portfolioBeforeWithdrawal: number;
  monthlyWithdrawal: number;
  durationText: string;
};

export function calculateRegularIncome(
  sipAmount: number,
  lumpsumAmount: number,
  investmentPeriod: number,
  expectedReturnRate: number,
  waitingPeriodBeforeWithdrawal: number,
  expectedReturnInWithdrawalPeriod: number,
  mode: 'NO_OF_YEARS' | 'MONTHLY_SWP',
  withdrawalYears: number = 20,
  monthlyWithdrawalRequirement: number = 25000
): RegularIncomeResult {
  const rInvestMonthly = expectedReturnRate / 1200;
  const nInvestMonths = investmentPeriod * 12;

  let sipFV = 0;
  if (rInvestMonthly > 0) {
    sipFV = sipAmount * ((Math.pow(1 + rInvestMonthly, nInvestMonths) - 1) / rInvestMonthly) * (1 + rInvestMonthly);
  } else {
    sipFV = sipAmount * nInvestMonths;
  }

  const lumpsumFV = lumpsumAmount * Math.pow(1 + expectedReturnRate / 100, investmentPeriod);
  
  const portfolioValueAtEnd = sipFV + lumpsumFV;
  const portfolioBeforeWithdrawal = portfolioValueAtEnd * Math.pow(1 + expectedReturnRate / 100, waitingPeriodBeforeWithdrawal);

  let monthlyWithdrawal = 0;
  let durationText = '';
  
  if (mode === 'NO_OF_YEARS') {
    const rWithdrawMonthly = expectedReturnInWithdrawalPeriod / 1200;
    if (rWithdrawMonthly > 0) {
      const temp = Math.pow(1 + rWithdrawMonthly, withdrawalYears * 12);
      monthlyWithdrawal = (portfolioBeforeWithdrawal * temp * rWithdrawMonthly) / (temp - 1);
    } else {
      monthlyWithdrawal = portfolioBeforeWithdrawal / (withdrawalYears * 12);
    }
  } else {
    let corpus = portfolioBeforeWithdrawal;
    let months = 0;
    const maxMonths = 1200;
    while (corpus > 0 && months < maxMonths) {
      let nextCorpus = (corpus - monthlyWithdrawalRequirement) * (1 + expectedReturnInWithdrawalPeriod / 1200);
      if (nextCorpus >= corpus) {
        durationText = 'For Life';
        break;
      }
      corpus = nextCorpus;
      months++;
    }
    if (!durationText) {
      const y = Math.floor(months / 12);
      const m = months % 12;
      durationText = `${y} Years ${m} Months`;
    }
  }

  return {
    portfolioValueAtEnd: Math.round(portfolioValueAtEnd),
    portfolioBeforeWithdrawal: Math.round(portfolioBeforeWithdrawal),
    monthlyWithdrawal: Math.round(monthlyWithdrawal),
    durationText
  };
}


// -------------------------------------------------------------
// 7. COMPOUND INTEREST CALCULATOR
// -------------------------------------------------------------
export type CompoundingInterval = 'Annually' | 'Half-Yearly' | 'Quarterly' | 'Monthly';

export type CompoundInterestResult = {
  principalAmount: number;
  maturityAmount: number;
  totalInterest: number;
  yearlyData: {
    year: number;
    label: string;
    invested: number;
    interest: number;
    total: number;
  }[];
};

export function calculateCompoundInterest(
  principalAmount: number,
  annualInterestRate: number,
  investmentPeriod: number,
  interval: CompoundingInterval = 'Annually',
): CompoundInterestResult {
  const principal = Math.max(0, principalAmount);
  const rate = Math.max(0, annualInterestRate);
  const years = Math.max(1, Math.min(50, investmentPeriod));

  const n =
    interval === 'Monthly'
      ? 12
      : interval === 'Quarterly'
      ? 4
      : interval === 'Half-Yearly'
      ? 2
      : 1;

  const periodicRate = rate / 100 / n;

  const yearlyData = [];
  for (let t = 1; t <= years; t++) {
    const totalPeriods = n * t;
    const maturity = principal * Math.pow(1 + periodicRate, totalPeriods);
    const interest = maturity - principal;
    yearlyData.push({
      year: t,
      label: `Year ${t}`,
      invested: Math.round(principal),
      interest: Math.round(interest),
      total: Math.round(maturity),
    });
  }

  const finalMaturity = yearlyData[yearlyData.length - 1]?.total || principal;
  const totalInterest = Math.max(0, finalMaturity - principal);

  return {
    principalAmount: principal,
    maturityAmount: finalMaturity,
    totalInterest,
    yearlyData,
  };
}

// -------------------------------------------------------------
// 8. INFLATION CALCULATOR
// -------------------------------------------------------------
export type InflationResult = {
  currentAmount: number;
  futureCost: number;
  costIncrease: number;
  purchasingPowerLossPercent: number;
  yearlyData: {
    year: number;
    label: string;
    currentCost: number;
    inflatedCost: number;
    purchasingPower: number;
  }[];
};

export function calculateInflation(
  currentAmount: number,
  investmentPeriod: number,
  inflationRate: number,
): InflationResult {
  const cost = Math.max(0, currentAmount);
  const years = Math.max(1, Math.min(50, investmentPeriod));
  const rate = Math.max(0, inflationRate);

  const yearlyData = [];
  for (let t = 1; t <= years; t++) {
    const inflatedCost = compoundAnnual(cost, rate, t);
    const purchasingPower = cost / Math.pow(1 + rate / 100, t);
    yearlyData.push({
      year: t,
      label: `Year ${t}`,
      currentCost: Math.round(cost),
      inflatedCost: Math.round(inflatedCost),
      purchasingPower: Math.round(purchasingPower),
    });
  }

  const futureCost = yearlyData[yearlyData.length - 1]?.inflatedCost || cost;
  const costIncrease = Math.max(0, futureCost - cost);
  const finalPurchasingPower = yearlyData[yearlyData.length - 1]?.purchasingPower || cost;
  const purchasingPowerLossPercent =
    cost > 0 ? Math.round(((cost - finalPurchasingPower) / cost) * 100) : 0;

  return {
    currentAmount: cost,
    futureCost,
    costIncrease,
    purchasingPowerLossPercent,
    yearlyData,
  };
}

// -------------------------------------------------------------
// Formatting utilities (Indian Rupee Lakhs / Crores / Standard)
// -------------------------------------------------------------
export function formatCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCompactCurrency(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2).replace(/\.00$/, '')} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1).replace(/\.0$/, '')}k`;
  }
  return `₹${Math.round(amount)}`;
}
