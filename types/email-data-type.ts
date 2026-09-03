import {
  ConsultationFormValues,
  EducationCalculatorValues,
  LumpSumCalculatorValues,
  RetirementCalculatorValues,
  RiskProfileFormValues,
  SIPCalculatorValues,
  GoalPlannerCalculatorValues,
  InflationCalculatorValues,
  EmiCalculatorValues,
  CompoundInterestCalculatorValues,
} from '@/lib/zod.schemas';

export type EmailData =
  | RiskProfileFormValues
  | EducationCalculatorValues
  | LumpSumCalculatorValues
  | SIPCalculatorValues
  | RetirementCalculatorValues
  | GoalPlannerCalculatorValues
  | InflationCalculatorValues
  | EmiCalculatorValues
  | CompoundInterestCalculatorValues
  | ConsultationFormValues;
