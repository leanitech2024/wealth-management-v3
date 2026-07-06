import type { Metadata } from 'next';
import Banner from '@/components/shared/banner';
import { CTABlock } from '@/components/shared/cta-block';

export const metadata: Metadata = {
  title: 'Privacy Policy | Ascent Wealth',
  description: 'Privacy Policy for Ascent Wealth, detailing how we collect, use, safeguard, and disclose your personal information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className='max-w-(--breakpoint-xl) mx-auto px-4 2xl:px-0 space-y-8 sm:space-y-10 md:space-y-12 lg:space-y-16 pb-8 sm:pb-10 md:pb-12 lg:pb-16'>
      <Banner />
      <section className='max-w-4xl mx-auto py-8 md:py-12 px-4'>
        <div className='prose prose-sm md:prose-base lg:prose-lg dark:prose-invert max-w-none space-y-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight mb-2'>Privacy Policy</h1>
            <p className='text-sm text-muted-foreground mb-4'>Effective Date: July 1, 2026</p>
            <p className='text-muted-foreground leading-relaxed'>
              At <strong>Ascent Wealth</strong>, your privacy is important to us. We are committed to safeguarding the
              personal information you share with us and ensuring that it is collected, used, stored, and
              protected responsibly. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you visit our website or use our services.
            </p>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              By accessing or using this website, you agree to the terms of this Privacy Policy.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Information We Collect</h2>
            <p className='text-muted-foreground leading-relaxed'>
              We may collect personal and non-personal information when you interact with our website,
              submit an enquiry, or avail of our services.
            </p>

            <h3 className='text-lg font-semibold mt-4'>Personal Information</h3>
            <p className='text-muted-foreground leading-relaxed'>
              The personal information we collect may include:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Full Name</li>
              <li>Mobile Number</li>
              <li>Email Address</li>
              <li>Residential City and State</li>
              <li>Financial Goals and Investment Preferences</li>
              <li>Information submitted through contact forms, enquiry forms, or other communication channels</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              Where required for investment-related transactions, additional information may be collected
              in accordance with applicable regulatory requirements and only after obtaining the
              necessary consent.
            </p>

            <h3 className='text-lg font-semibold mt-4'>Non-Personal Information</h3>
            <p className='text-muted-foreground leading-relaxed'>
              We may automatically collect certain technical information, including:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>IP Address</li>
              <li>Browser Type and Version</li>
              <li>Device Information</li>
              <li>Operating System</li>
              <li>Website Usage Data</li>
              <li>Date and Time of Visit</li>
              <li>Referring Website</li>
              <li>Cookies and Analytics Information</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              This information helps us improve website performance, enhance user experience, and
              maintain website security.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>How We Use Your Information</h2>
            <p className='text-muted-foreground leading-relaxed'>
              The information collected may be used to:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Respond to enquiries and service requests.</li>
              <li>Facilitate investment-related processes and transactions.</li>
              <li>Share information about our products and services.</li>
              <li>Provide market insights, newsletters, educational content, and regulatory updates.</li>
              <li>Improve our website, digital platforms, and customer experience.</li>
              <li>Conduct internal analysis and service enhancements.</li>
              <li>Comply with applicable legal, regulatory, and compliance requirements.</li>
              <li>Detect and prevent fraud, unauthorized activities, or misuse of our services.</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              We collect and use personal information only for legitimate business purposes and in
              accordance with applicable laws.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Cookies</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Our website uses cookies and similar technologies to enhance your browsing experience.
              Cookies may be used to:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Remember user preferences.</li>
              <li>Analyse website traffic and visitor behaviour.</li>
              <li>Improve website functionality.</li>
              <li>Measure the effectiveness of our digital content.</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              You may disable cookies through your browser settings; however, certain features of the
              website may not function as intended.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Sharing of Information</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth values your trust and does not sell, rent, or trade your personal information.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Your information may be shared only where necessary with:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Asset Management Companies (AMCs)</li>
              <li>Registrar and Transfer Agents (RTAs)</li>
              <li>Banking and Payment Service Providers</li>
              <li>Technology and IT Service Providers</li>
              <li>Regulatory Authorities including SEBI, AMFI, or other statutory bodies, where required by law</li>
              <li>Government authorities pursuant to applicable legal or regulatory obligations</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              Such disclosures are made only to the extent necessary for providing services or complying
              with legal and regulatory requirements.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Data Security</h2>
            <p className='text-muted-foreground leading-relaxed'>
              We maintain appropriate administrative, technical, and physical safeguards to protect your
              personal information against unauthorized access, misuse, alteration, disclosure, or
              destruction.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              While we implement industry-standard security measures, no method of electronic
              transmission or internet storage is completely secure. Accordingly, we cannot guarantee
              absolute security of information transmitted through the internet.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Third-Party Websites</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Our website may contain links to third-party websites for your convenience or additional
              information.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth does not control and is not responsible for the privacy practices, content, or
              security of external websites. Users are encouraged to review the privacy policies of any
              third-party websites they visit.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Your Rights</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Subject to applicable laws and regulations, you may:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Request access to your personal information.</li>
              <li>Request correction or updating of inaccurate information.</li>
              <li>Request withdrawal from marketing communications.</li>
              <li>Contact us regarding the processing or use of your personal information.</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              Certain information may continue to be retained where required by applicable laws,
              regulatory obligations, or contractual requirements.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Data Retention</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Personal information is retained only for as long as necessary to:
            </p>
            <ul className='list-disc pl-6 space-y-1 text-muted-foreground'>
              <li>Deliver our services.</li>
              <li>Meet legal and regulatory obligations.</li>
              <li>Maintain business and transaction records.</li>
              <li>Resolve disputes.</li>
              <li>Enforce our contractual rights.</li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-2'>
              Once the retention period has expired, information is securely deleted or anonymized in
              accordance with applicable policies.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Children's Privacy</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Our website and services are intended for individuals who are legally competent to enter into
              financial transactions.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              We do not knowingly collect personal information from minors without the consent of a
              parent or legal guardian.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Changes to this Privacy Policy</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Ascent Wealth reserves the right to amend or update this Privacy Policy from time to time to
              reflect changes in our practices, legal requirements, or regulatory obligations.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              The revised policy will be published on this page, and the updated version will become
              effective immediately upon publication.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Contact Us</h2>
            <p className='text-muted-foreground leading-relaxed'>
              If you have any questions regarding this Privacy Policy or the manner in which your personal
              information is collected or processed, please contact us through the contact details provided
              on the Ascent Wealth website.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              We are committed to addressing your concerns promptly and transparently.
            </p>
          </div>

          <div className='space-y-4'>
            <h2 className='text-xl font-bold tracking-tight border-b pb-2'>Our Commitment to Your Privacy</h2>
            <p className='text-muted-foreground leading-relaxed'>
              Protecting your personal information is fundamental to the trust our clients place in us. At
              Ascent Wealth, we remain committed to maintaining the highest standards of confidentiality,
              transparency, and data security while helping you achieve your financial goals through
              responsible wealth management and investment solutions.
            </p>
          </div>
        </div>
      </section>
      <CTABlock />
    </main>
  );
}
