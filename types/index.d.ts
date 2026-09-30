declare type Calculators =
  | 'education-form'
  | 'lumpsum-form'
  | 'sip-form'
  | 'retirement-form'
  | 'goal-planner-form'
  | 'inflation-form'
  | 'swp-form'
  | 'regular-income-form'
  | 'compound-interest-form';

declare type EmailType =
  | `calc-${Calculators}`
  | 'risk-profile-form'
  | 'consultation-form';

declare type SessionKey =
  | Calculators
  | 'risk-profile-form'
  | 'consultation-form';
