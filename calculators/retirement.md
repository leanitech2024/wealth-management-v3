# Retirement Calculator

The **Retirement Calculator** helps users estimate the retirement corpus required to sustain their current lifestyle post-retirement, accounting for inflation and differing pre-retirement and post-retirement returns. It also calculates the monthly SIP required today to accumulate that target corpus.

---

## 1. User Interface Inputs

The calculator provides seven input fields, each equipped with a text/number field and a range slider:

| Input Label | Unit | Default Value | Min Value | Max Value | Step | Description |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Current age** | yrs | 30 | 18 | 60 | 1 | The current age of the user. |
| **Retirement age** | yrs | 60 | 40 | 75 | 1 | The age at which the user plans to retire. |
| **Life expectancy** | yrs | 85 | 60 | 100 | 1 | The expected lifespan (determines retirement duration). |
| **Current monthly expense** | ₹ | 50,000 | 5,000 | 5,00,000 | 1,000 | Current average monthly living expenses in today's money. |
| **Inflation** | % | 6 | 2 | 12 | 0.5 | Expected annual inflation rate (applied pre- and post-retirement). |
| **Return till retirement** | % | 12 | 4 | 20 | 0.5 | Expected annual rate of return on pre-retirement investments. |
| **Return after retirement** | % | 7 | 3 | 15 | 0.5 | Expected annual rate of return on post-retirement safe investments. |

---

## 2. Outputs & Results

The calculator computes and displays the following outputs:

*   **Monthly expense at retirement**: The current monthly expense adjusted for inflation up to retirement age. Formatted using a full Indian Rupee value (via `fmtFull` e.g., `₹2,87,175`).
*   **Retirement corpus needed**: The total lump-sum amount required at retirement to support post-retirement expenses till life expectancy, formatted as a full Indian Rupee value (via `fmtFull` e.g., `₹7,66,82,608`).
*   **Monthly SIP required now**: The monthly SIP contribution required starting today to accumulate the retirement corpus by retirement age, formatted using a full Indian Rupee value (via `fmtFull` e.g., `₹21,724`).
*   **Summary text**: A summary sentence (e.g., *"Save ₹21.72 K/month for 30 years to build a ₹7.67 Cr corpus."*).

---

## 3. Mathematical Formulas & Calculations

The calculation flow operates in four steps:

### Step 1: Time Horizon Calculations
*   **Years to Retirement** ($N_{\text{pre}}$):
    $$N_{\text{pre}} = \max(1, \text{Retirement Age} - \text{Current Age})$$
*   **Years in Retirement** ($N_{\text{post}}$):
    $$N_{\text{post}} = \max(1, \text{Life Expectancy} - \text{Retirement Age})$$
*   **Total Retirement Months** ($n_{\text{post}}$):
    $$n_{\text{post}} = N_{\text{post}} \times 12$$

### Step 2: Inflated Monthly Expense at Retirement
Expenses grow annually with inflation:

$$E_{\text{ret}} = E_{\text{current}} \times (1 + r_{\text{inf}})^{N_{\text{pre}}}$$

Where $r_{\text{inf}}$ is the annual inflation rate (as a decimal, e.g., $6\% = 0.06$).

### Step 3: Required Retirement Corpus
To sustain withdrawals throughout retirement under inflation, we calculate the post-retirement **real rate of return** (adjusted for inflation):

$$r_{\text{real}} = \frac{1 + r_{\text{post}}}{1 + r_{\text{inf}}} - 1$$

Where:
*   $r_{\text{post}}$ = Expected return rate after retirement (as a decimal)
*   $r_{\text{inf}}$ = Expected annual inflation rate (as a decimal)

Convert the real rate to a monthly rate:
$$i_{\text{real}} = \frac{r_{\text{real}}}{12}$$

The **Retirement Corpus Needed** ($C$) is the present value of an ordinary annuity that provides the inflated monthly expense ($E_{\text{ret}}$) for $n_{\text{post}}$ months using the real interest rate:

$$C = E_{\text{ret}} \times \left[ \frac{1 - (1 + i_{\text{real}})^{-n_{\text{post}}}}{i_{\text{real}}} \right]$$

*(If $i_{\text{real}} = 0$, then $C = E_{\text{ret}} \times n_{\text{post}}$)*

### Step 4: Required Monthly SIP
The monthly SIP required over the pre-retirement phase ($N_{\text{pre}}$ years) at return rate $r_{\text{pre}}$ is computed by:

$$S = \frac{C}{\left[ \frac{(1 + i_{\text{pre}})^{N_{\text{pre}} \times 12} - 1}{i_{\text{pre}}} \right] \times (1 + i_{\text{pre}})}$$

Where $i_{\text{pre}} = r_{\text{pre}} / 12 / 100$.

---

## 4. Step-by-Step Walkthrough Example

Let's calculate the values for the default inputs:
*   **Current Age**: 30, **Retirement Age**: 60, **Life Expectancy**: 85
*   **Current Monthly Expense ($E_{\text{current}}$)**: ₹50,000
*   **Inflation ($r_{\text{inf}}$)**: 6% ($0.06$)
*   **Return till Retirement ($r_{\text{pre}}$)**: 12% ($i_{\text{pre}} = 0.01$ monthly)
*   **Return after Retirement ($r_{\text{post}}$)**: 7% ($0.07$)

1.  **Calculate Time Horizons**:
    *   $N_{\text{pre}} = 60 - 30 = 30$ years
    *   $N_{\text{post}} = 85 - 60 = 25$ years
    *   $n_{\text{post}} = 25 \times 12 = 300$ months

2.  **Calculate Monthly Expense at Retirement ($E_{\text{ret}}$)**:
    $$E_{\text{ret}} = 50,000 \times (1 + 0.06)^{30}$$
    $$E_{\text{ret}} = 50,000 \times 5.743491 \approx \text{₹}2,87,174.56$$

3.  **Calculate Real Post-Retirement Return & Corpus ($C$)**:
    *   Real annual return:
        $$r_{\text{real}} = \frac{1.07}{1.06} - 1 \approx 0.00943396 \text{ (or 0.943396%)}$$
    *   Monthly real rate:
        $$i_{\text{real}} = \frac{0.00943396}{12} \approx 0.000786163$$
    *   Calculate required corpus ($C$):
        $$C = 287,174.56 \times \left[ \frac{1 - (1 + 0.000786163)^{-300}}{0.000786163} \right]$$
        $$C = 287,174.56 \times \left[ \frac{1 - 0.790061}{0.000786163} \right]$$
        $$C = 287,174.56 \times 267.0423 \approx \text{₹}7,66,82,608$$

4.  **Calculate Required Monthly SIP ($S$)**:
    *   $n_{\text{pre}} = 30 \times 12 = 360$ months
    *   SIP Rate factor:
        $$\text{Annuity factor} = \left[ \frac{(1.01)^{360} - 1}{0.01} \right] \times 1.01 \approx 3494.964 \times 1.01 \approx 3529.914$$
    *   Compute $S$:
        $$S = \frac{76,682,608}{3529.914} \approx \text{₹}21,723.64$$

**Display Results:**
*   **Monthly expense at retirement**: `₹2,87,175`
*   **Retirement corpus needed**: `₹7,66,82,608`
*   **Monthly SIP required now**: `₹21,724`
