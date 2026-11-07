// SEO Structured Data (schema.org JSON-LD) for blogs
// Sourced and optimized from Scheme.docx

export interface SchemaNode {
  '@type': string;
  '@id'?: string;
  [key: string]: any;
}

export interface SchemaGraph {
  '@context': 'https://schema.org';
  '@graph': SchemaNode[];
}

export const customBlogSchemas: Record<string, SchemaGraph> = {
  "pms-in-chennai-exploring-equity-investment-with-ascent-wealth": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "https://www.ascentwealth.in/blogs/pms-in-chennai-exploring-equity-investment-with-ascent-wealth#article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.ascentwealth.in/blogs/pms-in-chennai-exploring-equity-investment-with-ascent-wealth"
        },
        "headline": "PMS in Chennai: Exploring Equity Investment with Ascent Wealth",
        "description": "Explore Portfolio Management Services in Chennai, equity investment strategies, PMS selection, fees, risks and key considerations for choosing a suitable PMS provider with Ascent Wealth.",
        "keywords": [
          "PMS in Chennai",
          "Best Portfolio Management Services",
          "Best PMS Distributor in Chennai",
          "Portfolio Management Services",
          "Portfolio Management Services in Chennai",
          "Equity PMS in Chennai",
          "PMS Investment in Chennai",
          "Equity Investment",
          "PMS Provider in Chennai",
          "Wealth Management",
          "Financial Planning"
        ],
        "articleSection": "Wealth Management",
        "inLanguage": "en-IN",
        "datePublished": "2026-10-28",
        "dateModified": "2026-10-28",
        "author": {
          "@type": "Organization",
          "name": "Ascent Wealth",
          "url": "https://www.ascentwealth.in/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ascent Wealth",
          "url": "https://www.ascentwealth.in/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.ascentwealth.in/Ascent-Wealth-logo-2.png"
          }
        },
        "about": [
          {
            "@type": "Thing",
            "name": "Portfolio Management Services"
          },
          {
            "@type": "Thing",
            "name": "Equity Investment"
          },
          {
            "@type": "Thing",
            "name": "Wealth Management"
          },
          {
            "@type": "Place",
            "name": "Chennai"
          }
        ],
        "image": "https://res.cloudinary.com/dxgckfhti/image/upload/v1793181662/Chennai_Investment_Growth_by_the_Sea_ax04dq.webp"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.ascentwealth.in/blogs/pms-in-chennai-exploring-equity-investment-with-ascent-wealth#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ascentwealth.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blogs",
            "item": "https://www.ascentwealth.in/blogs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "PMS in Chennai: Exploring Equity Investment with Ascent Wealth",
            "item": "https://www.ascentwealth.in/blogs/pms-in-chennai-exploring-equity-investment-with-ascent-wealth"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.ascentwealth.in/blogs/pms-in-chennai-exploring-equity-investment-with-ascent-wealth#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is PMS in Chennai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PMS in Chennai refers to Portfolio Management Services for eligible investors who want professional management of their investments through a defined investment strategy. Equity PMS primarily involves selecting and managing stocks based on an investment approach."
            }
          },
          {
            "@type": "Question",
            "name": "Is PMS better than mutual funds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Neither option is universally better. PMS invests in securities held in an individual investor's account, whereas mutual funds pool money from multiple investors. The suitable option depends on investment goals, risk tolerance and preferences."
            }
          },
          {
            "@type": "Question",
            "name": "What is the minimum investment required for PMS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The general minimum investment requirement under SEBI's PMS regulations is \u20b950 lakh per client. Investors should confirm the applicable requirements with the registered portfolio manager."
            }
          },
          {
            "@type": "Question",
            "name": "Can equity PMS investments lose money?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Equity PMS investments are subject to market movements, business risks and potential capital losses. Professional portfolio management does not guarantee profits or protect against losses."
            }
          },
          {
            "@type": "Question",
            "name": "How do I select a PMS provider in Chennai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evaluate the provider's SEBI registration, investment strategy, historical performance, fee structure, risk management approach and reporting practices before selecting a PMS provider."
            }
          }
        ]
      }
    ]
  },
  "portfolio-management-services-in-chennai-a-guide-to-pms-equity-investments": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "https://www.ascentwealth.in/blogs/portfolio-management-services-in-chennai-a-guide-to-pms-equity-investments#article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.ascentwealth.in/blogs/portfolio-management-services-in-chennai-a-guide-to-pms-equity-investments"
        },
        "headline": "Portfolio Management Services in Chennai: A Guide to PMS Equity Investments",
        "description": "Explore Portfolio Management Services in Chennai, PMS equity investment strategies, benefits, risks, fees and tips for choosing a suitable PMS provider.",
        "keywords": [
          "Portfolio Management Services in Chennai",
          "PMS in Chennai",
          "Best Portfolio Management Services",
          "Best PMS Distributor in Chennai",
          "Portfolio Management Services",
          "PMS Equity Investment",
          "Equity PMS in Chennai",
          "PMS Investment in Chennai",
          "PMS Provider in Chennai",
          "Equity Portfolio Management",
          "Wealth Management",
          "Equity Investment"
        ],
        "articleSection": "Portfolio Management Services",
        "inLanguage": "en-IN",
        "datePublished": "2026-10-28",
        "dateModified": "2026-10-28",
        "author": {
          "@type": "Organization",
          "name": "Ascent Wealth",
          "url": "https://www.ascentwealth.in/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ascent Wealth",
          "url": "https://www.ascentwealth.in/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.ascentwealth.in/Ascent-Wealth-logo-2.png"
          }
        },
        "about": [
          {
            "@type": "Thing",
            "name": "Portfolio Management Services"
          },
          {
            "@type": "Thing",
            "name": "PMS Equity Investment"
          },
          {
            "@type": "Thing",
            "name": "Equity Investment"
          },
          {
            "@type": "Place",
            "name": "Chennai"
          }
        ],
        "image": "https://res.cloudinary.com/dxgckfhti/image/upload/v1793181661/Chennai_Investment_Growth_at_Sunrise_v6vajr.webp"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.ascentwealth.in/blogs/portfolio-management-services-in-chennai-a-guide-to-pms-equity-investments#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ascentwealth.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blogs",
            "item": "https://www.ascentwealth.in/blogs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Portfolio Management Services in Chennai: A Guide to PMS Equity Investments",
            "item": "https://www.ascentwealth.in/blogs/portfolio-management-services-in-chennai-a-guide-to-pms-equity-investments"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.ascentwealth.in/blogs/portfolio-management-services-in-chennai-a-guide-to-pms-equity-investments#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the best Portfolio Management Services in Chennai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The suitability of PMS depends on investment objectives, risk tolerance, preferred equity strategy, charges and the portfolio manager's credentials. Compare SEBI-registered portfolio managers and review their disclosures before investing."
            }
          },
          {
            "@type": "Question",
            "name": "What is the minimum investment required for PMS in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The minimum investment requirement for PMS is generally \u20b950 lakh per client under SEBI regulations. Investors should verify the latest applicable requirements and terms with the portfolio manager."
            }
          },
          {
            "@type": "Question",
            "name": "Is PMS better than mutual funds for equity investment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Neither option is universally better. PMS provides a professionally managed portfolio of securities in an individual investor's account, while mutual funds offer pooled investment management. Compare costs, diversification, transparency, risks and investment objectives."
            }
          },
          {
            "@type": "Question",
            "name": "Are PMS equity investments safe?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PMS equity investments carry market risks and can result in capital losses. Professional management and regulatory oversight do not guarantee profits or protect investors from losses."
            }
          },
          {
            "@type": "Question",
            "name": "How can I choose a PMS provider in Chennai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Evaluate the provider's SEBI registration, investment philosophy, performance history, fees, risk management process and reporting practices. Ensure the investment strategy aligns with your financial goals and risk appetite."
            }
          }
        ]
      }
    ]
  },
  "mutual-fund-distributor-in-chennai-choose-the-right-investment-partner": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "https://www.ascentwealth.in/blogs/mutual-fund-distributor-in-chennai-choose-the-right-investment-partner#article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.ascentwealth.in/blogs/mutual-fund-distributor-in-chennai-choose-the-right-investment-partner"
        },
        "headline": "Mutual Fund Distributor in Chennai: Choose the Right Investment Partner with Ascent Wealth",
        "description": "Looking for a Mutual Fund Agent in Chennai? Explore mutual fund investment options, SIP planning, financial goals and professional investment guidance with Ascent Wealth.",
        "datePublished": "2026-08-20",
        "author": {
          "@type": "Organization",
          "name": "Ascent Wealth",
          "url": "https://www.ascentwealth.in/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ascent Wealth",
          "url": "https://www.ascentwealth.in/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.ascentwealth.in/icon.png"
          }
        },
        "keywords": [
          "Mutual Fund Agent in Chennai",
          "Mutual Fund Agent",
          "Mutual Fund Distributor in Chennai",
          "Mutual Fund Investment in Chennai",
          "Best Mutual Fund Agent in Chennai",
          "SIP Investment in Chennai",
          "Mutual Fund Services in Chennai",
          "Mutual Fund Advisor in Chennai"
        ],
        "about": [
          {
            "@type": "Thing",
            "name": "Mutual Fund Investment"
          },
          {
            "@type": "Thing",
            "name": "Systematic Investment Plan"
          },
          {
            "@type": "Thing",
            "name": "Financial Planning"
          }
        ],
        "image": "https://res.cloudinary.com/dxgckfhti/image/upload/v1787226537/ChatGPT_Image_Aug_20_2026_01_38_56_PM_1_duwzlj.webp",
        "inLanguage": "en-IN",
        "articleSection": "Mutual Funds"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.ascentwealth.in/blogs/mutual-fund-distributor-in-chennai-choose-the-right-investment-partner#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ascentwealth.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blogs",
            "item": "https://www.ascentwealth.in/blogs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Mutual Fund Distributor in Chennai: Choose the Right Investment Partner with Ascent Wealth",
            "item": "https://www.ascentwealth.in/blogs/mutual-fund-distributor-in-chennai-choose-the-right-investment-partner"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.ascentwealth.in/blogs/mutual-fund-distributor-in-chennai-choose-the-right-investment-partner#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What does a Mutual Fund Agent do?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A Mutual Fund Agent helps investors understand mutual fund schemes, complete KYC procedures and invest according to their financial goals, investment horizon and risk profile."
            }
          },
          {
            "@type": "Question",
            "name": "How can I find the right Mutual Fund Agent in Chennai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Choose a Mutual Fund Agent in Chennai by evaluating their experience, credentials, transparency, service quality and approach to financial planning."
            }
          },
          {
            "@type": "Question",
            "name": "Can Ascent Wealth help with SIP investments?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, Ascent Wealth helps investors understand mutual fund options and plan SIP investments based on their financial goals, monthly savings capacity and investment horizon."
            }
          },
          {
            "@type": "Question",
            "name": "Is mutual fund investment suitable for every investor?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Mutual funds offer different schemes with varying risk levels. Investors should select schemes based on their financial objectives, risk tolerance and investment horizon."
            }
          },
          {
            "@type": "Question",
            "name": "Why should I consider professional guidance for mutual fund investment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Professional guidance can help investors understand mutual fund categories, assess investment risks, plan asset allocation and make informed investment decisions."
            }
          }
        ]
      }
    ]
  },
  "how-to-choose-portfolio-management-services-in-chennai": {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": "https://www.ascentwealth.in/blogs/how-to-choose-portfolio-management-services-in-chennai#article",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://www.ascentwealth.in/blogs/how-to-choose-portfolio-management-services-in-chennai"
        },
        "headline": "How to Choose the Right Portfolio Management Service in Chennai: 7 Factors to Consider",
        "description": "Looking for the best Portfolio Management Services in Chennai? Explore 7 important factors to consider, including PMS investment strategies, fees, risk management, SEBI registration and portfolio performance.",
        "datePublished": "2026-09-22",
        "author": {
          "@type": "Organization",
          "name": "Ascent Wealth",
          "url": "https://www.ascentwealth.in/"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Ascent Wealth",
          "url": "https://www.ascentwealth.in/",
          "logo": {
            "@type": "ImageObject",
            "url": "https://www.ascentwealth.in/icon.png"
          }
        },
        "keywords": [
          "PMS",
          "Best Portfolio Management Services in Chennai",
          "Portfolio Management Services in Chennai",
          "Portfolio Management Services",
          "PMS in Chennai",
          "Best PMS in Chennai",
          "Portfolio Management Service",
          "PMS Investment in Chennai",
          "Portfolio Management Company in Chennai",
          "PMS Investment Services"
        ],
        "about": [
          {
            "@type": "Thing",
            "name": "Portfolio Management Services"
          },
          {
            "@type": "Thing",
            "name": "PMS Investment"
          },
          {
            "@type": "Thing",
            "name": "Wealth Management"
          },
          {
            "@type": "Thing",
            "name": "Financial Planning"
          }
        ],
        "image": "https://res.cloudinary.com/dxgckfhti/image/upload/v1790172283/ChatGPT_Image_Sep_22_2026_04_25_14_PM_xxozg2.webp",
        "inLanguage": "en-IN",
        "articleSection": "Mutual Funds"
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://www.ascentwealth.in/blogs/how-to-choose-portfolio-management-services-in-chennai#breadcrumb",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.ascentwealth.in/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Blogs",
            "item": "https://www.ascentwealth.in/blogs"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "How to Choose the Right Portfolio Management Service in Chennai: 7 Factors to Consider",
            "item": "https://www.ascentwealth.in/blogs/how-to-choose-portfolio-management-services-in-chennai"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "@id": "https://www.ascentwealth.in/blogs/how-to-choose-portfolio-management-services-in-chennai#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Portfolio Management Service?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Portfolio Management Services (PMS) is a professional investment management service provided by a portfolio manager registered with SEBI. Investments are managed according to an agreed investment strategy and mandate."
            }
          },
          {
            "@type": "Question",
            "name": "What is the minimum investment for PMS in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The general minimum investment requirement for PMS is Rs. 50 lakh per client, subject to applicable SEBI regulations."
            }
          },
          {
            "@type": "Question",
            "name": "Is PMS suitable for equity investment?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PMS may suit eligible investors seeking professionally managed equity investment strategies. Suitability depends on financial goals, risk tolerance and investment horizon."
            }
          },
          {
            "@type": "Question",
            "name": "How do I choose the best Portfolio Management Services in Chennai?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Compare SEBI registration, investment philosophy, equity strategy, performance track record, benchmarks, fees, risk disclosures and reporting practices before selecting Portfolio Management Services in Chennai."
            }
          },
          {
            "@type": "Question",
            "name": "Is PMS better than mutual funds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "PMS is not necessarily better than mutual funds. Both have different structures and investment approaches. The right option depends on individual financial goals, investment requirements and risk profile."
            }
          },
          {
            "@type": "Question",
            "name": "Can PMS guarantee returns?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. PMS investments are subject to market risks, and returns are not guaranteed. Investors should carefully review the investment strategy and associated risks."
            }
          }
        ]
      }
    ]
  }
};

export function getBlogJsonLd(post: {
  slug: string;
  title: string;
  image: string;
  summary: string;
  content: string;
  categories: string[];
  createdAt: string;
  metaTitle?: string;
  metaDescription?: string;
}): SchemaGraph {
  // If an optimized custom schema exists for this post, return it
  if (customBlogSchemas[post.slug]) {
    return customBlogSchemas[post.slug];
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.ascentwealth.in';
  const postUrl = `${baseUrl}/blogs/${post.slug}`;

  // Default optimized fallback schema
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${postUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': postUrl,
        },
        headline: post.metaTitle || post.title,
        description: post.metaDescription || post.summary,
        image: post.image,
        datePublished: post.createdAt,
        dateModified: post.createdAt,
        articleSection: post.categories.join(', '),
        inLanguage: 'en-IN',
        author: {
          '@type': 'Organization',
          name: 'Ascent Wealth',
          url: `${baseUrl}/`,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Ascent Wealth',
          url: `${baseUrl}/`,
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/Ascent-Wealth-logo-2.png`,
          },
        },
        keywords: post.categories,
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${postUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: `${baseUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blogs',
            item: `${baseUrl}/blogs`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title,
            item: postUrl,
          },
        ],
      },
    ],
  };
}
