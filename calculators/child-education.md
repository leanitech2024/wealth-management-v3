# Child Education Calculator

The **Child Education Calculator** helps parents estimate the future cost of higher education for their child, accounting for tuition fee inflation, and determines the monthly SIP required to achieve that goal, taking existing savings into account.

---

## 1. User Interface Inputs

The calculator provides five input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Current education cost** | ₹ | 20,00,000 | 1,00,000 | 2,00,00,000 | 50,000 | The cost of the target course/degree in today's money. |
| **Years to goal** | yrs | 15 | 1 | 25 | 1 | The time left until the child starts higher education. |
| **Education inflation** | % | 8 | 3 | 15 | 0.5 | The expected annual inflation rate specifically for education costs (often higher than general inflation). |
| **Expected return** | % | 12 | 4 | 20 | 0.5 | The expected annual rate of return on the investment. |
| **Existing savings** | ₹ | 0 | 0 | 1,00,00,000 | 10,000 | Any lump-sum savings already set aside for education. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **Future cost**: The inflation-adjusted cost of education when the child is ready to enroll, formatted using a full Indian Rupee value (via `fmtFull` e.g., `₹63,44,338`).
*   **Amount still needed**: The net goal amount after subtracting the future matured value of existing savings, formatted using a full Indian Rupee value (via `fmtFull`).
*   **Required monthly SIP**: The monthly investment needed starting now to bridge the gap, formatted using a full Indian Rupee value (via `fmtFull` e.g., `₹12,574`).
*   **Summary text**: A short sentence summarizing the required investment plan (e.g., *"To fund ₹63.44 L in 15 years, invest ₹12.57 K/month at 12% returns"*).

---

## 3. Mathematical Formulas & Calculations

The calculator follows a three-stage calculation flow:

### Step 1: Inflating Current Cost to Future Cost
Education costs are inflated annually:

$$\text{Future Cost } (F) = C \times (1 + r_{\text{inf}})^n$$

Where:
*   $C$ = Current cost of education
*   $r_{\text{inf}}$ = Education inflation rate (as a decimal, e.g., $8\% = 0.08$)
*   $n$ = Years to goal

### Step 2: Compounding Existing Savings
Any existing lump-sum savings grow with monthly compounding over the investment period:

$$E_{\text{grown}} = E \times \left(1 + i_{\text{ret}}\right)^{n \times 12}$$

Where:
*   $E$ = Existing savings
*   $i_{\text{ret}}$ = Monthly return rate ($\text{expected annual return} / 12 / 100$)
*   $n \times 12$ = Total compounding months

### Step 3: Estimating Net Goal and Required SIP
The amount still needed is the gap between future cost and grown savings:

$$\text{Net Needed } (N) = \max(0, F - E_{\text{grown}})$$

The required monthly SIP is computed by inverting the SIP Future Value formula:

$$\text{Required Monthly SIP } (S) = \frac{N}{\left[ \frac{(1 + i_{\text{ret}})^{n \times 12} - 1}{i_{\text{ret}}} \right] \times (1 + i_{\text{ret}})}$$

### Code Implementation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L84-L94):
```typescript
export function inflate(present: number, inflationPct: number, years: number) {
  return present * Math.pow(1 + inflationPct / 100, years);
}

export function requiredSIP(goal: number, annualRatePct: number, years: number) {
  const i = annualRatePct / 100 / 12;
  const n = years * 12;
  if (i === 0) return goal / n;
  return goal / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
}
```

---

## 4. Step-by-Step Walkthrough Example

Let's calculate the values for the default inputs:
*   **Current cost ($C$)**: ₹20,00,000
*   **Years ($n$)**: 15 years
*   **Education inflation ($r_{\text{inf}}$)**: 8%
*   **Return rate ($rate$)**: 12% ($i_{\text{ret}} = 0.01$ monthly)
*   **Existing savings ($E$)**: ₹0

1.  **Calculate Future Cost ($F$)**:
    $$F = 2,000,000 \times (1 + 0.08)^{15}$$
    $$F = 2,000,000 \times (3.172169)$$
    $$F \approx \text{₹}63,44,338$$

2.  **Calculate Grown Existing Savings ($E_{\text{grown}}$)**:
    Since $E = 0$:
    $$E_{\text{grown}} = 0$$

3.  **Calculate Net Amount Needed ($N$)**:
    $$N = F - E_{\text{grown}} = 6,344,338 - 0 = \text{₹}63,44,338$$

4.  **Calculate Required Monthly SIP ($S$)**:
    $$S = \frac{6,344,338}{\left[ \frac{(1 + 0.01)^{180} - 1}{0.01} \right] \times (1 + 0.01)}$$
    $$S = \frac{6,344,338}{499.5802 \times 1.01}$$
    $$S = \frac{6,344,338}{504.575999}$$
    $$S \approx \text{₹}12,573.62$$

**Display Results:**
*   **Future cost**: `₹63,44,338`
*   **Amount still needed**: `₹63,44,338`
*   **Required monthly SIP**: `₹12,574` (rounded to nearest integer)
