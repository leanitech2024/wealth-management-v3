import { RegularIncomeCalculatorValues } from '@/lib/zod.schemas';
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
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

export const RegularIncomeCalculationEmail = (
  props: RegularIncomeCalculatorValues & { phone?: string },
) => {
  const {
    name,
    sipAmount,
    lumpsumAmount,
    investmentPeriod,
    expectedReturnRate,
    waitingPeriod,
    expectedReturnInWithdrawal,
    withdrawalYears,
    monthlyWithdrawal,
    mode,
    phone,
  } = props;

  const SIP = Number(sipAmount);
  const Lumpsum = Number(lumpsumAmount);

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your Regular Income Investment roadmap from Ascent Wealth is ready.
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
                  Ascent Wealth Regular Income Calculator
                </strong>
                . Building a steady stream of passive income is key to financial independence. Here is your personalized Regular Income projection:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-3 text-sm uppercase tracking-wide'>
                  Your Investment Snapshot
                </Text>
                <div className=''>
                  {phone && (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Phone Number:{' '}
                      <strong className={'text-background'}>{phone}</strong>
                    </Text>
                  )}
                  <Text className='mb-px text-muted-background text-sm'>
                    • Monthly SIP:{' '}
                    <strong className={'text-background'}>
                      ₹{SIP.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Lumpsum Investment:{' '}
                    <strong className={'text-background'}>
                      ₹{Lumpsum.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Investment Period:{' '}
                    <strong className={'text-background'}>
                      {investmentPeriod} Years
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Expected Return (Accumulation):{' '}
                    <strong className={'text-background'}>
                      {expectedReturnRate}% p.a.
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Waiting Period:{' '}
                    <strong className={'text-background'}>
                      {waitingPeriod} Years
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Expected Return (Withdrawal):{' '}
                    <strong className={'text-background'}>
                      {expectedReturnInWithdrawal}% p.a.
                    </strong>
                  </Text>
                  {mode === 'NO_OF_YEARS' ? (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Desired Withdrawal Duration:{' '}
                      <strong className={'text-background'}>
                        {withdrawalYears} Years
                      </strong>
                    </Text>
                  ) : (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Desired Monthly Withdrawal:{' '}
                      <strong className={'text-background'}>
                        ₹{Number(monthlyWithdrawal).toLocaleString('en-IN')}
                      </strong>
                    </Text>
                  )}
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                Creating a reliable secondary income source requires the right mix of growth and income-generating assets. We will reach out to you within 24-48 business hours to help you optimize your portfolio.
              </Text>

              <Section className='text-center mb-8'>
                <Button
                  className='bg-primary text-white text-sm font-semibold text-center inline-block px-8 py-3 mr-2 mb-2'
                  href='https://res.cloudinary.com/dxgckfhti/image/upload/v1768296504/Ascent_Wealth_Brochure_qphbv7.pdf'>
                  Download Wealth Brochure
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
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

RegularIncomeCalculationEmail.PreviewProps = {
  name: 'John Doe',
  sipAmount: '10000',
  lumpsumAmount: '2500000',
  investmentPeriod: 20,
  expectedReturnRate: 12,
  waitingPeriod: 10,
  expectedReturnInWithdrawal: 5,
  withdrawalYears: 20,
  monthlyWithdrawal: '25000',
  mode: 'NO_OF_YEARS',
} as RegularIncomeCalculatorValues;

export default RegularIncomeCalculationEmail;
