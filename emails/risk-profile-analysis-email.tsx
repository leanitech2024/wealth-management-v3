import { RiskProfileFormValues } from '@/lib/zod.schemas';
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

export const RiskProfileAnalysisEmail = (props: RiskProfileFormValues) => {
  const {
    firstName,
    lastName,
    // email,
    // mobile,
    // age,
    // employmentStatus,
    // householdIncome,
    // incomeStatus,
    // liquidNetWorth,
    // loanStatus,
    // knowledgeAboutInvestments,
    investmentObjective,
    investmentDuration,
    // investedInstrument,
    // investmentPlansRange,
    investmentRisk,
    marketMovement,
    // riskProfile,
    // agreeToTerms,
  } = props;

  const fullName = `${firstName} ${lastName}`;

  // Helper to format strings nicely
  // const formatValue = (value: string) =>
  //   value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Thank you for completing your Risk Profile with Ascent Wealth,{' '}
            {fullName}.
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
                Hello {fullName},
              </Heading>

              <Text className='text-muted-foreground text-base leading-7 mb-6'>
                Thank you for completing your{' '}
                <strong className={'text-primary'}>
                  Risk Profile Analysis
                </strong>
                . Understanding your appetite for risk is the first crucial step
                in building a resilient and profitable financial portfolio.
              </Text>

              <Section className='bg-accent p-6 mb-8 border border-solid border-accent-foreground/50'>
                <Text className='m-0 text-primary font-semibold mb-3 text-sm uppercase tracking-wide'>
                  Your Risk Profile Summary
                </Text>
                <div className=''>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Investment Objective:{' '}
                    <strong className={'text-background'}>
                      {investmentObjective}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Investment Duration:{' '}
                    <strong className={'text-background'}>
                      {investmentDuration}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • When markets move:{' '}
                    <strong className={'text-background'}>
                      {marketMovement}
                    </strong>
                  </Text>
                  <Text className='mb-px text-muted-background text-sm'>
                    • Your Risk Style:{' '}
                    <strong className={'text-background'}>
                      {investmentRisk.split(':')[0]}
                    </strong>
                  </Text>
                </div>
              </Section>

              <Text className='text-muted-foreground text-base leading-7 mb-8'>
                Our CERTIFIED FINANCIAL PLANNER™ professionals are now reviewing
                your profile to construct a bespoke asset allocation strategy.
                We will contact you within 24 business hours to share your
                results and outline the path forward.
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

RiskProfileAnalysisEmail.PreviewProps = {
  firstName: `John`,
  lastName: `Doe`,
  email: 'someone@gmail.com',
  mobile: '+1234567890',
  age: '20-30',
  employmentStatus: 'Employee', //"Self-Employed" | "Employee" | "Retired" | "Student" | "Home Maker" | "Others";

  householdIncome: 'Less than Rs.10 Lacs', // "Less than Rs.10 Lacs" | "Rs.10 Lacs - Rs.20 Lacs" | "Rs.20Lacs - Rs.50 Lacs" | "More than Rs.50 Lacs";

  incomeStatus: 'Somewhat stable', // "Unstable" | "Somewhat stable" | "Reasonably stable";

  liquidNetWorth: 'Upto Rs. 5 Lacs', // "Your liquid net worth is defined as the sum of (a) your investment assets (including balances with bank and investments but exclude your home and businesses that you own) minus - (b) your total of any loans that you have" | "Upto Rs. 5 Lacs" | "Rs. 5 Lacs - Rs. 25 Lacs" | "Rs. 25 Lacs - Rs. 1 Crore" | "Rs. 1 Crore and above";

  loanStatus: 'I have no loans outstanding', // "I am comfortable with my loan / EMI" | "I am little uncomfortable with my loan / EMI" | "I have no loans outstanding";

  knowledgeAboutInvestments: 'Strongly agree', // "Disagree" | "Somewhat agree" | "Strongly agree";

  investmentObjective: 'Maximise long-term investment returns', // "Maximise long-term investment returns" | "Balance risk and return" | "Protect the value of my investment";

  investmentDuration: 'More than 5 years', // "Less than 3 to 5 years" | "More than 5 years" | "No definable time horizon";

  investedInstrument: 'Life / Health / General Insurance', // "Bank Fixed Deposits/ Bonds / NCDs" | "Life / Health / General Insurance" | "Mutual Funds" | "Equity / PMS / MLDs";

  investmentPlansRange: '8.00%, 12.00%, -4.00%', // "12.00%, 25.00%, -18.00%" | "10.00%, 15.00%, -7.00%" | "8.00%, 12.00%, -4.00%" | "6.00%, 8.00%, -1.00%";

  investmentRisk:
    'Moderate: Over short-term investment horizon, I can only risk upto 10% of my capital.', //"Conservative: I do not want to risk any capital or have any negative return, even if it is temporary." | "Moderate: Over short-term investment horizon, I can only risk upto 10% of my capital." | "Situational: I don't want risk on my short term investments. However, I am willing to take higher risk for my long term investments." | "Aggressive: I can risk more than 25% of my capital for potentially higher returns.";

  marketMovement: 'I will invest more during such period.', //"I will sell the investments immediately." | "I will remain invested till the markets turn favourable." | "I will invest more during such period.";

  riskProfile: 'Should be treated the same as me.', //"Should be treated the same as me." | "If any different, I will discus with you at the time of investment." | "Will be different for every member.";
  agreeToTerms: true,
} as RiskProfileFormValues;

export default RiskProfileAnalysisEmail;
