import { EducationCalculatorValues } from '@/lib/zod.schemas';
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

export const EducationCalculationEmail = (
  props: EducationCalculatorValues & { phone?: string },
) => {
  const {
    name,
    childName,
    childAge,
    phone,
    inflationRate,
    existingInvestmentRate,
    newInvestmentRate,
    currentCost,
    currentInvestment,
    higherEducationAge,
  } = props;

  const yearsToSave = higherEducationAge - childAge;
  const C0 = Number(currentCost);
  const I0 = Number(currentInvestment);
  const inf = Number(inflationRate) / 100;
  const rExist = Number(existingInvestmentRate) / 100;
  const rNew = Number(newInvestmentRate) / 100;

  // Future Inflated Education Cost
  const futureCost = C0 * Math.pow(1 + inf, yearsToSave);
  // Future Value of Existing Investments
  const futureExistingVal = I0 * Math.pow(1 + rExist, yearsToSave);
  // Net Shortfall needed
  const shortfall = Math.max(0, futureCost - futureExistingVal);
  // Required Monthly SIP for new investment
  const iNew = rNew / 12;
  const nMonths = yearsToSave * 12;
  const requiredSip = iNew === 0 
    ? shortfall / nMonths 
    : shortfall / (((Math.pow(1 + iNew, nMonths) - 1) / iNew) * (1 + iNew));

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Your Education Planning Results for {childName} are here.
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
                  Ascent Wealth Education Calculator
                </strong>
                . Planning for{' '}
                <strong className={'text-primary'}>{childName}&apos;s</strong>{' '}
                higher education is one of the most important financial
                milestones you will achieve. Here is your personalized education planning analysis:
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-3 text-sm uppercase tracking-wide'>
                  Education Goal Snapshot
                </Text>
                <div>
                  {phone && (
                    <Text className='mb-px text-muted-background text-sm'>
                      • Phone Number:{' '}
                      <strong className={'text-background'}>{phone}</strong>
                    </Text>
                  )}
                  <Text className='mb-px text-muted-background text-sm'>
                    • Child Name & Timeframe:{' '}
                    <strong className={'text-background'}>
                      {childName} (Age {childAge} → {higherEducationAge}, {yearsToSave} years to save)
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Current Education Cost:{' '}
                    <strong className={'text-background'}>
                      ₹{C0.toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Assumed Inflation Rate:{' '}
                    <strong className={'text-background'}>
                      {inflationRate}% p.a.
                    </strong>
                  </Text>
                  <Hr className='border-accent-foreground/20 my-3' />
                  <Text className='mb-px text-muted-background text-sm'>
                    • Future Inflated Education Cost:{' '}
                    <strong className={'text-background text-base'}>
                      ₹{Math.round(futureCost).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Growth of Existing Investment ({existingInvestmentRate}% p.a.):{' '}
                    <strong className={'text-background'}>
                      ₹{Math.round(futureExistingVal).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Net Corpus Shortfall Needed:{' '}
                    <strong className={'text-background'}>
                      ₹{Math.round(shortfall).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                  <Text className='mt-2 text-primary font-bold text-base'>
                    • Required Monthly SIP ({newInvestmentRate}% return):{' '}
                    <strong className={'text-primary text-lg'}>
                      ₹{Math.round(requiredSip).toLocaleString('en-IN')}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-6'>
                An expert wealth manager will reach out shortly to share your
                customized education funding strategy and help you bridge any
                investment gaps.
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

EducationCalculationEmail.PreviewProps = {
  name: `John Doe`,
  childName: `Jane Doe`,
  childAge: 2,
  inflationRate: 4,
  existingInvestmentRate: 5,
  newInvestmentRate: 6,
  currentCost: '100000',
  currentInvestment: '20000',
  higherEducationAge: 18,
} as EducationCalculatorValues;

export default EducationCalculationEmail;
