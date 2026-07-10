import { SWPCalculatorValues } from '@/lib/zod.schemas';
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

export const SWPCalculationEmail = (props: SWPCalculatorValues) => {
  const { name, totalCorpus, monthlyWithdrawal, expectedReturn, projectionPeriod } = props;

  const B0 = Number(totalCorpus);
  const W = Number(monthlyWithdrawal);
  const r = Number(expectedReturn);
  const Y = Number(projectionPeriod);

  const i = r / 100 / 12;
  let bal = B0;
  let monthsCount = 0;
  const totalMonths = Y * 12;

  while (bal > 0 && monthsCount < totalMonths) {
    bal = bal * (1 + i) - W;
    monthsCount++;
  }

  const finalBalance = Math.max(0, bal);
  const totalWithdrawn = W * monthsCount;
  
  const interestEarnedFirstMonth = B0 * i;
  const neverDepletes = interestEarnedFirstMonth >= W;

  const lastsText = neverDepletes 
    ? "Never depletes (growing corpus)" 
    : `${Math.floor(monthsCount / 12)} years and ${monthsCount % 12} months`;

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your SWP Cash Flow Analysis from Ascent Wealth is ready.
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
                  Ascent Wealth SWP Calculator
                </strong>
                . Systematic Withdrawal Plans are an excellent way to generate regular retirement income from your accumulated wealth. Here is your projection:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-3 text-sm uppercase tracking-wide'>
                  Your SWP Projection Snapshot
                </Text>
                <div>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Initial Corpus:{' '}
                    <strong className='text-background text-base'>
                      ₹{B0.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Monthly Withdrawal:{' '}
                    <strong className='text-background'>
                      ₹{W.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Expected Return Rate:{' '}
                    <strong className='text-background'>
                      {r}% p.a.
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Projection Period:{' '}
                    <strong className='text-background'>
                      {Y} Years
                    </strong>
                  </Text>
                  <Hr className='border-accent-foreground/20 my-3' />
                  <Text className='mb-px text-muted-background text-sm'>
                    • How long corpus lasts:{' '}
                    <strong className='text-primary text-base'>
                      {lastsText}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Total Amount Withdrawn:{' '}
                    <strong className='text-background'>
                      ₹{Math.round(totalWithdrawn).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Remaining Corpus Balance:{' '}
                    <strong className='text-background'>
                      ₹{Math.round(finalBalance).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                By withdrawing ₹{W.toLocaleString('en-IN')} monthly, your corpus will last {lastsText}. One of our retirement planning advisors will contact you within 24-48 business hours to help you implement a tax-efficient SWP portfolio that maximizes your monthly payouts.
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

              <Text className='text-muted-foreground text-sm leading-6'>
                Ready to secure your retirement income? Reply to this email or visit{' '}
                <Link className='text-[#556cd6]' href='https://ascentwealth.in'>
                  Ascent Wealth
                </Link>{' '}
                to get started.
              </Text>

              <Text className='text-background font-semibold text-base mt-8'>
                To your future prosperity,
                <br />
                The Ascent Wealth Team
              </Text>
            </Section>

            <Section className='bg-muted px-8 py-6 border-t border-solid border-primary'>
              <Text className='text-muted-foreground text-[12px] leading-5 m-0'>
                <strong>Our Office:</strong> Appasamy City Square, Rajiv Gandhi
                Salai, OMR Service Rd, Kandhanchavadi, Chennai, Tamil Nadu
                600097
              </Text>
              <Text className='text-muted-foreground text-[11px] mt-2'>
                This email was sent following your request on the Ascent Wealth
                SWP Calculator.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

SWPCalculationEmail.PreviewProps = {
  name: 'John Doe',
  totalCorpus: '5000000',
  monthlyWithdrawal: '30000',
  expectedReturn: 8,
  projectionPeriod: 20,
} as SWPCalculatorValues;

export default SWPCalculationEmail;
