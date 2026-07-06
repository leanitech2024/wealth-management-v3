'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Landmark,
  TrendingUp,
  Network,
  Info,
  Coins,
  Shield,
  Search,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Scraped link data structured for easy rendering and searching
const linkCategories = [
  {
    id: 'regulators',
    title: 'Government Bodies & Regulators',
    icon: Landmark,
    gradient: 'from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20',
    iconColor: 'text-blue-600 dark:text-blue-400',
    links: [
      { name: 'Government of India', href: 'https://india.gov.in/' },
      { name: 'Ministry of Finance', href: 'https://finmin.nic.in/' },
      { name: 'Ministry of Corporate Affairs', href: 'https://www.mca.gov.in/' },
      { name: 'MoF – Department of Financial Services', href: 'https://financialservices.gov.in/' },
      { name: 'Income Tax Department', href: 'https://www.incometaxindia.gov.in/' },
      { name: 'Central Board of Excise & Customs', href: 'https://www.cbec.gov.in/' },
      { name: 'Securities & Exchange Board of India (SEBI)', href: 'https://www.sebi.gov.in/' },
      { name: 'Insurance Regulatory & Development Authority (IRDA)', href: 'https://www.irda.gov.in/' },
      { name: 'Reserve Bank of India (RBI)', href: 'https://www.rbi.org.in/' },
      { name: 'Pension Fund Regulatory and Development Authority (PFRDA)', href: 'https://www.pfrda.org.in/' },
    ]
  },
  {
    id: 'securities',
    title: 'Securities Market',
    icon: TrendingUp,
    gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/20 dark:to-teal-500/20',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    links: [
      { name: 'National Stock Exchange (NSE)', href: 'https://www.nseindia.com/' },
      { name: 'Bombay Stock Exchange (BSE)', href: 'https://www.bseindia.com/' },
      { name: 'Multi Commodity Exchange of India Ltd (MCX)', href: 'https://www.mcxindia.com/' },
      { name: 'National Commodity and Derivatives Exchange (NCDEX)', href: 'https://www.ncdex.com/' },
      { name: 'Over the Counter Exchange of India (OTCEI)', href: 'https://www.otcei.net/' },
      { name: 'Inter-connected Stock Exchange of India Limited (ISE)', href: 'https://www.iseindia.com/' },
      { name: 'Stock Holding Corporation of India', href: 'https://www.stockholding.com/' },
      { name: 'National Securities Depository Ltd. (NSDL)', href: 'https://nsdl.co.in/' },
      { name: 'Central Depository Services (India) Ltd.', href: 'https://www.cdslindia.com/' },
    ]
  },
  {
    id: 'associations',
    title: 'Industry Bodies & Associations',
    icon: Network,
    gradient: 'from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20',
    iconColor: 'text-amber-600 dark:text-amber-400',
    links: [
      { name: 'Financial Intermediaries Association of India', href: 'https://www.fiai-india.org/' },
      { name: 'Association of Mutual Funds in India', href: 'https://www.amfiindia.com/' },
      { name: 'Life Insurance Council', href: 'https://www.lifeinscouncil.org/' },
      { name: 'General Insurance Council', href: 'https://gicouncil.in/' },
      { name: 'Insurance Brokers Association of India (IBAI)', href: 'https://www.ibai.org/' },
      { name: 'Indian Banks Association', href: 'https://www.iba.org.in/' },
      { name: 'Federation of Indian Chambers of Commerce & Industry (FICCI)', href: 'https://www.ficci.com/' },
      { name: 'The Associated Chambers of Commerce & Industry in India (ASSOCHAM)', href: 'https://www.assocham.org/' },
      { name: 'Confederation of Indian Industry (CII)', href: 'https://www.cii.in/' },
    ]
  },
  {
    id: 'resources',
    title: 'Information Resources',
    icon: Info,
    gradient: 'from-cyan-500/10 to-sky-500/10 dark:from-cyan-500/20 dark:to-sky-500/20',
    iconColor: 'text-cyan-600 dark:text-cyan-400',
    links: [
      { name: 'Government of India – Web Directory', href: 'https://goidirectory.nic.in/' },
      { name: 'Union Budget & Economic Survey', href: 'https://indiabudget.nic.in/' },
      { name: 'Press Information Bureau, Govt. of India', href: 'https://pib.nic.in/' },
      { name: 'Census of India', href: 'https://www.censusindia.net/' },
      { name: 'Right to Information Act', href: 'https://rti.gov.in/' },
      { name: 'Business in India – Govt. Initiative', href: 'https://business.gov.in/' },
      { name: 'Invest India', href: 'https://investindia.gov.in/' },
      { name: 'National Centre for Trade Information', href: 'https://www.ncti-india.com/Services.html' },
      { name: 'Invest India Economic Foundation', href: 'https://www.iief.com/' },
      { name: 'India Trade Promotion Organisation (ITPO)', href: 'https://www.indiatradefair.com/' },
      { name: 'Indian Brand Equity Foundation (IBEF)', href: 'https://www.ibef.org/' },
    ]
  },
  {
    id: 'amc',
    title: 'Asset Management Companies (AMCs)',
    icon: Coins,
    gradient: 'from-violet-500/10 to-purple-500/10 dark:from-violet-500/20 dark:to-purple-500/20',
    iconColor: 'text-violet-600 dark:text-violet-400',
    links: [
      { name: 'Axis Asset Management Company Ltd.', href: 'https://www.axismf.com/' },
      { name: 'Baroda Pioneer Asset Management Company Limited', href: 'https://www.barodapioneer.in/' },
      { name: 'Birla Sun Life Asset Management Company Limited', href: 'https://www.birlasunlife.com/' },
      { name: 'BNP Paribas Asset Management India Private Limited', href: 'https://www.bnpparibasmf.in/' },
      { name: 'BOI AXA Investment Managers Private Limited', href: 'https://www.boiaxa-im.com/' },
      { name: 'Canara Robeco Asset Management Company Limited', href: 'https://www.canararobeco.com/' },
      { name: 'Daiwa Asset Management (India) Private Limited', href: 'https://www.daiwafunds.in/' },
      { name: 'Deutsche Asset Management (India) Pvt. Ltd.', href: 'https://www.dws-india.com/' },
      { name: 'DSP BlackRock Investment Managers Private Limited', href: 'https://www.dws-india.com/' },
      { name: 'Edelweiss Asset Management Limited', href: 'https://www.edelweissmf.com/' },
      { name: 'Escorts Asset Management Limited', href: 'https://www.escortsmutual.com/' },
      { name: 'Franklin Templeton Asset Management (India) Private Limited', href: 'https://www.franklintempletonindia.com/' },
      { name: 'Goldman Sachs Asset Management (India) Private Limited', href: 'https://www.gsam.in/' },
      { name: 'HDFC Asset Management Company Limited', href: 'https://www.hdfcfund.com/' },
      { name: 'HSBC Asset Management (India) Private Ltd.', href: 'https://www.assetmanagement.hsbc.com/' },
      { name: 'ICICI Prudential Asset Mgmt. Company Limited', href: 'https://www.icicipruamc.com/' },
      { name: 'IDBI Asset Management Ltd.', href: 'https://www.idbimutual.co.in/' },
      { name: 'IDFC Asset Management Company Limited', href: 'https://www.idfcmf.com/' },
      { name: 'UTI Asset Management Company Ltd', href: 'https://www.utimf.com/' },
    ]
  },
  {
    id: 'life-insurance',
    title: 'Life Insurance Companies',
    icon: Shield,
    gradient: 'from-rose-500/10 to-pink-500/10 dark:from-rose-500/20 dark:to-pink-500/20',
    iconColor: 'text-rose-600 dark:text-rose-400',
    links: [
      { name: 'AEGON Religare Life Insurance Company Limited', href: 'https://www.aegonreligare.com/' },
      { name: 'Aviva Life Insurance Company India Limited', href: 'https://www.avivaindia.com/' },
      { name: 'Bajaj Allianz Life Insurance Company Limited', href: 'https://www.bajajallianz.com/Corp/index.jsp' },
      { name: 'Bharti AXA Life Insurance Company Ltd.', href: 'https://www.bharti-axalife.com/' },
      { name: 'Birla Sun Life Insurance Co. Ltd', href: 'https://insurance.birlasunlife.com/Pages/Individual/Home.aspx' },
      { name: 'Canara HSBC Oriental Bank of Commerce Life Insurance Company Ltd.', href: 'https://www.canarahsbclife.com/lifeinsurance/portal/canh/' },
      { name: 'DLF Pramerica Life Insurance Co. Ltd.', href: 'https://www.dlfpramericalife.com/' },
      { name: 'Edelweiss Tokio Life Insurance Co. Ltd.', href: 'https://www.edelweisstokio.in/' },
      { name: 'Future Generali India Life Insurance Company Limited', href: 'https://www.futuregenerali.in/Corporate/Index.aspx' },
      { name: 'HDFC Standard Life Insurance Co. Ltd', href: 'https://www.hdfclife.com/' },
      { name: 'ICICI Prudential Life Insurance Co. Ltd', href: 'https://www.iciciprulife.com/public/default.htm' },
      { name: 'IDBI Federal Life Insurance Company Ltd.', href: 'https://www.idbifederal.com/Pages/home.aspx' },
      { name: 'IndiaFirst Life Insurance Company Limited', href: 'https://www.indiafirstlife.com/' },
      { name: 'ING Vysya Life Insurance Company Ltd.', href: 'https://www.inglife.co.in/' },
      { name: 'Kotak Mahindra Old Mutual Life Insurance Limited', href: 'https://insurance.kotak.com/home/index.php' },
      { name: 'Life Insurance Corporation of India', href: 'https://www.licindia.com/' },
      { name: 'Max Life Insurance Co. Ltd', href: 'https://www.maxlifeinsurance.com/' },
      { name: 'Met Life India Insurance Company Ltd.', href: 'https://www.metlife.co.in/' },
      { name: 'Reliance Life Insurance Company Limited', href: 'https://www.reliancelife.com/rlic/index.aspx' },
      { name: 'Sahara India Life Insurance Co, Ltd.', href: 'https://www.saharalife.com/' },
      { name: 'SBI Life Insurance Co. Ltd', href: 'https://www.sbilife.co.in/sbilife/content/home' },
      { name: 'Shriram Life Insurance Co, Ltd.', href: 'https://www.shriramlife.com/WebportalFinal/login1.jsp' },
      { name: 'Star Union Dai-ichi Life Insurance Co. Ltd.', href: 'https://www.sudlife.in/en-US/Pages/homepage.aspx' },
      { name: 'Tata AIA Life Insurance Company Limited', href: 'https://www.tataaia.com/' },
    ]
  },
  {
    id: 'non-life-insurance',
    title: 'Non-Life Insurance Companies',
    icon: Shield,
    gradient: 'from-amber-500/10 to-yellow-500/10 dark:from-amber-500/20 dark:to-yellow-500/20',
    iconColor: 'text-amber-500 dark:text-yellow-400',
    links: [
      { name: 'Agriculture Insurance Co. of India Ltd.', href: 'https://www.aicofindia.com' },
      { name: 'Apollo Munich Health Insurance Company Limited', href: 'https://www.apollomunichinsurance.com' },
      { name: 'Bajaj Allianz General Insurance Co. Ltd.', href: 'https://www.bajajallianz.com' },
      { name: 'Bharti AXA General Insurance Company Limited', href: 'https://www.bharti-axagi.co.in' },
      { name: 'Cholamandalam MS General Insurance Co. Ltd.', href: 'https://www.cholainsurance.com' },
      { name: 'Export Credit Guarantee Corporation of India Ltd.', href: 'https://www.ecgc.in' },
      { name: 'Future Generali India Insurance Company Limited', href: 'https://www.futuregenerali.in' },
      { name: 'HDFC ERGO General Insurance Co. Ltd.', href: 'https://www.hdfcergo.com' },
      { name: 'IFFCO Tokio General Insurance Co. Ltd.', href: 'https://www.iffcotokio.co.in' },
      { name: 'United India Insurance Co. Ltd.', href: 'https://www.uiic.co.in' },
      { name: 'Universal Sompo General Insurance Co. Ltd.', href: 'https://www.universalsompo.com' },
    ]
  }
];

export default function ImportantLinks() {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter links based on search query
  const filteredCategories = linkCategories
    .map((category) => {
      const matchingLinks = category.links.filter(
        (link) =>
          link.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          category.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      return { ...category, links: matchingLinks };
    })
    .filter((category) => {
      const hasLinks = category.links.length > 0;
      return hasLinks;
    });

  return (
    <section className="max-w-6xl mx-auto py-8 md:py-12 px-4 space-y-8 md:space-y-12">
      {/* Introduction and Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-6 pb-6 border-b border-border/60">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Resource Directory</h2>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            Quickly navigate to verified external web portals for government departments, regulatory bodies, securities exchanges, insurance companies, and asset management funds.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80 lg:w-96 flex items-center">
          <Search className="absolute left-3 size-4 text-muted-foreground" />
          <Input
            id="links-search-input"
            type="text"
            placeholder="Search links or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 pr-4 py-2 w-full rounded-full border-muted-foreground/20 focus-visible:ring-primary"
            aria-label="Search important links"
          />
        </div>
      </div>


      {/* Categories Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="flex"
              >
                <Card className="flex flex-col w-full h-full overflow-hidden hover:shadow-xl transition-all duration-300 border-border/80 group">
                  {/* Decorative card header background */}
                  <div className={`h-1.5 w-full bg-gradient-to-r ${category.gradient}`} />
                  
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${category.gradient} ${category.iconColor} transition-transform group-hover:scale-110 duration-300`}>
                      <IconComponent className="size-5" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base md:text-lg font-semibold tracking-tight leading-snug">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {category.links.length} Link{category.links.length !== 1 ? 's' : ''} available
                      </CardDescription>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-1 pt-0">
                    <ul className="divide-y divide-border/40 text-sm">
                      {category.links.map((link, idx) => (
                        <li key={idx}>
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between py-2.5 px-1 hover:px-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-200 group/link"
                          >
                            <span className="line-clamp-1 group-hover/link:translate-x-0.5 transition-transform duration-200">
                              {link.name}
                            </span>
                            <ExternalLink className="size-3.5 opacity-0 group-hover/link:opacity-100 transition-all duration-200 text-primary shrink-0 ml-2" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* No Results Fallback */}
      {filteredCategories.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 space-y-4 border border-dashed rounded-2xl bg-muted/20"
        >
          <Info className="size-12 mx-auto text-muted-foreground/60" />
          <h3 className="text-lg font-semibold">No links found</h3>
          <p className="text-muted-foreground text-sm max-w-xs mx-auto">
            We couldn&apos;t find any resources matching your search query. Try typing another keyword.
          </p>
          <button
            onClick={() => setSearchQuery('')}
            className="mt-2 text-sm text-primary font-semibold hover:underline inline-flex items-center gap-1"
          >
            Clear search <ArrowRight className="size-3.5" />
          </button>
        </motion.div>
      )}
    </section>
  );
}
