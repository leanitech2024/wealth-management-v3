import { InflationCalculatorValues } from '@/lib/zod.schemas';
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

export const InflationCalculationEmail = (props: InflationCalculatorValues) => {
  const { name, currentAmount, inflationRate, yearsFromNow } = props;

  const P = Number(currentAmount);
  const r = Number(inflationRate) / 100;
  const n = Number(yearsFromNow);

  // Future Inflated Equivalent Cost
  const futureValue = P * Math.pow(1 + r, n);

  // Future Purchasing Power
  const purchasingPower = P / Math.pow(1 + r, n);

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your Inflation Analysis from Ascent Wealth is ready.
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
                  Ascent Wealth Inflation Calculator
                </strong>
                . Understanding how inflation erodes your money is the first step in protecting your purchasing power. Here is your personalized analysis:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-3 text-sm uppercase tracking-wide'>
                  Your Inflation Analysis Snapshot
                </Text>
                <div>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Base Current Amount:{' '}
                    <strong className='text-background text-base'>
                      ₹{P.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Inflation Rate:{' '}
                    <strong className='text-background'>
                      {inflationRate}% p.a.
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Projection Duration:{' '}
                    <strong className='text-background'>
                      {n} Years
                    </strong>
                  </Text>
                  <Hr className='border-accent-foreground/20 my-3' />
                  <Text className='mb-px text-muted-background text-sm'>
                    • Future Inflated Equivalent Cost:{' '}
                    <strong className='text-primary text-lg'>
                      ₹{Math.round(futureValue).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Purchasing Power of today's amount in the future:{' '}
                    <strong className='text-background text-base'>
                      ₹{Math.round(purchasingPower).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                In {n} years, a basket of goods costing ₹{P.toLocaleString('en-IN')} today will cost ₹{Math.round(futureValue).toLocaleString('en-IN')} due to an annual inflation of {inflationRate}%. To beat inflation and maintain your lifestyle, your portfolio needs to grow faster than the inflation rate. One of our wealth management advisors will reach out to you within 24-48 business hours to help structure inflation-beating investments.
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
                Ready to protect your savings? Reply to this email or visit{' '}
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
                Inflation Calculator.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

InflationCalculationEmail.PreviewProps = {
  name: 'John Doe',
  currentAmount: '100000',
  inflationRate: 6,
  yearsFromNow: 20,
} as InflationCalculatorValues;

export default InflationCalculationEmail;
