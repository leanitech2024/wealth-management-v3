import { CompoundInterestCalculatorValues } from '@/lib/zod.schemas';
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

export const CompoundInterestCalculationEmail = (
  props: (CompoundInterestCalculatorValues | Record<string, any>) & {
    phone?: string;
  },
) => {
  const {
    name,
    principalAmount,
    interestRate,
    investmentPeriod,
    interval,
    maturityAmount,
    totalInterest,
    phone,
  } = props as any;

  const P = Number(principalAmount) || 0;
  const r = Number(interestRate) || 0;
  const Y = Number(investmentPeriod) || 0;
  const freq = interval || 'Annually';

  const n =
    freq === 'Monthly'
      ? 12
      : freq === 'Quarterly'
      ? 4
      : freq === 'Half-Yearly'
      ? 2
      : 1;

  const calculatedMaturity =
    maturityAmount || (P > 0 && Y > 0 ? P * Math.pow(1 + r / 100 / n, n * Y) : P);
  const calculatedInterest =
    totalInterest || Math.max(0, calculatedMaturity - P);

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your Compound Interest projection from Ascent Wealth is ready.
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
                Hello {name || 'Investor'},
              </Heading>

              <Text className='text-muted-foreground text-base leading-7 mb-6'>
                Thank you for using the{' '}
                <strong className={'text-primary'}>
                  Ascent Wealth Compound Interest Calculator
                </strong>
                . We&apos;ve received your parameters and generated your exponential compounding growth projection:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-2 text-sm uppercase tracking-wide'>
                  Compounding Growth Summary
                </Text>
                <div>
                  {phone && (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Phone Number:{' '}
                      <strong className={'text-background'}>{phone}</strong>
                    </Text>
                  )}
                  <Text className='mb-px text-muted-background text-sm'>
                    • Principal Amount:{' '}
                    <strong className={'text-background'}>
                      ₹{P.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Annual Interest Rate:{' '}
                    <strong className={'text-background'}>
                      {r}% p.a.
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Time Horizon:{' '}
                    <strong className={'text-background'}>
                      {Y} Years
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Compounding Frequency:{' '}
                    <strong className={'text-background'}>
                      {freq} ({n}x / year)
                    </strong>
                  </Text>
                  <Hr className='border-accent-foreground/20 my-3' />
                  <Text className='mb-px text-muted-background text-sm'>
                    • Compound Interest Earned:{' '}
                    <strong className={'text-background text-base'}>
                      ₹{Math.round(calculatedInterest).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mt-2 text-primary font-bold text-base'>
                    • Projected Total Maturity:{' '}
                    <strong className={'text-primary text-lg'}>
                      ₹{Math.round(calculatedMaturity).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                Compounding accelerates over longer durations. One of our senior wealth managers will reach out within 24 hours to provide a comprehensive analysis of growth strategies and tax-efficient portfolio allocation.
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
                This illustration and returns assumed are based on compound growth formulas. Mutual fund investments are subject to market risks. Do read all scheme-related documents carefully.
              </Text>

              <Text className='text-muted-foreground text-xs font-medium mt-2'>
                Report Date : {new Date().toLocaleDateString('en-GB')}
              </Text>
            </Section>

            <Section className='bg-muted px-8 py-6 border-t border-solid border-primary'>
              <Text className='text-muted-foreground text-[11px] leading-5 m-0'>
                The chart and projections are for illustration purposes only. Figures are approximate. Returns are neither indicative nor guaranteed.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

CompoundInterestCalculationEmail.PreviewProps = {
  name: 'Jane Doe',
  principalAmount: '100000',
  interestRate: 10,
  investmentPeriod: 5,
  interval: 'Annually',
  maturityAmount: 161051,
  totalInterest: 61051,
};

export default CompoundInterestCalculationEmail;
