declare type Calculators =
  | 'education-form'
  | 'lumpsum-form'
  | 'sip-form'
  | 'retirement-form'
  | 'goal-planner-form'
  | 'inflation-form'
  | 'emi-form'
  | 'compound-interest-form';

declare type EmailType =
  | `calc-${Calculators}`
  | 'risk-profile-form'
  | 'consultation-form';

declare type SessionKey =
  | Calculators
  | 'risk-profile-form'
  | 'consultation-form';
