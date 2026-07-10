declare type Calculators =
  | 'education-form'
  | 'lumpsum-form'
  | 'sip-form'
  | 'retirement-form'
  | 'wedding-form'
  | 'vacation-form'
  | 'cost-of-delay-form'
  | 'goal-planner-form'
  | 'inflation-form'
  | 'sip-step-up-form'
  | 'swp-form';

declare type EmailType =
  | `calc-${Calculators}`
  | 'risk-profile-form'
  | 'consultation-form';

declare type SessionKey =
  | Calculators
  | 'risk-profile-form'
  | 'consultation-form';
