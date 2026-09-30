import { SwpCalculatorValues } from '@/lib/zod.schemas';
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

export const SwpCalculationEmail = (
  props: SwpCalculatorValues & { phone?: string },
) => {
  const {
    name,
    totalInvestment,
    withdrawalPerMonth,
    expectedReturns,
    withdrawalPeriod,
    waitingPeriod,
    increaseRate,
    phone,
  } = props;

  const P = Number(totalInvestment);
  const W = Number(withdrawalPerMonth);

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your SWP Investment roadmap from Ascent Wealth is ready.
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
                  Ascent Wealth SWP Calculator
                </strong>
                . Planning your regular withdrawals is an excellent way to manage your cash flow while staying invested. Here is your personalized SWP projection:
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
                    • Total Investment:{' '}
                    <strong className={'text-background'}>
                      ₹{P.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Monthly Withdrawal:{' '}
                    <strong className={'text-background'}>
                      ₹{W.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Expected Returns:{' '}
                    <strong className={'text-background'}>
                      {expectedReturns}% p.a.
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Withdrawal Period:{' '}
                    <strong className={'text-background'}>
                      {withdrawalPeriod} Years
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Waiting Period:{' '}
                    <strong className={'text-background'}>
                      {waitingPeriod} Years
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Annual Increase Rate:{' '}
                    <strong className={'text-background'}>
                      {increaseRate}% p.a.
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                Our advisors can help you configure an SWP that best suits your cash flow requirements without depleting your corpus early. We will reach out to you within 24-48 business hours to help you optimize your portfolio.
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

SwpCalculationEmail.PreviewProps = {
  name: 'John Doe',
  totalInvestment: '5000000',
  withdrawalPerMonth: '25000',
  expectedReturns: 12,
  withdrawalPeriod: 10,
  waitingPeriod: 1,
  increaseRate: 5,
} as SwpCalculatorValues;

export default SwpCalculationEmail;
