# Cost of Delay Investing Calculator

The **Cost of Delay Investing Calculator** demonstrates the financial impact of delaying the start of a Systematic Investment Plan (SIP). It compares the future wealth accumulated when starting now versus starting after a specific number of years, highlighting the "cost of delay" or the wealth gap.

---

## 1. User Interface Inputs

The calculator provides four input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Monthly investment** | ₹ | 10,000 | 500 | 2,00,000 | 500 | The recurring monthly contribution amount. |
| **Expected return** | % | 12 | 1 | 25 | 0.5 | The expected annual rate of return. |
| **Total horizon** | yrs | 25 | 5 | 40 | 1 | The target investment timeframe (in years) from today. |
| **Delay starting by** | yrs | 5 | 1 | `Total horizon - 1` | 1 | The number of years you delay starting your investment. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **If you start now**: The future value of the SIP if you begin today and invest for the entire horizon. Formatted with `fmtINR` (e.g., `₹1.90 Cr`).
*   **If you delay X yrs**: The future value of the SIP if you start after the delay period (reducing your active investing years). Formatted with `fmtINR` (e.g., `₹99.91 L`).
*   **Cost of delay**: The wealth gap or difference between starting now and starting later, formatted as a full Indian Rupee value (via `fmtFull` e.g., `₹89,84,872`).
*   **Comparison Chart**: A multi-series Area Chart tracking the year-by-year growth of **Start now** vs. **Delay X yrs** over the total horizon.

---

## 3. Mathematical Formulas & Calculations

The calculator compares two separate SIP calculations using the standard annuity due formula:

### 1. Starting Now (Investment period = $N$ years)
$$\text{Future Value}_{\text{now}} = P \times \left[ \frac{(1 + i)^{N \times 12} - 1}{i} \right] \times (1 + i)$$

### 2. Starting Later (Investment period = $N - D$ years)
$$\text{Future Value}_{\text{delayed}} = P \times \left[ \frac{(1 + i)^{(N - D) \times 12} - 1}{i} \right] \times (1 + i)$$

Where:
*   $P$ = Monthly investment amount
*   $i$ = Monthly interest rate (expected annual return rate as a decimal divided by 12, i.e., $r / 12$)
*   $N$ = Total horizon in years
*   $D$ = Delay in years

### 3. Cost of Delay
$$\text{Cost of Delay} = \text{Future Value}_{\text{now}} - \text{Future Value}_{\text{delayed}}$$

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

For each year $y$ from $0$ to $N$:
*   **Start now series value**: $fvSIP(P, r, y)$
*   **Delayed series value**:
    *   If $y < D$: $0$
    *   If $y \ge D$: $fvSIP(P, r, y - D)$

---

## 4. Step-by-Step Walkthrough Example

Let's calculate the values for the default inputs:
*   **Monthly investment ($P$)**: ₹10,000
*   **Expected Return ($rate$)**: 12% ($i = 0.01$ monthly)
*   **Total Horizon ($N$)**: 25 years (300 months)
*   **Delay ($D$)**: 5 years (leaving $25 - 5 = 20$ years or 240 months of investing)

1.  **Calculate Future Value: Start Now**:
    $$FV_{\text{now}} = 10,000 \times \left[ \frac{(1.01)^{300} - 1}{0.01} \right] \times (1.01)$$
    $$FV_{\text{now}} = 10,000 \times 1878.8466 \times 1.01 \approx \text{₹}1,89,76,351$$

2.  **Calculate Future Value: Delay 5 Years**:
    $$FV_{\text{delayed}} = 10,000 \times \left[ \frac{(1.01)^{240} - 1}{0.01} \right] \times (1.01)$$
    $$FV_{\text{delayed}} = 10,000 \times 989.2554 \times 1.01 \approx \text{₹}99,91,479$$

3.  **Compute Cost of Delay**:
    $$\text{Cost of Delay} = 1,89,76,351 - 99,91,479 = \text{₹}89,84,872$$

**Display Results:**
*   **If you start now**: `₹1.90 Cr`
*   **If you delay 5 yrs**: `₹99.91 L`
*   **Cost of delay**: `₹89,84,872`
