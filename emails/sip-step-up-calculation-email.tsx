import { SIPStepUpCalculatorValues } from '@/lib/zod.schemas';
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

export const SIPStepUpCalculationEmail = (
  props: SIPStepUpCalculatorValues & { phone?: string },
) => {
  const { name, initialMonthlySip, annualStepUp, expectedReturn, timePeriod, phone } = props;

  const P = Number(initialMonthlySip);
  const s = Number(annualStepUp);
  const r = Number(expectedReturn);
  const Y = Number(timePeriod);

  const i = r / 100 / 12;
  let value = 0;
  let invested = 0;
  let cur = P;
  for (let y = 0; y < Y; y++) {
    for (let m = 0; m < 12; m++) {
      value = (value + cur) * (1 + i);
      invested += cur;
    }
    cur = cur * (1 + s / 100);
  }

  const returns = value - invested;

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your SIP Step-Up Investment roadmap from Ascent Wealth is ready.
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
                  Ascent Wealth SIP Step-Up Calculator
                </strong>
                . Stepping up your investments annually is a highly effective way to match salary increments and dramatically accelerate wealth creation. Here is your personalized analysis:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-3 text-sm uppercase tracking-wide'>
                  Your Investment Snapshot
                </Text>
                <div>
                  {phone && (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Phone Number:{' '}
                      <strong className='text-background'>{phone}</strong>
                    </Text>
                  )}
                  <Text className='mb-px text-muted-background text-sm'>
                    • Initial Monthly SIP:{' '}
                    <strong className='text-background'>
                      ₹{P.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Annual Step-Up Increment:{' '}
                    <strong className='text-background'>
                      {s}% every year
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Expected Return Rate:{' '}
                    <strong className='text-background'>
                      {r}% p.a.
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Total Duration:{' '}
                    <strong className='text-background'>
                      {Y} Years
                    </strong>
                  </Text>
                  <Hr className='border-accent-foreground/20 my-3' />
                  <Text className='mb-px text-muted-background text-sm'>
                    • Total Capital Invested:{' '}
                    <strong className='text-background'>
                      ₹{Math.round(invested).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Estimated Interest Growth:{' '}
                    <strong className='text-background text-base'>
                      ₹{Math.round(returns).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mt-2 text-primary font-bold text-base'>
                    • Future Value Maturity Amount:{' '}
                    <strong className='text-primary text-lg'>
                      ₹{Math.round(value).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                By increasing your SIP contribution by {s}% every year, you will invest a total of ₹{Math.round(invested).toLocaleString('en-IN')} and accumulate ₹{Math.round(value).toLocaleString('en-IN')} over {Y} years. One of our senior wealth advisors will reach out to you within 24-48 business hours to help you implement this incremental strategy.
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

SIPStepUpCalculationEmail.PreviewProps = {
  name: 'John Doe',
  initialMonthlySip: '10000',
  annualStepUp: 10,
  expectedReturn: 12,
  timePeriod: 20,
} as SIPStepUpCalculatorValues;

export default SIPStepUpCalculationEmail;
