import {
  ConsultationFormValues,
  EducationCalculatorValues,
  LumpSumCalculatorValues,
  RetirementCalculatorValues,
  RiskProfileFormValues,
  SIPCalculatorValues,
  CostOfDelayCalculatorValues,
  GoalPlannerCalculatorValues,
  InflationCalculatorValues,
  SIPStepUpCalculatorValues,
  SWPCalculatorValues,
} from '@/lib/zod.schemas';

export type EmailData =
  | RiskProfileFormValues
  | EducationCalculatorValues
  | LumpSumCalculatorValues
  | SIPCalculatorValues
  | RetirementCalculatorValues
  | CostOfDelayCalculatorValues
  | GoalPlannerCalculatorValues
  | InflationCalculatorValues
  | SIPStepUpCalculatorValues
  | SWPCalculatorValues
  | ConsultationFormValues;
