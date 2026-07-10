# SIP Step-Up Calculator

The **SIP Step-Up Calculator** helps users estimate the future value of a Systematic Investment Plan where the monthly investment amount is increased (stepped up) by a fixed percentage annually. This aligns with salary/income increments to accelerate wealth building.

---

## 1. User Interface Inputs

The calculator provides four input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Initial monthly SIP** | ₹ | 10,000 | 500 | 2,00,000 | 500 | The starting monthly investment amount for the first year. |
| **Annual step-up** | % | 10 | 0 | 50 | 1 | The percentage by which the monthly SIP increases each year. |
| **Expected return rate** | % | 12 | 1 | 30 | 0.5 | The expected annual rate of return. |
| **Time period** | yrs | 20 | 1 | 40 | 1 | The total duration of the investment in years. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **Total invested**: The sum of all monthly contributions across the years, taking into account the annual step-up increase. Formatted with `fmtINR`.
*   **Est. returns**: The total capital appreciation (Future Value minus Total Invested), formatted with `fmtINR`.
*   **Future value**: The final maturity amount at the end of the investment horizon, formatted with `fmtFull` (e.g., `₹2,07,71,208`).
*   **Growth Chart**: An Area Chart showcasing the year-on-year accumulation of **Invested** vs. **Value** over the total timeline.

---

## 3. Mathematical Calculations & Logic

Because the monthly contribution changes annually, the calculation is performed iteratively, month-by-month, through a loop over the years:

### Mathematical Model

For each year $y$ from $1$ to $Y$ (total years):
1.  Set the monthly SIP amount for the current year:
    $$P_y = P_{\text{initial}} \times (1 + s)^{y-1}$$
    Where $s$ is the annual step-up rate as a decimal (e.g., $10\% = 0.10$).
2.  For each month $m$ from $1$ to $12$ in year $y$:
    *   Add the monthly contribution to the balance and compound:
        $$V_{\text{new}} = (V_{\text{prev}} + P_y) \times (1 + i)$$
    *   Increment total invested amount:
        $$I_{\text{new}} = I_{\text{prev}} + P_y$$
    Where $i$ is the monthly interest rate ($\text{expected annual rate} / 12 / 100$).

### Code Implementation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L27-L45):
```typescript
export function fvSIPStepUp(
  monthly: number,
  annualRatePct: number,
  years: number,
  stepUpPct: number,
) {
  const i = annualRatePct / 100 / 12;
  let value = 0;
  let invested = 0;
  let cur = monthly;
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      value = (value + cur) * (1 + i);
      invested += cur;
    }
    cur = cur * (1 + stepUpPct / 100);
  }
  return { value, invested };
}
```

---

## 4. Step-by-Step Walkthrough Example (First 2 Years)

Let's trace the calculation for:
*   **Initial Monthly SIP ($P$)**: ₹10,000
*   **Step-Up Rate ($s$)**: 10% ($0.10$)
*   **Annual Return ($rate$)**: 12% ($i = 0.01$ monthly)

### Year 1:
*   Monthly contribution: $P_1 = \text{₹}10,000$
*   Total Invested in Year 1: $10,000 \times 12 = \text{₹}1,20,000$
*   Value at Year 1 end (12 months compounding):
    $$V_1 = 10,000 \times \left[ \frac{(1.01)^{12} - 1}{0.01} \right] \times 1.01 \approx \text{₹}1,28,093$$

### Year 2:
*   Monthly contribution is stepped up: $P_2 = 10,000 \times (1 + 0.10) = \text{₹}11,000$
*   Total Invested in Year 2: $11,000 \times 12 = \text{₹}1,32,000$. (Cumulative Invested: ₹2,52,000)
*   Value at Year 2 end (compounded month-by-month starting with $V_1$ as initial balance):
    *   Month 13: $V = (128,093 + 11,000) \times 1.01 = 140,483.93$
    *   Month 14: $V = (140,483.93 + 11,000) \times 1.01 = 153,008.77$
    *   ...
    *   Month 24 (Year 2 End Value): $\approx \text{₹}2,82,233$

By Year 20, the initial monthly investment grows to $\approx \text{₹}61,159$ per month, resulting in:
*   **Total invested**: `₹68.73 L` (₹68,73,000)
*   **Est. returns**: `₹1.39 Cr` (₹1,38,98,208)
*   **Future value**: `₹2,07,71,208`
