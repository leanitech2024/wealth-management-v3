# Goal Planner Calculator

The **Goal Planner Calculator** helps users find the required monthly Systematic Investment Plan (SIP) contribution needed to achieve a target financial goal within a specific timeline at an expected rate of return.

---

## 1. User Interface Inputs

The calculator provides three input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Target amount** | ₹ | 50,00000 | 50,000 | 10,00,00,000 | 50,000 | The target amount of money (financial goal) to accumulate. |
| **Time period** | yrs | 10 | 1 | 40 | 1 | The timeframe in years within which the goal needs to be met. |
| **Expected return** | % | 12 | 1 | 25 | 0.5 | The expected annual rate of return on investments. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **Goal**: The target financial goal amount, formatted as a full Indian Rupee value (via `fmtFull` e.g., `₹50,00,000`).
*   **Total invested**: The total principal amount that would be contributed through monthly SIPs over the time period, formatted as a full Indian Rupee value (via `fmtFull` e.g., `₹25,82,432`).
*   **Required monthly SIP**: The calculated monthly investment required starting now to hit the target, formatted as a highlighted full Indian Rupee value (via `fmtFull` e.g., `₹21,520`).
*   **Summary text**: A summary sentence (e.g., *"Invest ₹21.52 K every month for 10 years at 12% to reach ₹50.00 L."*).

---

## 3. Mathematical Formula & Calculations

The Goal Planner Calculator uses the inverse of the future value of an **annuity due** formula:

$$\text{Required Monthly SIP } (S) = \frac{G}{\left[ \frac{(1 + i)^n - 1}{i} \right] \times (1 + i)}$$

Where:
*   $G$ = Target amount (Goal)
*   $i$ = Monthly interest rate (expected annual rate as a decimal divided by 12, i.e., $r / 12$)
*   $n$ = Total number of monthly contributions ($\text{time period in years} \times 12$)
*   The $(1 + i)$ factor represents that payments are made at the start of each month (annuity due).

### Code Implementation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L84-L89):
```typescript
export function requiredSIP(goal: number, annualRatePct: number, years: number) {
  const i = annualRatePct / 100 / 12;
  const n = years * 12;
  if (i === 0) return goal / n;
  return goal / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
}
```

### Total Invested
$$\text{Total Invested } (I) = S \times n$$

---

## 4. Step-by-Step Walkthrough Example

Let's calculate the values for the default inputs:
*   **Target Goal ($G$)**: ₹50,00,000 (50 Lakhs)
*   **Time Period ($n$)**: 10 years (120 months)
*   **Expected Return ($rate$)**: 12% ($i = 0.01$ monthly)

1.  **Calculate Monthly Interest Rate ($i$)**:
    $$i = \frac{0.12}{12} = 0.01 \text{ (or 1% per month)}$$

2.  **Calculate Total Months ($n$)**:
    $$n = 10 \text{ years} \times 12 = 120 \text{ months}$$

3.  **Compute Required Monthly SIP ($S$)**:
    $$S = \frac{5,000,000}{\left[ \frac{(1 + 0.01)^{120} - 1}{0.01} \right] \times (1 + 0.01)}$$
    $$S = \frac{5,000,000}{\left[ \frac{3.300387 - 1}{0.01} \right] \times 1.01}$$
    $$S = \frac{5,000,000}{230.0387 \times 1.01}$$
    $$S = \frac{5,000,000}{232.339076}$$
    $$S \approx \text{₹}21,520.27$$

4.  **Compute Total Invested ($I$)**:
    $$I = S \times n = 21,520.27 \times 120 \approx \text{₹}25,82,432.40$$

**Display Results:**
*   **Goal**: `₹50,00,000`
*   **Total invested**: `₹25,82,432` (rounded to nearest integer)
*   **Required monthly SIP**: `₹21,520` (rounded to nearest integer)
