import type { Metadata } from 'next';
import Banner from '@/components/shared/banner';
import { CTABlock } from '@/components/shared/cta-block';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const metadata: Metadata = {
  title: 'Disclosure | Ascent Wealth',
  description: 'Important disclosure information regarding Ascent Wealth status, role, compensation structure, and nature of services.',
};

export default function DisclosurePage() {
  return (
    <main className='max-w-(--breakpoint-xl) mx-auto px-4 2xl:px-0 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16'>
      <Banner />
      <section className='max-w-4xl mx-auto py-8 md:py-12 px-4'>
        <div className='prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none space-y-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight mb-4'>Disclosure</h1>
            <p className='text-muted-foreground leading-relaxed'>
              At <strong>Ascent Wealth</strong>, we are committed to conducting our business with the highest standards
              of transparency, integrity, and professionalism. This Disclosure outlines important
              information regarding our role, regulatory status, compensation structure, and the nature of
              the services we provide to help clients make informed investment decisions.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>About Ascent Wealth</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth is an <strong>AMFI Registered Mutual Fund Distributor (ARN Holder)</strong> offering
              investment distribution and wealth management solutions to individuals, families, and
              businesses. We facilitate access to a wide range of investment products from reputed
              financial institutions and Asset Management Companies (AMCs), helping investors build long-term
              wealth through disciplined and goal-oriented investing.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Our services include assistance across various investment and wealth management solutions,
              including:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Mutual Fund Investments</li>
              <li>Specialized Investment Funds (SIFs), where applicable</li>
              <li>Systematic Investment Plans (SIPs)</li>
              <li>Systematic Transfer Plans (STPs)</li>
              <li>Goal-Based Financial Planning</li>
              <li>Retirement Planning</li>
              <li>Children&apos;s Education Planning</li>
              <li>Tax-Saving Investments (ELSS)</li>
              <li>Portfolio Review & Monitoring</li>
              <li>Wealth Creation Strategies</li>
            </ul>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Nature of Services</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth acts as a distributor of financial products and facilitates investments offered
              by various product manufacturers and Asset Management Companies.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Our role includes assisting clients with product information, transaction facilitation,
              investment execution, portfolio reviews, service requests, and investor education.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Unless specifically stated otherwise, Ascent Wealth does <strong>not</strong> provide investment advisory
              services under the SEBI (Investment Advisers) Regulations. Investors are encouraged to
              independently assess the suitability of any investment based on their financial goals, risk
              tolerance, and investment horizon before making investment decisions.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Compensation & Commission Disclosure</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth may receive commissions, trail commissions, distribution fees, or other
              permissible remuneration from Asset Management Companies (AMCs) and product
              manufacturers for the distribution of financial products, in accordance with applicable
              regulations issued by the Securities and Exchange Board of India (SEBI), the Association of
              Mutual Funds in India (AMFI), and other relevant regulatory authorities.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              This may include compensation in relation to:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Mutual Fund Schemes</li>
              <li>Specialized Investment Funds (SIFs), where applicable</li>
              <li>Other financial products distributed by Ascent Wealth in accordance with prevailing regulatory guidelines</li>
            </ul>

            <p className='text-muted-foreground leading-relaxed font-semibold mt-6'>
              Commission Structure:
            </p>
            <p className='text-muted-foreground leading-relaxed text-sm'>
              In accordance with SEBI circular SEBI/IMD/CIR No. 4/168230/09 dated June 30, 2009, the commission details for various mutual fund scheme categories are as follows:
            </p>

            <div className='not-prose border border-border rounded-lg overflow-hidden my-6 bg-card'>
              <Table>
                <TableHeader>
                  <TableRow className='bg-muted/50 border-b border-border'>
                    <TableHead className='w-[60%] font-semibold text-foreground py-3 px-4'>SCHEME TYPE</TableHead>
                    <TableHead className='font-semibold text-foreground py-3 px-4'>TRAIL - 1ST YEAR ONWARDS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Liquid/Ultra Short Term Schemes</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.05% – 0.70%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Short Term Income Funds</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.50% – 0.90%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Income Funds</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.40% – 1.00%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Gilt Funds</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.15% – 0.90%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Hybrid Debt/Monthly Income Plans</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.90% – 1.20%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Arbitrage Funds</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.55% – 0.70%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Fund of Funds</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.25% – 0.50%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>ELSS</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.65% – 2.00%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Index Funds</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.30% – 1.00%</TableCell>
                  </TableRow>
                  <TableRow className='border-b border-border hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Equity/ Hybrid Equity/ Balance Funds</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>0.65% – 2.00%</TableCell>
                  </TableRow>
                  <TableRow className='border-0 hover:bg-muted/30'>
                    <TableCell className='py-3 px-4 font-medium text-foreground/90'>Fixed Maturity Plans</TableCell>
                    <TableCell className='py-3 px-4 text-foreground/80'>Variable</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <p className='text-muted-foreground leading-relaxed'>
              The commission or remuneration received is paid by the respective product provider or Asset
              Management Company and does not result in any additional charges to investors beyond the
              fees, expenses, or charges disclosed in the respective product documentation.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Details relating to commissions, distribution fees, applicable expenses, and other charges are
              available in the respective Scheme Information Document (SID), Statement of Additional
              Information (SAI), Key Information Memorandum (KIM), offer documents, or product
              literature issued by the respective issuer.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Investor Responsibility</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Investors are encouraged to make informed investment decisions after carefully considering:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Financial objectives</li>
              <li>Investment horizon</li>
              <li>Risk appetite</li>
              <li>Liquidity requirements</li>
              <li>Tax implications</li>
              <li>Overall asset allocation</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed'>
              Before investing, investors should carefully read all applicable scheme-related documents,
              including the Scheme Information Document (SID), Statement of Additional Information (SAI),
              Key Information Memorandum (KIM), offer documents, and any other relevant disclosures
              issued by the product provider.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Risk Disclosure</h2>
            <p className='text-muted-foreground leading-relaxed'>
              All investments are subject to market risks and other investment-related risks.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              The value of investments may fluctuate due to market movements, economic conditions,
              interest rate changes, inflation, geopolitical events, regulatory developments, and other
              external factors.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Past performance is not indicative of future returns.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Neither Ascent Wealth nor any product manufacturer or Asset Management Company
              guarantees the performance of any investment product unless explicitly stated in the
              respective offer documents.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Conflict of Interest</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth is committed to maintaining fairness, transparency, and professionalism in all
              client interactions.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Where any actual or potential conflict of interest may arise, appropriate disclosures shall be
              made in accordance with applicable regulatory requirements. We strive to ensure that clients
              receive fair, unbiased information to support their investment decisions.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Accuracy of Information</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Every reasonable effort is made to ensure that the information published on this website and
              shared through our communications is accurate and current.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              However, Ascent Wealth does not warrant the completeness, accuracy, or reliability of any
              information and reserves the right to modify, update, or remove content without prior notice.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Investors are advised to independently verify information before acting upon it.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Regulatory Compliance</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth operates in accordance with the applicable regulations, circulars, and
              guidelines issued by:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Securities and Exchange Board of India (SEBI)</li>
              <li>Association of Mutual Funds in India (AMFI)</li>
              <li>Relevant Asset Management Companies (AMCs)</li>
              <li>Other applicable regulatory authorities</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed'>
              We are committed to maintaining the highest standards of regulatory compliance, ethical
              conduct, and investor protection.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Limitation of Liability</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth shall not be liable for any direct, indirect, incidental, consequential, or special
              losses arising from:
            </p>
            <ul className='list-disc pl-6 space-y-2 text-muted-foreground'>
              <li>Investment decisions made by investors.</li>
              <li>Market fluctuations or changes in economic conditions.</li>
              <li>Delays or failures caused by third-party institutions or intermediaries.</li>
              <li>Regulatory or taxation changes.</li>
              <li>Technical interruptions, website downtime, or system failures.</li>
              <li>Errors or omissions in information provided by third parties.</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              Investors remain solely responsible for evaluating the suitability of their investments and the
              decisions they make.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Contact Us</h2>
            <p className='text-muted-foreground leading-relaxed'>
              If you have any questions regarding this Disclosure or require further information about our
              services, products, or regulatory status, please contact Ascent Wealth through the contact
              details available on our website.
            </p>
          </div>

          <div className='space-y-4 mt-6'>
            <div className='border-l-4 border-amber-500 bg-amber-500/10 p-4 rounded-r-md'>
              <p className='text-amber-700 dark:text-amber-400 font-semibold text-sm'>
                Mutual Fund investments are subject to market risks. Please read all scheme-related
                documents carefully before investing.
              </p>
            </div>
            <div className='border-l-4 border-amber-500 bg-amber-500/10 p-4 rounded-r-md'>
              <p className='text-amber-700 dark:text-amber-400 font-semibold text-sm'>
                Specialized Investment Funds (SIFs) and other investment products are subject to the
                terms, conditions, eligibility criteria, and risks specified in the respective offer documents.
                Investors are advised to read all relevant documents carefully before investing.
              </p>
            </div>
          </div>
        </div>
      </section>
      <CTABlock />
    </main>
  );
}
