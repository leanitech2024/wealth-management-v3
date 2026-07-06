import {
  ageGroups,
  consultationTypes,
  employmentStatuses,
  householdIncomes,
  incomeStatues,
  investedInstruments,
  investmentDurations,
  investmentObjectives,
  investmentPlansRanges,
  investmentRisks,
  knowledegsAboutInvestments,
  liquidNetWorths,
  loanStatuses,
  marketMovements,
  riskProfiles,
} from '@/constants';
import { z } from 'zod';

export const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name is too long'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name is too long'),
  email: z.email('Invalid email address'),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(500, 'Message is too long'),
  acceptTerms: z.boolean().optional(),
});

export const consultationSchema = z.object({
  fullName: z.string().min(2, 'Full name required'),
  email: z.email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  householdExpenses: z.string().min(1, 'Household expenses is required'),
  consultationType: z.enum(
    consultationTypes,
    'Please select a consultation type',
  ),
  specifyReason: z
    .string()
    .optional()
    .refine((val) => {
      if (val === undefined) return true;
      return val.length >= 2;
    }, 'Please specify the reason'),
  age: z.string().min(1, 'Age is required'),
  spouseAge: z.string().min(1, 'Spouse age is required'),
  firstChildAge: z.string().min(1, 'First child age is required'),
  secondChildAge: z.string().min(1, 'Second child age is required'),
  isTermInsurance: z.string().min(1, 'Please select an option'),
  isHealthInsurance: z.string().min(1, 'Please select an option'),
  consent: z
    .boolean('You must agree to the terms and conditions')
    .refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
});

// Calculator schemas
export const commonCalculatorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  childName: z.string().min(1, 'Child name is required'),
  childAge: z
    .float32()
    .min(1, 'Child age is required')
    .max(50, 'Child age must be at most 50'),

  inflationRate: z
    .float32()
    .min(4, 'Inflation rate must be between 4% and 20%')
    .max(20, 'Inflation rate must be between 4% and 20%'),
  existingInvestmentRate: z
    .float32()
    .min(2, 'Investment rate must be at least 2%')
    .max(13, 'Investment rate must be at most 13%'),
  newInvestmentRate: z
    .float32()
    .min(2, 'Investment rate must be at least 2%')
    .max(13, 'Investment rate must be at most 13%'),

  currentCost: z.string().min(1, 'Current cost is required'),
  currentInvestment: z.string().min(1, 'Current investment is required'),
});

export const educationSchema = commonCalculatorSchema.extend({
  higherEducationAge: z
    .float32()
    .min(18, 'Higher education age must be at least 18')
    .max(50, 'Higher education age must be at most 50'),
});

export const lumpSumSchema = commonCalculatorSchema
  .pick({ name: true })
  .extend({
    investmentAmount: z.string().min(1, 'Investment amount is required'),
    noOfYears: z
      .float32()
      .min(1, 'Number of years is required')
      .max(50, 'Number of years must be at most 50'),
    expectedReturn: z
      .float32()
      .min(2, 'Expected return must be at least 2%')
      .max(13, 'Expected return must be at most 13%'),
  });

export const sipSchema = commonCalculatorSchema
  .pick({ name: true })
  .extend(lumpSumSchema.shape)
  .extend({ sipAmount: z.string().min(1, 'SIP amount is required') })
  .omit({ investmentAmount: true });

export const retirementSchema = commonCalculatorSchema
  .pick({ name: true, inflationRate: true })
  .extend({
    currentMonthlyExpenses: z
      .string()
      .min(1, 'Current monthly expenses is required'),
    existingInvestment: z.string().min(1, 'Existing investment is required'),
    currentAge: z
      .float32()
      .min(1, 'Current age is required')
      .max(100, 'Current age must be at most 100'),
    retirementAge: z
      .float32()
      .min(18, 'Retirement age must be at least 18')
      .max(100, 'Retirement age must be at most 100'),
    lifeExpectancy: z
      .float32()
      .min(18, 'Life expectancy must be at least 18')
      .max(80, 'Life expectancy must be at most 80'),
    postRetirementInflationRate: z
      .float32()
      .min(4, 'Post-retirement inflation rate must be between 4% and 20%')
      .max(20, 'Post-retirement inflation rate must be between 4% and 20%'),
    postRetirementRiskFreeRate: z
      .float32()
      .min(2, 'Post-retirement risk-free rate must be at least 2%')
      .max(13, 'Post-retirement risk-free rate must be at most 13%'),
    returnOnExistingInvestment: z
      .float32()
      .min(2, 'Return on existing investment must be at least 2%')
      .max(13, 'Return on existing investment must be at most 13%'),
    returnOnNewInvestment: z
      .float32()
      .min(2, 'Return on new investment must be at least 2%')
      .max(13, 'Return on new investment must be at most 13%'),
  });

export const weddingSchema = commonCalculatorSchema
  .omit({ newInvestmentRate: true })
  .extend({
    marriageAge: z
      .float32()
      .min(21, 'Marriage age must be at least 21')
      .max(50, 'Marriage age must be at most 50'),
    returnOnNewInvestment: z
      .float32()
      .min(2, 'Return on new investment must be at least 2%')
      .max(13, 'Return on new investment must be at most 13%'),
  });

export const vacationSchema = commonCalculatorSchema
  .omit({ childAge: true })
  .extend({
    afterHowManyYears: z
      .float32()
      .min(1, 'After how many years is required')
      .max(30, 'After how many years must be at most 30'),
  });

export const emailFormSchema = z.object({
  email: z.email('Invalid email address'),
});

export const riskProfileSchema = contactFormSchema
  .pick({
    firstName: true,
    lastName: true,
    email: true,
  })
  .extend({
    mobile: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid mobile number')
      .min(10, 'Invalid mobile number'),
    age: z.enum(ageGroups, 'Invalid age group'),
    employmentStatus: z.enum(employmentStatuses, 'Invalid employment status'),
    householdIncome: z.enum(householdIncomes, 'Invalid household income'),
    incomeStatus: z.enum(incomeStatues, 'Invalid income status'),
    liquidNetWorth: z.enum(liquidNetWorths, 'Invalid liquid net worth'),
    loanStatus: z.enum(loanStatuses, 'Invalid loan status'),
    knowledgeAboutInvestments: z.enum(
      knowledegsAboutInvestments,
      'Invalid knowledge about investments',
    ),
    investmentObjective: z.enum(
      investmentObjectives,
      'Invalid investment objective',
    ),
    investmentDuration: z.enum(
      investmentDurations,
      'Invalid investment duration',
    ),
    investedInstrument: z.enum(
      investedInstruments,
      'Invalid invested instruments',
    ),
    investmentPlansRange: z.enum(
      investmentPlansRanges,
      'Invalid investment plans range',
    ),
    investmentRisk: z.enum(investmentRisks, 'Invalid investment risk'),
    marketMovement: z.enum(marketMovements, 'Invalid market movement'),
    riskProfile: z.enum(riskProfiles, 'Invalid risk profile'),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the terms and conditions',
    }),
  });

export type RiskProfileFormValues = z.infer<typeof riskProfileSchema>;

export type CommonCalculatorValues = z.infer<typeof commonCalculatorSchema>;

export type EducationCalculatorValues = z.infer<typeof educationSchema>;
export type LumpSumCalculatorValues = z.infer<typeof lumpSumSchema>;
export type SIPCalculatorValues = z.infer<typeof sipSchema>;
export type RetirementCalculatorValues = z.infer<typeof retirementSchema>;
export type WeddingCalculatorValues = z.infer<typeof weddingSchema>;
export type VacationCalculatorValues = z.infer<typeof vacationSchema>;

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ConsultationFormValues = z.infer<typeof consultationSchema>;

export type EmailFormValues = z.infer<typeof emailFormSchema>;
