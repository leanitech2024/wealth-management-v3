import { EmiCalculatorValues } from '@/lib/zod.schemas';
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

export const EmiCalculationEmail = (
  props: (EmiCalculatorValues | Record<string, any>) & { phone?: string },
) => {
  const {
    name,
    loanAmount,
    interestRate,
    tenureYears,
    monthlyEmi,
    totalInterest,
    totalPayable,
    phone,
  } = props as any;

  const P = Number(loanAmount) || 0;
  const r = Number(interestRate) || 0;
  const Y = Number(tenureYears) || 0;

  // Calculate if not passed directly
  const monthlyRate = r / 1200;
  const totalMonths = Y * 12;
  const emiCalc =
    monthlyEmi ||
    (monthlyRate > 0 && totalMonths > 0
      ? Math.round(
          (P * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1),
        )
      : 0);

  const totalPayableCalc = totalPayable || emiCalc * totalMonths;
  const totalInterestCalc = totalInterest || Math.max(0, totalPayableCalc - P);

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your Loan EMI & Repayment Schedule from Ascent Wealth is ready.
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
                  Ascent Wealth EMI Calculator
                </strong>
                . We&apos;ve received your loan parameters and generated your personalized EMI & interest analysis:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-2 text-sm uppercase tracking-wide'>
                  Loan & EMI Summary
                </Text>
                <div>
                  {phone && (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Phone Number:{' '}
                      <strong className={'text-background'}>{phone}</strong>
                    </Text>
                  )}
                  <Text className='mb-px text-muted-background text-sm'>
                    • Principal Loan Amount:{' '}
                    <strong className={'text-background'}>
                      ₹{P.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Interest Rate:{' '}
                    <strong className={'text-background'}>
                      {r}% p.a.
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Loan Tenure:{' '}
                    <strong className={'text-background'}>
                      {Y} Years ({totalMonths} Months)
                    </strong>
                  </Text>
                  <Hr className='border-accent-foreground/20 my-3' />
                  <Text className='mb-px text-muted-background text-sm'>
                    • Monthly EMI:{' '}
                    <strong className={'text-primary text-base'}>
                      ₹{Math.round(emiCalc).toLocaleString('en-IN')} / month
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Total Interest Payable:{' '}
                    <strong className={'text-background text-base'}>
                      ₹{Math.round(totalInterestCalc).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mt-2 text-primary font-bold text-base'>
                    • Total Amount Payable (Principal + Interest):{' '}
                    <strong className={'text-primary text-lg'}>
                      ₹{Math.round(totalPayableCalc).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                Proper debt management and structured prepayment strategies can significantly reduce your interest burden. One of our senior wealth managers will reach out within 24 hours to discuss smart financial planning.
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
                This illustration is based on standard reducing balance loan calculation methods. Actual loan terms, interest rates, and processing fees may vary based on lender policies.
              </Text>

              <Text className='text-muted-foreground text-xs font-medium mt-2'>
                Report Date : {new Date().toLocaleDateString('en-GB')}
              </Text>
            </Section>

            <Section className='bg-muted px-8 py-6 border-t border-solid border-primary'>
              <Text className='text-muted-foreground text-[11px] leading-5 m-0'>
                The figures and amortization breakdown provided are for planning purposes only. Mutual fund investments and financial products are subject to market risks. Do read all scheme-related documents carefully.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

EmiCalculationEmail.PreviewProps = {
  name: 'John Doe',
  loanAmount: '2500000',
  interestRate: 8.5,
  tenureYears: 20,
  monthlyEmi: 21696,
  totalInterest: 2707040,
  totalPayable: 5207040,
};

export default EmiCalculationEmail;
