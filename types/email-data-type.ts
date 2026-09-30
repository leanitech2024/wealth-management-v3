import {
  ConsultationFormValues,
  EducationCalculatorValues,
  LumpSumCalculatorValues,
  RetirementCalculatorValues,
  RiskProfileFormValues,
  SIPCalculatorValues,
  GoalPlannerCalculatorValues,
  InflationCalculatorValues,
  CompoundInterestCalculatorValues,
  SwpCalculatorValues,
  RegularIncomeCalculatorValues,
} from '@/lib/zod.schemas';

export type EmailData =
  | RiskProfileFormValues
  | EducationCalculatorValues
  | LumpSumCalculatorValues
  | SIPCalculatorValues
  | RetirementCalculatorValues
  | GoalPlannerCalculatorValues
  | InflationCalculatorValues
  | CompoundInterestCalculatorValues
  | SwpCalculatorValues
  | RegularIncomeCalculatorValues
  | ConsultationFormValues;
