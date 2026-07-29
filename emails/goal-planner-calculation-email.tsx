import { GoalPlannerCalculatorValues } from '@/lib/zod.schemas';
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

export const GoalPlannerCalculationEmail = (
  props: GoalPlannerCalculatorValues & { phone?: string },
) => {
  const { name, targetAmount, timePeriod, expectedReturn, phone } = props;

  const G = Number(targetAmount);
  const Y = Number(timePeriod);
  const r = Number(expectedReturn);

  const i = r / 100 / 12;
  const n = Y * 12;

  // Required Monthly SIP
  const requiredSip = i === 0 ? G / n : G / (((Math.pow(1 + i, n) - 1) / i) * (1 + i));
  const totalInvested = requiredSip * n;

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your Goal Planner Investment roadmap from Ascent Wealth is ready.
          </Preview>
          <Container className='bg-white mx-auto border border-solid border-accent-foreground/50'>
            <Section className='px-8 py-10'>
              <div className='w-48 mx-auto text-center'>
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
                <strong className='text-primary'>
                  Ascent Wealth Goal Planner
                </strong>
                . Setting clear targets is the key to successful investing. Here is the Systematic Investment Plan (SIP) roadmap to achieve your financial goal:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-3 text-sm uppercase tracking-wide'>
                  Your Goal Planning Snapshot
                </Text>
                <div>
                  {phone && (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Phone Number:{' '}
                      <strong className='text-background'>{phone}</strong>
                    </Text>
                  )}
                  <Text className='mb-px text-muted-background text-sm'>
                    • Target Goal Amount:{' '}
                    <strong className='text-background text-base'>
                      ₹{G.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Timeframe To Target:{' '}
                    <strong className='text-background'>
                      {Y} Years ({n} months)
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Expected Return:{' '}
                    <strong className='text-background'>
                      {r}% p.a.
                    </strong>
                  </Text>
                  <Hr className='border-accent-foreground/20 my-3' />
                  <Text className='mb-px text-muted-background text-sm'>
                    • Required Monthly SIP starting now:{' '}
                    <strong className='text-primary text-lg'>
                      ₹{Math.round(requiredSip).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Total Principal Invested:{' '}
                    <strong className='text-background'>
                      ₹{Math.round(totalInvested).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Wealth Gain / Growth:{' '}
                    <strong className='text-background'>
                      ₹{Math.round(G - totalInvested).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                By investing ₹{Math.round(requiredSip).toLocaleString('en-IN')} every month for {Y} years, you will accumulate ₹{G.toLocaleString('en-IN')} at an expected returns rate of {r}%. One of our wealth management professionals will contact you within 24-48 business hours to help you implement a tailored Mutual Fund portfolio that fits this profile.
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

GoalPlannerCalculationEmail.PreviewProps = {
  name: 'John Doe',
  targetAmount: '5000000',
  timePeriod: 10,
  expectedReturn: 12,
} as GoalPlannerCalculatorValues;

export default GoalPlannerCalculationEmail;
