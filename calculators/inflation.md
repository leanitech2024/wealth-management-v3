# Inflation Calculator

The **Inflation Calculator** helps users estimate how inflation erodes the value of money over time. It calculates what a specific sum of money today will be worth in the future (inflated cost) and how the purchasing power of a fixed amount of money will decrease.

---

## 1. User Interface Inputs

The calculator provides three input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Current amount** | ₹ | 1,00,000 | 1,000 | 1,00,00,000 | 1,000 | The base amount in today's money. |
| **Inflation rate** | % | 6 | 1 | 15 | 0.5 | The expected annual inflation rate. |
| **Years from now** | yrs | 20 | 1 | 50 | 1 | The number of years into the future. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **Today's value**: The base amount, formatted as a full Indian Rupee value (via `fmtFull` e.g., `₹1,00,000`).
*   **Equivalent in X years**: The amount required in the future to purchase the same basket of goods that costs the "Current amount" today, formatted as a highlighted full Indian Rupee value (via `fmtFull` e.g., `₹3,20,714`).
*   **Purchasing power of today's ₹**: The real value or purchasing power of a nominal sum of the "Current amount" in the future, formatted as a full Indian Rupee value (via `fmtFull` e.g., `₹31,180`).
*   **Summary text**: A summary sentence (e.g., *"₹1.00 L today will need ₹3.21 L in 20 years to buy the same things at 6% inflation."*).

---

## 3. Mathematical Formulas & Calculations

The calculator computes two distinct values: future inflated equivalent cost, and future purchasing power.

### 1. Future Inflated Equivalent Cost ($F$)
This accounts for how much prices will rise over $n$ years at an inflation rate $r$:

$$F = P \times (1 + r)^n$$

Where:
*   $P$ = Present amount (Current amount)
*   $r$ = Annual inflation rate (as a decimal, e.g., $6\% = 0.06$)
*   $n$ = Years from now

### 2. Future Purchasing Power ($PV$)
This represents the real value of the nominal sum $P$ in $n$ years. In other words, if you hold $P$ cash for $n$ years under inflation, what will be its buying power in today's terms?

$$PV = P \times \left( \frac{P}{F} \right) = \frac{P^2}{P \times (1 + r)^n} = \frac{P}{(1 + r)^n}$$

This is mathematically identical to discounting $P$ backward by the inflation rate for $n$ years.

### Code Implementation

Defined in [finance.ts](file:///d:/shah-capital-services/src/lib/finance.ts#L91-L94):
```typescript
export function inflate(present: number, inflationPct: number, years: number) {
  return present * Math.pow(1 + inflationPct / 100, years);
}
```

Implementation in [InflationCalculator.tsx](file:///d:/shah-capital-services/src/components/calc/calculators/InflationCalculator.tsx#L10-L14):
```typescript
const future = useMemo(
  () => inflate(present, rate, years),
  [present, rate, years],
)
const purchasingPower = present * (present / future)
```

---

## 4. Step-by-Step Walkthrough Example

Let's calculate the values for the default inputs:
*   **Current Amount ($P$)**: ₹1,00,000
*   **Inflation Rate ($r$)**: 6% ($0.06$)
*   **Years ($n$)**: 20 years

1.  **Calculate Future Inflated Cost ($F$)**:
    $$F = 100,000 \times (1 + 0.06)^{20}$$
    $$F = 100,000 \times (1.06)^{20}$$
    $$F = 100,000 \times 3.207135$$
    $$F \approx \text{₹}3,20,713.55$$

2.  **Calculate Future Purchasing Power ($PV$)**:
    $$PV = 100,000 \times \left( \frac{100,000}{320,713.55} \right)$$
    $$PV = \frac{100,000}{3.207135}$$
    $$PV \approx \text{₹}31,180.48$$

**Display Results:**
*   **Today's value**: `₹1,00,000`
*   **Equivalent in 20 years**: `₹3,20,714` (rounded to nearest integer)
*   **Purchasing power of today's ₹**: `₹31,180` (rounded to nearest integer)
