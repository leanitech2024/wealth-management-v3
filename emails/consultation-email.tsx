import { ConsultationFormValues } from '@/lib/zod.schemas';
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

export const ConsultationEmail = (props: ConsultationFormValues) => {
  const {
    fullName,
    // email,
    // phone,
    // householdExpenses,
    consultationType,
    // age,
    // spouseAge,
    // firstChildAge,
    // secondChildAge,
    // isTermInsurance,
    // isHealthInsurance,
    // consent,
    // specifyReason,
  } = props;

  const displayConsultation = consultationType
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Html>
      <Head />
      <Tailwind config={tailwindConfig}>
        <Body className='bg-foreground font-sans py-10'>
          <Preview>
            Thank you for reaching out to Ascent Wealth, {fullName}.
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
                Thank you for choosing{' '}
                <strong className={'text-primary'}>Ascent Wealth</strong> for
                your {displayConsultation} consultation. We have received your
                details and our expert advisors are currently reviewing your
                profile to provide the best financial roadmap for your goals.
              </Text>

              <Section className='bg-accent p-6 mb-8'>
                <Text className='m-0 text-primary font-semibold mb-2'>
                  What happens next?
                </Text>
                <Text className='m-0 text-muted-foreground text-sm leading-6'>
                  One of our wealth managers will contact you within 24-48
                  business hours to discuss your household financial strategy
                  and insurance requirements.
                </Text>
              </Section>

              <Section className='text-center mb-8'>
                <Button
                  className='bg-primary text-white text-sm font-semibold text-center inline-block px-6 py-3 mr-2 mb-2'
                  href='https://res.cloudinary.com/dxgckfhti/image/upload/v1768296504/Ascent_Wealth_Brochure_qphbv7.pdf'>
                  Download Brochure
                </Button>
                <Button
                  className='bg-transparent border border-solid border-primary text-muted-foreground text-sm font-semibold text-center inline-block px-6 py-3 mb-2'
                  href='https://res.cloudinary.com/dxgckfhti/image/upload/v1768549237/business-location_x7pl9i.avif'>
                  View Office Location
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

ConsultationEmail.PreviewProps = {
  fullName: 'John Doe',
  email: 'someone@example.com',
  phone: '1234567890',
  householdExpenses: '5000',
  consultationType: 'dream-vacation',
  specifyReason: `Planning for a dream vacation to Europe next summer.`,
  age: `30`,
  spouseAge: `28`,
  firstChildAge: `5`,
  secondChildAge: `3`,
  isTermInsurance: 'N/a',
  isHealthInsurance: 'N/a',
  consent: false,
} as ConsultationFormValues;

export default ConsultationEmail;
