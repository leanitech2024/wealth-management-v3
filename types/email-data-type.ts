import {
  ConsultationFormValues,
  EducationCalculatorValues,
  LumpSumCalculatorValues,
  RetirementCalculatorValues,
  RiskProfileFormValues,
  SIPCalculatorValues,
  VacationCalculatorValues,
  WeddingCalculatorValues,
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
  | WeddingCalculatorValues
  | VacationCalculatorValues
  | CostOfDelayCalculatorValues
  | GoalPlannerCalculatorValues
  | InflationCalculatorValues
  | SIPStepUpCalculatorValues
  | SWPCalculatorValues
  | ConsultationFormValues;
