# Return on Investment (Lumpsum) Calculator

The **Return on Investment (Lumpsum) Calculator** helps users estimate the future value of a one-time lump-sum investment based on an expected annual rate of return and an investment horizon.

---

## 1. User Interface Inputs

The calculator provides three input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Total investment** | ₹ | 1,00,000 | 1,000 | 1,00,00,000 | 1,000 | The initial one-time principal amount invested. |
| **Expected return** | % | 12 | 1 | 30 | 0.5 | The expected annual rate of return. |
| **Time period** | yrs | 10 | 1 | 40 | 1 | The investment horizon in years. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **Invested (Principal)**: The original investment amount, formatted using abbreviated Indian Rupee notation (via `fmtINR` e.g., `₹1.00 L`, `₹10.00 K`).
*   **Est. returns (Estimated Earnings)**: The total growth or interest earned (Future Value minus Invested Principal), formatted using abbreviated Indian Rupee notation (via `fmtINR`).
*   **Future value**: The total accumulated wealth at the end of the time period, formatted as a full Indian Rupee value (via `fmtFull` e.g., `₹3,30,039`).
*   **Growth Chart**: An interactive Area Chart mapping the growth of the investment value over time, showing annual snapshots from Year 0 to the target year.

---

## 3. Mathematical Formula & Calculations

The Lumpsum Calculator uses a monthly compounding compound interest formula:

$$\text{Future Value } (A) = P \times \left(1 + \frac{r}{12}\right)^{n \times 12}$$

Where:
*   $P$ = Principal amount (Total investment)
*   $r$ = Annual interest rate (expressed as a decimal, i.e., $\text{Expected return rate} / 100$)
*   $n$ = Time period in years
*   $12$ = Number of compounding periods per year (monthly compounding)

### Code Implementation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L48-L51):
```typescript
export function fvLumpsum(principal: number, annualRatePct: number, years: number) {
  const i = annualRatePct / 100 / 12;
  return principal * Math.pow(1 + i, years * 12);
}
```

### Chart Series Generation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L138-L145):
```typescript
export function lumpsumSeries(principal: number, annualRatePct: number, years: number) {
  const i = annualRatePct / 100 / 12;
  const out = [{ year: 0, value: principal }];
  for (let y = 1; y <= years; y++) {
    out.push({ year: y, value: principal * Math.pow(1 + i, y * 12) });
  }
  return out;
}
```

---

## 4. Step-by-Step Walkthrough Example

Let's calculate the values for the default inputs:
*   **Principal ($P$)**: ₹1,00,000
*   **Annual Return Rate ($rate$)**: 12% ($r = 0.12$)
*   **Time Period ($n$)**: 10 years

1.  **Calculate Monthly Interest Rate ($i$)**:
    $$i = \frac{0.12}{12} = 0.01 \text{ (or 1% per month)}$$

2.  **Calculate Total Months ($m$)**:
    $$m = 10 \text{ years} \times 12 = 120 \text{ months}$$

3.  **Compute Future Value ($A$)**:
    $$A = 100,000 \times (1 + 0.01)^{120}$$
    $$A = 100,000 \times (1.01)^{120}$$
    $$A \approx 100,000 \times 3.30038689$$
    $$A \approx \text{₹}3,30,038.69$$

4.  **Compute Estimated Returns**:
    $$\text{Est. returns} = A - P = 330,038.69 - 100,000 \approx \text{₹}2,30,038.69$$

**Display Results:**
*   **Invested**: `₹1.00 L`
*   **Est. returns**: `₹2.30 L`
*   **Future value**: `₹3,30,039` (rounded to nearest integer)
