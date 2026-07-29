import { RetirementCalculatorValues } from '@/lib/zod.schemas';
import tailwindConfig from '@/tailwind.config';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export const RetirementCalculationEmail = (
  props: RetirementCalculatorValues & { phone?: string },
) => {
  const {
    name,
    inflationRate,
    currentMonthlyExpenses,
    existingInvestment,
    currentAge,
    retirementAge,
    lifeExpectancy,
    phone,
    postRetirementInflationRate,
    postRetirementRiskFreeRate,
    returnOnExistingInvestment,
    returnOnNewInvestment,
  } = props;

  const yearsToRetirement = Math.max(1, retirementAge - currentAge);
  const retirementDuration = Math.max(1, lifeExpectancy - retirementAge);

  const E0 = Number(currentMonthlyExpenses);
  const I0 = Number(existingInvestment);
  const infPre = Number(inflationRate) / 100;
  const infPost = Number(postRetirementInflationRate) / 100;
  const rPost = Number(postRetirementRiskFreeRate) / 100;
  const rExist = Number(returnOnExistingInvestment) / 100;
  const rNew = Number(returnOnNewInvestment) / 100;

  // Monthly & Annual Expense at Retirement
  const monthlyExpenseAtRetirement = E0 * Math.pow(1 + infPre, yearsToRetirement);
  const annualExpenseAtRetirement = monthlyExpenseAtRetirement * 12;

  // Real Rate of Return Post Retirement
  const rReal = (1 + rPost) / (1 + infPost) - 1;

  // Target Corpus Needed at Retirement
  const targetCorpus = rReal === 0
    ? annualExpenseAtRetirement * retirementDuration
    : annualExpenseAtRetirement * ((1 - Math.pow(1 + rReal, -retirementDuration)) / rReal);

  // Future Value of Existing Investment at Retirement
  const futureExistingValue = I0 * Math.pow(1 + rExist, yearsToRetirement);

  // Net Corpus Shortfall Needed
  const shortfall = Math.max(0, targetCorpus - futureExistingValue);

  // Required Monthly SIP to bridge shortfall
  const iNew = rNew / 12;
  const nMonths = yearsToRetirement * 12;
  const requiredMonthlySip = iNew === 0 
    ? shortfall / nMonths 
    : shortfall / (((Math.pow(1 + iNew, nMonths) - 1) / iNew) * (1 + iNew));

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your personalized retirement roadmap from Ascent Wealth is ready.
          </Preview>
          <Container className='bg-white mx-auto border border-solid border-accent-foreground/50'>
            <Section className='px-8 py-10'>
              <div className={'w-48 mx-auto text-center'}>
                <Img
                  src={`https://res.cloudinary.com/dxgckfhti/image/upload/w_100/v1769003149/Logo-dark_uuxzvx.svg`}
                  width='100%'
                  height='100%'
                  alt='Ascent Wealth Logo'
                  className='mb-8'
                />
              </div>

              <Heading className='text-2xl font-bold text-backgroud leading-tight mb-4'>
                Hello {name},
              </Heading>

              <Text className='text-muted-foreground text-base leading-7 mb-6'>
                Thank you for using the{' '}
                <strong className={'text-primary'}>
                  Ascent Wealth Retirement Calculator
                </strong>
                . Planning for your golden years is the most significant
                financial gift you can give your future self. Here is your personalized retirement analysis:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-3 text-sm uppercase tracking-wide'>
                  Retirement Roadmap Snapshot
                </Text>
                <div>
                  {phone && (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Phone Number:{' '}
                      <strong className={'text-background'}>{phone}</strong>
                    </Text>
                  )}
                  <Text className='mb-px text-muted-background text-sm'>
                    • Timeline & Horizon:{' '}
                    <strong className={'text-background'}>
                      Age {currentAge} → {retirementAge} ({yearsToRetirement} years to save, {retirementDuration} years in retirement)
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Current Monthly Expenses:{' '}
                    <strong className={'text-background'}>
                      ₹{E0.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Estimated Monthly Expenses at Retirement:{' '}
                    <strong className={'text-background text-base'}>
                      ₹{Math.round(monthlyExpenseAtRetirement).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Hr className='border-accent-foreground/20 my-3' />
                  <Text className='mb-px text-muted-background text-sm'>
                    • Total Target Retirement Corpus Needed:{' '}
                    <strong className={'text-background text-base'}>
                      ₹{Math.round(targetCorpus).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Projected Value of Existing Savings ({returnOnExistingInvestment}% p.a.):{' '}
                    <strong className={'text-background'}>
                      ₹{Math.round(futureExistingValue).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Net Corpus Shortfall Needed:{' '}
                    <strong className={'text-background'}>
                      ₹{Math.round(shortfall).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mt-2 text-primary font-bold text-base'>
                    • Required Monthly SIP ({returnOnNewInvestment}% return):{' '}
                    <strong className={'text-primary text-lg'}>
                      ₹{Math.round(requiredMonthlySip).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                Our expert advisors are currently analyzing your
                inflation-adjusted requirements and expected returns to
                determine your ideal &quot;Retirement Corpus.&quot; We will
                contact you within 24-48 business hours to present a detailed
                strategy.
              </Text>

              <Section className='text-center mb-8'>
                <Button
                  className='bg-primary text-white text-sm font-semibold text-center inline-block px-8 py-3 mr-2 mb-2'
                  href='https://res.cloudinary.com/dxgckfhti/image/upload/v1768296504/Ascent_Wealth_Brochure_qphbv7.pdf'>
                  Download Wealth Brochure
                </Button>
                <Button
                  className='bg-transparent border border-solid border-primary text-muted-foreground text-sm font-semibold text-center inline-block px-8 py-3 mb-2'
                  href='https://res.cloudinary.com/dxgckfhti/image/upload/v1768549237/business-location_x7pl9i.avif'>
                  Our Office Location
                </Button>
              </Section>

              <Hr className='border-accent my-8' />

              <Text className='text-muted-foreground text-xs leading-5 italic mt-6'>
                This illustration and returns assumed are on the basis of the request made by you. These are neither indicative nor guaranteed returns. Mutual fund investments are subject to market risks. Do read all scheme-related documents carefully.
              </Text>

              <Text className='text-muted-foreground text-xs font-medium mt-2'>
                Report Date : {new Date().toLocaleDateString('en-GB')}
              </Text>
            </Section>

            <Section className='bg-muted px-8 py-6 border-t border-solid border-primary'>
              <Text className='text-muted-foreground text-[11px] leading-5 m-0'>
                The chart is for illustration purposes only. Figures are approximate and may not be linear as shown in the chart. The returns assumed above are as per your request. These are neither indicative nor guaranteed returns.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

RetirementCalculationEmail.PreviewProps = {
  name: 'John Doe',
  inflationRate: 5,
  currentMonthlyExpenses: '2000',
  existingInvestment: '50000',
  currentAge: 30,
  retirementAge: 60,
  lifeExpectancy: 85,
  postRetirementInflationRate: 6,
  postRetirementRiskFreeRate: 5,
  returnOnExistingInvestment: 7,
  returnOnNewInvestment: 8,
} as RetirementCalculatorValues;

export default RetirementCalculationEmail;
