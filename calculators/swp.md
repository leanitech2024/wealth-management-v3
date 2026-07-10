# Systematic Withdrawal Plan (SWP) Calculator

The **Systematic Withdrawal Plan (SWP) Calculator** helps users plan regular withdrawals from a fixed investment corpus (often used for retirement income) and estimates how long the corpus will last based on expected returns.

---

## 1. User Interface Inputs

The calculator provides four input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Total corpus** | ₹ | 50,00000 | 1,00,000 | 5,00,00,000 | 50,000 | The initial lump-sum amount from which withdrawals will be made. |
| **Monthly withdrawal** | ₹ | 30,000 | 1,000 | 5,00,000 | 500 | The fixed amount to withdraw at the end of each month. |
| **Expected return rate** | % | 8 | 1 | 20 | 0.5 | The expected annual rate of return on the remaining corpus. |
| **Projection period** | yrs | 20 | 5 | 50 | 1 | The timeframe over which to project the corpus balance. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **Total withdrawn**: The sum of all withdrawals during the projection period (or until depletion, whichever comes first), formatted with `fmtINR`.
*   **Final balance**: The remaining value of the corpus at the end of the projection period, formatted with `fmtINR`.
*   **Corpus lasts**: Indicates how long the funds will last. If the interest earned exceeds or equals the withdrawal, it displays **Never depletes**. Otherwise, it shows the exact duration (e.g., `X yrs Y mo`).
*   **Balance Chart**: An Area Chart showing the year-by-year remaining corpus balance.

---

## 3. Mathematical Formula & Simulation

SWP calculations simulate cash flow on a month-by-month basis, as interest is added and withdrawals are deducted:

### Mathematical Model

Let $B_m$ be the balance at the end of month $m$, starting with $B_0 = \text{Corpus}$:

$$B_m = \max \left(0, B_{m-1} \times (1 + i) - W \right)$$

Where:
*   $i$ = Monthly interest rate (expected annual return rate as a decimal divided by 12, i.e., $r / 12$)
*   $W$ = Monthly withdrawal amount
*   The simulation runs until $B_m = 0$ or it reaches a cap of 1,200 months (100 years).

### Code Implementation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L53-L81):
```typescript
export function swpMonths(corpus: number, monthlyWithdraw: number, annualRatePct: number) {
  const i = annualRatePct / 100 / 12;
  let bal = corpus;
  let m = 0;
  const cap = 12 * 100;
  while (bal > 0 && m < cap) {
    bal = bal * (1 + i) - monthlyWithdraw;
    m++;
  }
  return m >= cap ? Infinity : m;
}

export function swpSeries(
  corpus: number,
  monthlyWithdraw: number,
  annualRatePct: number,
  years: number,
) {
  const i = annualRatePct / 100 / 12;
  let bal = corpus;
  const out: { year: number; balance: number }[] = [{ year: 0, balance: bal }];
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) bal = Math.max(0, bal * (1 + i) - monthlyWithdraw);
    out.push({ year: y, balance: bal });
  }
  return out;
}
```

---

## 4. Step-by-Step Walkthrough Example

### Scenario A: Never Depletes (Default Inputs)
*   **Corpus ($B_0$)**: ₹50,00000 (50 Lakhs)
*   **Monthly Withdrawal ($W$)**: ₹30,000
*   **Annual return ($rate$)**: 8% ($i = 0.08 / 12 \approx 0.0066667$)

1.  **Calculate Month 1 End Balance**:
    $$B_1 = 5,000,000 \times (1 + 0.0066667) - 30,000$$
    $$B_1 = 5,033,333.33 - 30,000 = \text{₹}5,003,333.33$$
2.  **Analyze Growth**:
    Because the monthly interest earned ($5,000,000 \times 0.0066667 = \text{₹}33,333.33$) is greater than the monthly withdrawal ($W = \text{₹}30,000$), the balance increases. Thus, the corpus will **never deplete**.
3.  **Total Withdrawn (over 20 years)**:
    $$30,000 \times 20 \text{ years} \times 12 \text{ months} = \text{₹}72,00,000$$

### Scenario B: Depleting Corpus (Increased Withdrawal)
*   **Corpus ($B_0$)**: ₹50,00000 (50 Lakhs)
*   **Monthly Withdrawal ($W$)**: ₹50,000
*   **Annual return ($rate$)**: 8% ($i \approx 0.0066667$)

1.  **Calculate Month 1 End Balance**:
    $$B_1 = 5,000,000 \times (1.0066667) - 50,000 = 5,033,333.33 - 50,000 = \text{₹}4,983,333.33$$
    Since the withdrawal exceeds the interest, the balance shrinks monthly. The corpus eventually depletes in **147 months** (12 years and 3 months).
