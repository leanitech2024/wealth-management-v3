# Systematic Investment Plan (SIP) Calculator

The **Systematic Investment Plan (SIP) Calculator** helps users estimate the future value and wealth accumulation of recurring monthly investments over a specified period with a chosen annual rate of return.

---

## 1. User Interface Inputs

The calculator provides three input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Monthly investment** | ₹ | 10,000 | 500 | 2,00,000 | 500 | The amount to be invested regularly every month. |
| **Expected return rate** | % | 12 | 1 | 30 | 0.5 | The expected annual rate of return on investments. |
| **Time period** | yrs | 15 | 1 | 40 | 1 | The total duration of the SIP in years. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **Invested**: The total principal amount invested over the time period ($Monthly \times Years \times 12$), formatted using abbreviated Indian Rupee notation (via `fmtINR` e.g., `₹18.00 L`).
*   **Est. returns**: The total estimated earnings or capital gains (Future Value minus Invested Principal), formatted using abbreviated Indian Rupee notation (via `fmtINR` e.g., `₹32.46 L`).
*   **Future value**: The total accumulated wealth at maturity, formatted as a full Indian Rupee value (via `fmtFull` e.g., `₹50,45,760`).
*   **Growth Chart**: An interactive Area Chart showing the progression of the **Invested** amount vs. the accumulated **Value** over the years.

---

## 3. Mathematical Formula & Calculations

SIP calculations are based on the formula for the future value of an **annuity due** (compounded monthly because payments are made at the beginning of each period):

$$\text{Future Value } (A) = P \times \left[ \frac{(1 + i)^n - 1}{i} \right] \times (1 + i)$$

Where:
*   $P$ = Monthly investment amount
*   $i$ = Monthly interest rate (annual return rate as a decimal divided by 12, i.e., $r / 12$)
*   $n$ = Total number of monthly payments ($\text{years} \times 12$)
*   The term $(1 + i)$ accounts for the fact that each payment is made at the start of the month, accumulating interest for that entire month.

### Code Implementation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L19-L24):
```typescript
export function fvSIP(monthly: number, annualRatePct: number, years: number) {
  const i = annualRatePct / 100 / 12;
  const n = years * 12;
  if (i === 0) return monthly * n;
  return monthly * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
}
```

### Chart Series Generation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L97-L112):
```typescript
export function sipSeries(monthly: number, annualRatePct: number, years: number) {
  const i = annualRatePct / 100 / 12;
  let value = 0;
  let invested = 0;
  const out: { year: number; invested: number; value: number }[] = [
    { year: 0, invested: 0, value: 0 },
  ];
  for (let y = 1; y <= years; y++) {
    for (let m = 0; m < 12; m++) {
      value = (value + monthly) * (1 + i);
      invested += monthly;
    }
    out.push({ year: y, invested, value });
  }
  return out;
}
```

---

## 4. Step-by-Step Walkthrough Example

Let's calculate the values for the default inputs:
*   **Monthly investment ($P$)**: ₹10,000
*   **Annual Return Rate ($rate$)**: 12% ($r = 0.12$)
*   **Time Period ($n$)**: 15 years

1.  **Calculate Monthly Interest Rate ($i$)**:
    $$i = \frac{0.12}{12} = 0.01 \text{ (or 1% per month)}$$

2.  **Calculate Total Months ($n$)**:
    $$n = 15 \text{ years} \times 12 = 180 \text{ months}$$

3.  **Compute Future Value ($A$)**:
    $$A = 10,000 \times \left[ \frac{(1 + 0.01)^{180} - 1}{0.01} \right] \times (1 + 0.01)$$
    $$A = 10,000 \times \left[ \frac{5.995802 - 1}{0.01} \right] \times 1.01$$
    $$A = 10,000 \times 499.5802 \times 1.01$$
    $$A \approx 10,000 \times 504.575999$$
    $$A \approx \text{₹}50,45,759.99$$

4.  **Compute Total Invested ($I$)**:
    $$I = P \times n = 10,000 \times 180 = \text{₹}18,00,000$$

5.  **Compute Estimated Returns**:
    $$\text{Est. returns} = A - I = 5,045,760 - 1,800,000 = \text{₹}32,45,760$$

**Display Results:**
*   **Invested**: `₹18.00 L`
*   **Est. returns**: `₹32.46 L`
*   **Future value**: `₹50,45,760` (rounded to nearest integer)
