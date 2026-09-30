# Ascent Wealth – All Calculators: Logic & Calculations

This document explains how each of the 8 calculators works — what information you enter, what happens behind the scenes, and what results you get back.

---

## 1. Lumpsum Calculator

**What it does:** Shows how a one-time investment grows over time.

### What you enter

| Input                | Description                            | Range                 |
| -------------------- | -------------------------------------- | --------------------- |
| Total Investment     | The one-time amount you want to invest | ₹1,000 – ₹1,00,00,000 |
| Duration             | How many years you'll stay invested    | 1 – 40 years          |
| Expected Return Rate | The yearly growth rate you expect      | 1% – 30%              |

### How it works

Your money grows using **compound interest** — meaning each year, you earn returns not just on your original amount, but also on the returns from previous years.

**Calculation:**

> **Maturity Value = Investment × (1 + Return Rate / 100) ^ Number of Years**

**Example:** If you invest ₹5,00,000 at 12% for 5 years:

- Year 1: ₹5,00,000 × 1.12 = ₹5,60,000
- Year 2: ₹5,60,000 × 1.12 = ₹6,27,200
- ...and so on until Year 5 = ₹8,81,170

### What you get back

| Output             | Meaning                                                    |
| ------------------ | ---------------------------------------------------------- |
| Total Invested     | The amount you put in (stays the same)                     |
| Estimated Gains    | How much profit your investment earned                     |
| Maturity Value     | Total amount at the end (Investment + Gains)               |
| Year-by-year chart | A bar chart showing invested amount vs gains for each year |

---

## 2. SIP Returns Calculator

**What it does:** Shows how investing a fixed monthly amount (SIP) grows over time, with an option to increase your monthly amount every year.

### What you enter

| Input                    | Description                                   | Range             |
| ------------------------ | --------------------------------------------- | ----------------- |
| Monthly Investment       | Amount you invest every month                 | ₹500 – ₹5,00,000  |
| Duration                 | How many years you'll keep investing          | 1 – 40 years      |
| Expected Return Rate     | The yearly growth rate you expect             | 1% – 30%          |
| Annual Step-Up Increment | How much more you invest each year (optional) | ₹0 – ₹20,000/year |

### How it works

Every month, your SIP amount is invested and starts growing. Each monthly installment compounds independently. If you opt for a step-up, your monthly SIP increases by a fixed rupee amount every year.

**Calculation (for each monthly installment):**

> Each month's amount grows as: **Installment × (1 + Monthly Rate) ^ (Remaining Months)**
>
> Where **Monthly Rate = Annual Return / 1200**

The total value is the sum of all these individually grown installments. With step-up, the monthly amount in Year 2 = Original + Step-Up, Year 3 = Original + 2×Step-Up, and so on.

**Example:** ₹10,000/month at 12% for 10 years:

- Total you put in: ₹12,00,000
- Maturity Value: ≈ ₹23,23,000
- Your gains: ≈ ₹11,23,000

### What you get back

| Output                 | Meaning                                       |
| ---------------------- | --------------------------------------------- |
| Total Invested         | Total money you put in across all months      |
| Estimated Wealth Gains | Profit earned through compounding             |
| Maturity Value         | Final corpus (Invested + Gains)               |
| Year-by-year chart     | Bar chart showing invested vs gains each year |

---

## 3. Goal Setting Calculator

**What it does:** Tells you how much you need to invest as a one-time lumpsum to reach a financial goal, adjusted for inflation.

### What you enter

| Input                         | Description                                                | Range                  |
| ----------------------------- | ---------------------------------------------------------- | ---------------------- |
| Goal Value (in today's terms) | The amount you need in today's money                       | ₹50,000 – ₹5,00,00,000 |
| Target Time Horizon           | Years from now to reach the goal                           | 1 – 35 years           |
| Expected Return Rate          | Yearly growth rate on investments                          | 1% – 30%               |
| Expected Inflation Rate       | How much prices rise each year                             | 0% – 15%               |

### How it works

**Step 1 — Adjust for inflation:**

> **Inflated Goal = Today's Goal × (1 + Inflation Rate / 100) ^ Years**
>
> This tells you what the goal will actually cost in the future.

**Step 2 — Calculate Lumpsum:**

> **Lumpsum Needed = Inflated Goal ÷ (1 + Return Rate / 100) ^ Years**
>
> This is the present value — how much you need to invest today to reach the future goal.

**Example:** Goal of ₹10,00,000 today, 5 years away, 12% returns, 6% inflation:

- Inflated Goal: ₹13,38,226
- Required Lumpsum: ≈ ₹7,59,400

### What you get back

| Output                          | Meaning                                          |
| ------------------------------- | ------------------------------------------------ |
| Inflated Target Goal            | What the goal will actually cost after inflation |
| Required Lumpsum                | How much you need to invest                      |
| Estimated Gains                 | Returns earned on your investment                |
| Year-by-year chart              | Growth trajectory towards the goal               |

---

## 4. Retirement Fund Calculator

**What it does:** Calculates how much retirement corpus you need and the monthly SIP to build it, accounting for inflation and existing savings.

### What you enter

| Input | Description | Range | Default |
| --- | --- | --- | --- |
| Current Monthly Expenses | What you spend per month today | ₹100 – ₹1,00,00,000 | ₹50,000 |
| Current Age | Your age today | 18 – 60 years | 25 |
| Expected Retirement Age | When you want to retire | 40 – 80 years | 60 |
| Life Expectancy | Estimated life span | 80 – 120 years | 100 |
| Current Savings | What you've already saved for retirement | ₹0 – ₹1,00,00,00,000 | ₹5,00,000 |
| Inflation Rate | Expected yearly rise in living costs | 0% – 20% | 6% |
| Expected Return Rate | Expected yearly returns on investments | 1% – 30% | 12% |

### How it works

**Step 1 — Investment Horizon (Years to Retirement):**

> **Years to Retire = Expected Retirement Age − Current Age**

**Step 2 — Future monthly expense at Retirement:**

> **Monthly Expense at Retirement = Current Monthly Expenses × (1 + Inflation Rate / 100) ^ Years to Retire**

**Step 3 — Total corpus required:**

> **Corpus = Monthly Expense at Retirement × 12 × (Life Expectancy - Expected Retirement Age)**

**Step 4 — Account for existing savings:**

> **Future Value of Savings = Current Savings × (1 + Expected Return Rate / 100) ^ Years to Retire**
>
> **Additional Savings Required = Total Corpus − Future Value of Savings**
> *(If Future Value of Savings is greater than Total Corpus, Additional Savings Required is 0)*

**Step 5 — Required monthly SIP:**

> The calculator finds the monthly SIP needed to build the Additional Savings Required.
> Formula used: **Monthly SIP = ⌈ Additional Savings / Annuity Factor ⌉**
> Where Annuity Factor is the sum of `(1 + Expected Return Rate / 1200) ^ (Total Months - Month Number + 1)` for each month until retirement.

**Example (based on default inputs):** Current Age 25, Retire at 60, Life Expectancy 100, ₹50,000/month expenses, ₹5,00,000 savings, 6% inflation, 12% returns:

- Years to Retire: 35 years
- Monthly expense at 60: ≈ ₹3,84,304
- Total corpus needed: ≈ ₹18.45 Cr (₹18,44,66,083)
- Your ₹5L savings grow to: ≈ ₹2.64 Cr (₹2,63,99,810)
- Additional needed: ≈ ₹15.81 Cr (₹15,80,66,273)
- Monthly SIP required: ₹24,336 (≈ ₹24.34K/month)

### What you get back

| Output | Meaning |
| --- | --- |
| Retirement amount required as per current expenses | Total retirement fund needed based on inflated expenses |
| Additional Saving Required | Gap to fill after accounting for current savings growth |
| Achievable by a monthly SIP of | Monthly investment needed to build the additional savings |
| Donut Chart | Visual breakdown of "Current Savings Value on Retirement" vs "Additional Savings Required" |

---

## 5. Education Calculator

**What it does:** Helps plan for your child's higher education costs, accounting for education inflation and existing savings.

### What you enter

| Input                                 | Description                            | Range                    |
| ------------------------------------- | -------------------------------------- | ------------------------ |
| Child's Age                           | Your child's current age               | 0 – 17 years             |
| College Age                           | When they'll start college             | 16 – 25 years            |
| Estimated Course Cost (today's value) | What the course costs right now        | ₹1,00,000 – ₹2,00,00,000 |
| Current Savings Allocated             | Amount already saved for education     | ₹0 – ₹1,00,00,000        |
| Education Inflation                   | Yearly rise in education costs         | 1% – 20%                 |
| Return Rate                           | Expected yearly returns on investments | 1% – 25%                 |

### How it works

**Step 1 — Future education cost:**

> **Inflated Cost = Today's Cost × (1 + Education Inflation / 100) ^ Years to College**

**Step 2 — Growth of existing savings:**

> **Future Value of Savings = Current Savings × (1 + Return Rate / 100) ^ Years to College**

**Step 3 — Gap to fill:**

> **Additional Required = Inflated Cost − Future Value of Savings**

**Step 4 — Monthly SIP to bridge the gap:**

> The calculator finds the monthly SIP needed to accumulate the additional required amount.

**Example:** Child is 5, college at 18, course costs ₹20,00,000 today, ₹3,00,000 saved, 6% education inflation, 12% returns:

- Course cost at age 18: ≈ ₹42,69,000
- ₹3L savings grow to: ≈ ₹11,66,000
- Gap: ≈ ₹31,03,000
- Monthly SIP: ≈ ₹8,200/month for 13 years

### What you get back

| Output              | Meaning                                                            |
| ------------------- | ------------------------------------------------------------------ |
| Future College Cost | What the course will actually cost when your child reaches college |
| Savings Growth      | What your existing savings will become                             |
| Monthly SIP Needed  | How much to invest monthly to cover the gap                        |
| Year-by-year chart  | Accumulation progress until college age                            |

---

## 6. SWP Calculator (Systematic Withdrawal Plan)

**What it does:** Shows how your investment corpus grows and depletes over time when you make regular monthly withdrawals, with options for a waiting period and annual step-up in withdrawal amounts.

### What you enter

| Input | Description | Range | Default |
| --- | --- | --- | --- |
| Total Investment | The initial lump sum amount invested | ₹10,000 – ₹20,00,00,000 | ₹50,00,000 |
| Withdrawal Per Month | The amount you want to withdraw every month | ₹1,000 – ₹10,00,000 | ₹25,000 |
| Expected Rate of Returns | Yearly growth rate you expect on the corpus | 1% – 30% | 12% |
| How Long You Want To Withdraw | Total years you plan to make withdrawals | 1 – 50 years | 10 years |
| Waiting Period Before Withdrawal | Years you let the corpus grow before withdrawing | 0 – 30 years | 1 year |
| Increase Rate of Withdrawal Amount | Annual percentage step-up in withdrawal amount | 0% – 30% | 5% |

### How it works

**Step 1 — Waiting Period Growth:**
Before any withdrawals begin, the initial investment grows for the duration of the waiting period.
> **Starting Corpus = Total Investment × (1 + Expected Returns / 100) ^ Waiting Period**

**Step 2 — Monthly SWP Simulation:**
Every month, the withdrawal amount is deducted from the corpus, and the remaining balance grows by the monthly return rate `(Expected Returns / 12)`.
> **Monthly Return Rate = Expected Returns / 1200**
> **End of Month Balance = (Previous Balance − Monthly Withdrawal) × (1 + Monthly Return Rate)**

If an annual increase rate (step-up) is specified, the monthly withdrawal amount increases by that percentage every 12 months.
> **Year 2 Monthly Withdrawal = Year 1 Withdrawal × (1 + Increase Rate / 100)**

**Depletion Warning:**
If the corpus runs out before the desired withdrawal period ends, the calculator warns you and performs a binary search to find the **Sustainable Monthly Withdrawal** — the exact amount you can safely withdraw so the corpus lasts exactly the requested number of years.

### What you get back

| Output | Meaning |
| --- | --- |
| Total Invested | The amount you put in initially |
| Total Withdrawal | Sum of all money withdrawn (prepended with `~` if corpus depletes early) |
| Final Portfolio Balance | Remaining corpus value at the end of the period (₹0 if depleted) |
| Year-by-year chart | Bar chart showing the remaining portfolio balance each year |

---

## 7. Regular Income Calculator

**What it does:** Calculates either how much monthly income you can generate for a set number of years, or how long your money will last given a specific monthly withdrawal requirement, based on a combination of SIP and lumpsum investments.

### What you enter

| Input | Description | Range | Default |
| --- | --- | --- | --- |
| SIP | Monthly investment during accumulation phase | ₹10,000 – ₹2,00,000 | ₹10,000 |
| Lumpsum | One-time investment during accumulation phase | ₹10,000 – ₹2,00,00,000 | ₹25,00,000 |
| Investment Period | Years you will invest before the waiting period | 1 – 30 years | 20 years |
| Expected Returns | Yearly return rate during investment and waiting | 1% – 30% | 12% |
| Waiting Period Before Withdrawal | Years corpus grows after investing stops | 0 – 30 years | 10 years |
| Exp Returns In Withdrawal Period | Yearly return rate during the withdrawal phase | 1% – 30% | 5% |

**Depending on the mode selected:**
- **Mode 1 (No. of Years):** You enter `How Long You Want To Withdraw` (1 – 30 years, Default: 20 years)
- **Mode 2 (Monthly SWP):** You enter `Monthly Withdrawal` (₹1,000 – ₹10,00,000, Default: ₹25,000)

### How it works

**Step 1 — Accumulation Phase:**
Both the SIP and lumpsum grow during the Investment Period.
> **Corpus at End of Investment = Future Value of SIP + Future Value of Lumpsum**

**Step 2 — Waiting Phase:**
The accumulated corpus grows for the waiting period before withdrawals start.
> **Portfolio Before Withdrawal = Corpus × (1 + Expected Returns / 100) ^ Waiting Period**

**Step 3 — Mode 1: No. of Years (Calculate Monthly Withdrawal):**
Using the Present Value of Annuity formula, it calculates the fixed monthly withdrawal possible over the requested years so the corpus reaches exactly zero at the end.

**Step 3 — Mode 2: Monthly SWP (Calculate Duration):**
It simulates month-by-month withdrawals. If the monthly return earned by the corpus exceeds the withdrawal amount, it outputs **"For Life"**. Otherwise, it counts the months until the corpus hits zero.

### What you get back

| Output | Meaning |
| --- | --- |
| Portfolio Value at end of Investment | Accumulated value after your SIPs and Lumpsum |
| Portfolio Value before withdrawal | Value after the waiting period finishes |
| Monthly Withdrawal (Mode 1) | The monthly income you can take for the chosen years |
| Duration (Mode 2) | How long your money will last ("For Life" or X years Y months) |
| Year-by-year chart | Chart showing accumulation, waiting, and depletion phases |

---

## 7. Compound Interest Calculator

**What it does:** Shows how a one-time deposit grows with compound interest, with the ability to choose how often interest is compounded.

### What you enter

| Input                 | Description                  | Range                                          |
| --------------------- | ---------------------------- | ---------------------------------------------- |
| Principal Amount      | The initial amount deposited | ₹5,000 – ₹1,00,00,000                          |
| Annual Interest Rate  | Yearly interest rate         | 1% – 30%                                       |
| Time Period           | Number of years              | 1 – 35 years                                   |
| Compounding Frequency | How often interest is added  | Annually / Semi-Annually / Quarterly / Monthly |

### How it works

**Compound Interest Formula:**

> **Maturity = Principal × (1 + Rate / n) ^ (n × Years)**
>
> Where **n** = number of times interest is compounded per year:
>
> - Annually = 1 time/year
> - Semi-Annually = 2 times/year
> - Quarterly = 4 times/year
> - Monthly = 12 times/year

The more frequently interest is compounded, the faster your money grows because earned interest starts earning its own interest sooner.

**Example:** ₹1,00,000 at 10% for 5 years:

- Compounded Annually: ₹1,61,051
- Compounded Quarterly: ₹1,63,862
- Compounded Monthly: ₹1,64,531

### What you get back

| Output             | Meaning                                                       |
| ------------------ | ------------------------------------------------------------- |
| Principal          | The original amount you deposited                             |
| Compound Interest  | Total interest earned                                         |
| Total Maturity     | Final amount (Principal + Interest)                           |
| Year-by-year chart | Bar chart showing principal vs accumulated interest each year |

---

## 8. Inflation Calculator

**What it does:** Shows how rising prices reduce the purchasing power of your money over time.

### What you enter

| Input                     | Description                      | Range                 |
| ------------------------- | -------------------------------- | --------------------- |
| Current Cost / Expense    | What something costs today       | ₹5,000 – ₹1,00,00,000 |
| Time Horizon              | How many years into the future   | 1 – 40 years          |
| Expected Annual Inflation | Yearly rate at which prices rise | 1% – 20%              |

### How it works

**Future Cost Calculation:**

> **Future Cost = Today's Cost × (1 + Inflation Rate / 100) ^ Years**

This is the same compound growth formula, but applied to expenses — showing how much more expensive things will become.

**Example:** Something that costs ₹1,00,000 today at 6% inflation:

- After 10 years: ₹1,79,085
- After 20 years: ₹3,20,714
- After 30 years: ₹5,74,349

### What you get back

| Output             | Meaning                                                     |
| ------------------ | ----------------------------------------------------------- |
| Current Cost       | What it costs today                                         |
| Cost Increase      | How much more it will cost in the future                    |
| Future Cost        | The full price after inflation                              |
| Year-by-year chart | Bar chart comparing today's cost vs inflated cost each year |

---

## Key Concepts Used Across Calculators

### Compound Growth

The foundation of most calculators. Your money earns returns, and those returns earn their own returns — creating exponential growth over time.

### Inflation Adjustment

Used in Goal Setting, Retirement, and Education calculators. Inflation makes things more expensive over time, so the calculators account for the real future cost of your goals.

### SIP (Systematic Investment Plan)

A disciplined approach where you invest a fixed amount every month. Each monthly installment compounds independently from the date it was invested.

### Annual Step-Up

An optional feature in the SIP calculator where you increase your monthly investment by a fixed rupee amount every year — helping you invest more as your income grows.

### Present Value (Lumpsum for Future Goals)

Used in Goal Setting (Lumpsum mode). It works backwards from a future target to tell you how much to invest today.
