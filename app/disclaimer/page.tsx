import type { Metadata } from 'next';
import Banner from '@/components/shared/banner';
import { CTABlock } from '@/components/shared/cta-block';

export const metadata: Metadata = {
  title: 'Disclaimer | Ascent Wealth',
  description: 'Disclaimer and general information for Ascent Wealth services, mutual fund distribution, and investment advisory regulations.',
};

export default function DisclaimerPage() {
  return (
    <main className='max-w-(--breakpoint-xl) mx-auto px-4 2xl:px-0 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16'>
      <Banner />
      <section className='max-w-4xl mx-auto py-8 md:py-12 px-4'>
        <div className='prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none space-y-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight mb-4'>Disclaimer</h1>
            <p className='text-muted-foreground leading-relaxed'>
              Welcome to <strong>Ascent Wealth</strong>. By accessing and using this website, you acknowledge that you
              have read, understood, and agreed to the terms outlined in this Disclaimer. If you do not
              agree with any part of these terms, we recommend discontinuing the use of this website.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>General Information</h2>
            <p className='text-muted-foreground leading-relaxed'>
              The information, opinions, articles, calculators, illustrations, and other materials available on
              this website are provided solely for general informational and educational purposes. They
              should not be interpreted as investment advice, tax advice, legal advice, financial planning
              advice, or a recommendation to buy, sell, or hold any financial product or security.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Investment decisions should always be made after carefully evaluating your financial
              objectives, risk appetite, investment horizon, and personal circumstances. We encourage
              investors to consult qualified financial, legal, or tax professionals before making any
              investment decisions.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Mutual Fund Distribution</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth is an <strong>AMFI Registered Mutual Fund Distributor (ARN Holder)</strong> and facilitates
              the distribution of mutual fund products offered by various Asset Management Companies
              (AMCs).
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Registration with the Association of Mutual Funds in India (AMFI) does not imply any
              assurance regarding investment performance, returns, or the quality of services provided.
              Ascent Wealth does not guarantee the accuracy, suitability, completeness, or future
              performance of any investment product featured on this website.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>No Investment Guarantee</h2>
            <p className='text-muted-foreground leading-relaxed'>
              All investments are subject to market risks. Past performance is not indicative of future results.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              The value of investments and the income generated from them may fluctuate depending on
              market conditions, economic factors, interest rates, regulatory changes, and other external
              events. Investors may receive more or less than their original investment amount.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Any examples, illustrations, return projections, financial calculators, or investment scenarios
              presented on this website are purely illustrative and should not be considered a promise or
              guarantee of future returns.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Accuracy of Information</h2>
            <p className='text-muted-foreground leading-relaxed'>
              While every effort is made to ensure the information published on this website is accurate
              and up to date, Ascent Wealth makes no representations or warranties, express or implied,
              regarding the completeness, reliability, accuracy, or timeliness of any content.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Information may change without prior notice due to updates from regulatory authorities,
              Asset Management Companies, or other third-party sources. Users are advised to independently
              verify all information before acting upon it.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Third-Party Content & External Links</h2>
            <p className='text-muted-foreground leading-relaxed'>
              This website may contain links to external websites, financial tools, or third-party resources
              for your convenience.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth has no control over the content, privacy practices, security, or availability of
              these third-party websites and accepts no responsibility for any information, products,
              services, or opinions offered through them.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              The inclusion of external links does not constitute an endorsement or recommendation by
              Ascent Wealth.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Intellectual Property</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Unless otherwise stated, all website content—including text, graphics, logos, branding
              elements, designs, downloadable resources, and educational materials—is the intellectual
              property of Ascent Wealth and is protected under applicable copyright and intellectual
              property laws.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              No material from this website may be copied, reproduced, modified, distributed, published,
              or commercially exploited without prior written permission from Ascent Wealth.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Limitation of Liability</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth shall not be liable for any direct, indirect, incidental, consequential, or special
              losses or damages arising from:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
              <li>Reliance on information available on this website.</li>
              <li>Investment decisions taken based on website content.</li>
              <li>Technical interruptions or website downtime.</li>
              <li>Errors, omissions, or inaccuracies in published information.</li>
              <li>Unauthorized access to website data.</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              Users access and use this website entirely at their own discretion and risk.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Regulatory Compliance</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth operates in accordance with the applicable guidelines issued by the Securities
              and Exchange Board of India (SEBI), the Association of Mutual Funds in India (AMFI), and
              other relevant regulatory authorities wherever applicable.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Nothing contained on this website should be construed as an offer or solicitation where such
              activities are restricted by law or regulation.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Changes to this Disclaimer</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth reserves the right to modify, revise, or update this Disclaimer at any time
              without prior notice. Users are encouraged to review this page periodically to stay informed
              of any changes.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Contact Us</h2>
            <p className='text-muted-foreground leading-relaxed'>
              If you have any questions regarding this Disclaimer or require additional information about
              our services, please contact us through the contact details provided on the Ascent Wealth
              website.
            </p>
          </div>

          <div className='border-l-4 border-amber-500 bg-amber-500/10 p-4 rounded-r-md mt-6'>
            <p className='text-amber-700 dark:text-amber-400 font-semibold text-sm'>
              Mutual Fund investments are subject to market risks. Please read all scheme-related
              documents carefully before investing.
            </p>
          </div>
        </div>
      </section>
      <CTABlock />
    </main>
  );
}
