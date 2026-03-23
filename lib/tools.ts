export type Tool = {
  name: string
  slug: string
  tagline: string
  rating: number
  affiliateUrl: string
  logo: string
  category: string
  pricing: string
  pricingTiers: { name: string; price: string; features: string[] }[]
  bestFor: string[]
  pros: string[]
  cons: string[]
  summary: string
  fullDescription: string
  faqs: { question: string; answer: string }[]
}

export const tools: Record<string, Tool> = {
  jobber: {
    name: "Jobber",
    slug: "jobber",
    tagline: "Field service management for home service businesses",
    rating: 4.8,
    affiliateUrl: "https://go.getjobber.com/gvvrh6ea5qsa",
    logo: "/logos/jobber.svg",
    category: "field-service",
    pricing: "Starting at $49/month",
    pricingTiers: [
      {
        name: "Core",
        price: "$49/month",
        features: ["1 user", "Scheduling", "Invoicing", "Client management"],
      },
      {
        name: "Connect",
        price: "$129/month",
        features: ["Up to 5 users", "Online booking", "Automated emails", "Job forms"],
      },
      {
        name: "Grow",
        price: "$249/month",
        features: ["Unlimited users", "Reporting", "Lead management", "Referral campaigns"],
      },
    ],
    bestFor: ["landscapers", "cleaners", "contractors", "plumbers", "HVAC", "pest-control"],
    pros: [
      "Intuitive drag-and-drop scheduling calendar",
      "Client self-serve hub for approvals and payments",
      "Automatic invoicing and follow-up reminders",
      "GPS tracking for field technicians",
      "Robust mobile app for iOS and Android",
      "Integrates with QuickBooks",
    ],
    cons: [
      "Higher price point than some competitors",
      "Steeper learning curve for larger teams",
      "Some advanced features locked to higher tiers",
    ],
    summary:
      "Jobber is the gold standard for home service businesses that need to manage scheduling, dispatching, invoicing, and client communication in one place. It's especially strong for landscaping, cleaning, and contracting companies with field crews.",
    fullDescription:
      "Jobber has earned its reputation as the leading field service management software by doing one thing exceptionally well: making it easy to run a professional home service business. From the moment a lead comes in to the final payment, Jobber handles every step of the workflow.\n\nThe scheduling calendar is a standout feature — you can drag jobs between technicians, see who's available, and dispatch in seconds. Clients get automatic notifications when a crew is on their way, and the client hub lets homeowners approve quotes and pay invoices without a single phone call.\n\nFor growing companies, Jobber's reporting suite gives you visibility into revenue, job costs, and technician performance. The QuickBooks integration means your accountant won't complain about your bookkeeping either.",
    faqs: [
      {
        question: "Is Jobber good for solo operators?",
        answer:
          "Yes — the Core plan at $49/month is designed for solo operators. You get scheduling, invoicing, and client management without paying for features you don't need yet.",
      },
      {
        question: "Does Jobber work offline?",
        answer:
          "Jobber's mobile app works in areas with poor signal and syncs when connectivity is restored, so field technicians can still complete jobs and capture signatures.",
      },
      {
        question: "Can clients pay online through Jobber?",
        answer:
          "Yes. Jobber Payments lets clients pay invoices by credit card or ACH directly from the client hub. Funds are deposited to your bank account within 2 business days.",
      },
      {
        question: "Does Jobber have a free trial?",
        answer:
          "Jobber offers a 14-day free trial with no credit card required, so you can test the full platform before committing.",
      },
    ],
  },
  honeybook: {
    name: "HoneyBook",
    slug: "honeybook",
    tagline: "Client management and workflow automation for creative businesses",
    rating: 4.6,
    affiliateUrl: "https://www.honeybook.com",
    logo: "/logos/honeybook.svg",
    category: "client-management",
    pricing: "Starting at $19/month",
    pricingTiers: [
      {
        name: "Starter",
        price: "$19/month",
        features: ["Unlimited clients", "Contracts", "Invoices", "Proposals"],
      },
      {
        name: "Essentials",
        price: "$39/month",
        features: ["Everything in Starter", "Automations", "Scheduler", "Quickbooks sync"],
      },
      {
        name: "Premium",
        price: "$79/month",
        features: ["Everything in Essentials", "Priority support", "Multiple companies", "Onboarding specialist"],
      },
    ],
    bestFor: ["photographers", "videographers", "wedding-planners", "designers", "freelancers", "coaches"],
    pros: [
      "Beautiful, client-facing proposals and contracts",
      "Powerful automation workflows",
      "Built-in online contract signing",
      "Integrated scheduling and payments",
      "Excellent templates for creative industries",
      "Strong mobile app",
    ],
    cons: [
      "Less suited for field service businesses",
      "Automations can have a learning curve",
      "Limited customization on lower tiers",
    ],
    summary:
      "HoneyBook is the go-to platform for creative professionals who want to wow clients from first contact to final delivery. Its proposal and contract features are best-in-class, and the automation tools can save photographers and planners hours every week.",
    fullDescription:
      "HoneyBook was built from the ground up for creative professionals — photographers, videographers, wedding planners, designers, and coaches who sell their time and expertise. The platform's greatest strength is making the client experience look professional and polished from the very first inquiry.\n\nWhen a potential client fills out your contact form, HoneyBook can automatically send a branded proposal with your packages, pricing, and contract — all in one beautiful document. Clients sign electronically and pay the deposit without you lifting a finger.\n\nThe automation builder lets you create workflows triggered by client actions. Booked a session? Automatically send a welcome email. Session is in 48 hours? Send a reminder. Gallery delivered? Request a review. These workflows turn what used to be manual follow-up into a reliable system that runs while you're on shoots.",
    faqs: [
      {
        question: "Is HoneyBook good for photographers?",
        answer:
          "HoneyBook is one of the best tools available for photographers. Its proposal templates, online contracts, automated workflows, and payment processing cover everything from lead inquiry to final gallery delivery.",
      },
      {
        question: "Can HoneyBook replace a separate invoicing tool?",
        answer:
          "Yes. HoneyBook includes full invoicing with online payment via credit card or bank transfer, payment plans, and automatic payment reminders.",
      },
      {
        question: "Does HoneyBook integrate with Google Calendar?",
        answer:
          "Yes, HoneyBook syncs with Google Calendar and Outlook so your booked sessions automatically appear in your calendar.",
      },
      {
        question: "Is there a HoneyBook free trial?",
        answer:
          "HoneyBook offers a 7-day free trial. They also frequently run promotions with extended trials.",
      },
    ],
  },
  housecallpro: {
    name: "Housecall Pro",
    slug: "housecallpro",
    tagline: "All-in-one software for home service businesses",
    rating: 4.7,
    affiliateUrl: "https://www.housecallpro.com",
    logo: "/logos/housecallpro.svg",
    category: "field-service",
    pricing: "Starting at $49/month",
    pricingTiers: [
      {
        name: "Basic",
        price: "$49/month",
        features: ["1 user", "Scheduling", "Invoicing", "Online booking"],
      },
      {
        name: "Essentials",
        price: "$129/month",
        features: ["Up to 5 users", "Estimates", "GPS tracking", "Recurring jobs"],
      },
      {
        name: "MAX",
        price: "Custom pricing",
        features: ["Unlimited users", "Advanced reporting", "Postcard marketing", "Employee time tracking"],
      },
    ],
    bestFor: ["plumbers", "HVAC", "electricians", "cleaners", "pest-control", "landscapers"],
    pros: [
      "Extremely easy to use — minimal training needed",
      "Built-in online booking widget for your website",
      "Automated review requests after job completion",
      "Postcard marketing to previous customers",
      "Strong mobile app for technicians",
      "Instant payouts available",
    ],
    cons: [
      "Fewer customization options than Jobber",
      "Reporting is less detailed on lower tiers",
      "Price increases quickly with more users",
    ],
    summary:
      "Housecall Pro is the easiest field service management software to get up and running. It's especially popular with plumbers, HVAC companies, and electricians who want professional dispatching and invoicing without a complex setup.",
    fullDescription:
      "Housecall Pro has become one of the most popular choices for home service businesses because it prioritizes ease of use above all else. A plumber or HVAC tech who isn't especially tech-savvy can get up and running in an afternoon and start dispatching jobs the same day.\n\nThe online booking widget is a highlight — embed it on your website and customers can book appointments 24/7 without calling. Jobs appear directly in your dispatch calendar, and technicians receive push notifications with all the job details.\n\nHousecall Pro also bakes marketing directly into the platform. After every completed job, it automatically sends a review request to the customer. When you want to drum up repeat business, the postcard marketing tool lets you mail physical postcards to past customers — a surprisingly effective strategy for home service businesses.",
    faqs: [
      {
        question: "How does Housecall Pro compare to Jobber?",
        answer:
          "Both are excellent field service management tools. Housecall Pro is easier to set up and has stronger built-in marketing features. Jobber has a more powerful scheduling engine and better reporting. For simplicity, choose Housecall Pro. For growing teams, consider Jobber.",
      },
      {
        question: "Does Housecall Pro work for cleaning businesses?",
        answer:
          "Yes, Housecall Pro works well for cleaning businesses. Recurring job scheduling, client profiles, and automatic invoicing make it easy to manage a book of regular customers.",
      },
      {
        question: "Can technicians use Housecall Pro on their phones?",
        answer:
          "Yes. The Housecall Pro mobile app lets technicians view their schedule, navigate to jobs, collect signatures, and process payments in the field.",
      },
      {
        question: "Is there a free trial for Housecall Pro?",
        answer:
          "Housecall Pro offers a 14-day free trial with no credit card required.",
      },
    ],
  },
  freshbooks: {
    name: "FreshBooks",
    slug: "freshbooks",
    tagline: "Accounting and invoicing software built for small service businesses",
    rating: 4.6,
    affiliateUrl: "https://www.freshbooks.com",
    logo: "/logos/freshbooks.svg",
    category: "accounting",
    pricing: "Starting at $19/month",
    pricingTiers: [
      {
        name: "Lite",
        price: "$19/month",
        features: ["5 clients", "Invoicing", "Expense tracking", "Time tracking"],
      },
      {
        name: "Plus",
        price: "$33/month",
        features: ["50 clients", "Proposals", "Automations", "Bank reconciliation"],
      },
      {
        name: "Premium",
        price: "$60/month",
        features: ["Unlimited clients", "Project profitability", "Advanced reporting"],
      },
    ],
    bestFor: ["photographers", "freelancers", "contractors", "landscapers", "coaches", "cleaning-businesses"],
    pros: [
      "Clean, easy-to-use invoicing interface",
      "Built-in time tracking for hourly billing",
      "Expense tracking with receipt capture",
      "Profit and loss reports",
      "Automatic payment reminders",
      "Integrates with 100+ apps including Stripe and PayPal",
    ],
    cons: [
      "Not a field service tool — no scheduling or dispatching",
      "Client limit on lower tiers",
      "No contracts or proposals on Lite plan",
    ],
    summary:
      "FreshBooks is the go-to invoicing and accounting tool for service business owners who bill by project or hour. It combines professional invoicing, expense tracking, and time tracking in a clean interface that doesn't require an accounting degree to understand.",
    fullDescription:
      "FreshBooks has built its reputation on making accounting approachable for non-accountants. If you run a photography business, landscaping company, or any service business where you bill clients for time or projects, FreshBooks handles the financial side so you can focus on the work.\n\nThe invoicing experience is FreshBooks' standout feature. Create a professional invoice in under a minute, send it directly to the client, and let FreshBooks handle follow-up reminders if payment is late. Clients can pay online by credit card or bank transfer, and funds are deposited to your account within a few days.\n\nTime tracking is built directly into the platform — start a timer when you begin work, stop it when you're done, and add the hours to an invoice with one click. For photographers who charge for editing hours, or landscapers who bill hourly for smaller jobs, this eliminates the need for a separate time tracking app.\n\nThe expense tracking feature connects to your bank account and automatically imports transactions. You categorize them as business expenses, and FreshBooks generates profit and loss reports that give you a real picture of your business finances — useful at tax time and for understanding where your money is going.",
    faqs: [
      {
        question: "Is FreshBooks good for photographers?",
        answer:
          "Yes. FreshBooks is popular with photographers for its clean invoicing, payment scheduling, and time tracking. Many photographers use it to track editing hours and create professional-looking invoices for clients.",
      },
      {
        question: "Does FreshBooks replace a bookkeeper?",
        answer:
          "FreshBooks significantly reduces the work a bookkeeper needs to do by keeping your income and expenses organized. Many small service businesses use FreshBooks to handle day-to-day accounting and bring in a bookkeeper only for annual tax prep.",
      },
      {
        question: "Can clients pay invoices through FreshBooks?",
        answer:
          "Yes. FreshBooks accepts credit cards and ACH bank transfers directly through invoices. Clients click a 'Pay Now' button and funds are deposited to your bank account within 2–5 days.",
      },
      {
        question: "Is there a FreshBooks free trial?",
        answer:
          "FreshBooks offers a 30-day free trial with no credit card required — one of the longer trials in the category.",
      },
    ],
  },
  bonsai: {
    name: "Bonsai",
    slug: "bonsai",
    tagline: "All-in-one business management for freelancers — contracts, invoices, and time tracking",
    rating: 4.5,
    affiliateUrl: "https://www.hellobonsai.com",
    logo: "/logos/bonsai.svg",
    category: "freelance-management",
    pricing: "Starting at $25/month",
    pricingTiers: [
      {
        name: "Starter",
        price: "$25/month",
        features: ["Contracts", "Invoices", "Proposals", "Time tracking"],
      },
      {
        name: "Professional",
        price: "$39/month",
        features: ["Everything + client portal", "Subcontractors", "Multiple currencies"],
      },
      {
        name: "Business",
        price: "$79/month",
        features: ["Everything + multiple team members", "Accountant access"],
      },
    ],
    bestFor: ["photographers", "designers", "coaches", "freelancers", "consultants", "personal-trainers"],
    pros: [
      "Beautiful, modern contract and proposal templates",
      "Integrated time tracking and invoicing",
      "Client portal for document signing and payments",
      "Automated payment reminders",
      "Project tracking and task management",
      "Tax estimation tools built in",
    ],
    cons: [
      "Not designed for field service businesses",
      "Fewer integrations than HoneyBook",
      "Less powerful automation workflows than some competitors",
    ],
    summary:
      "Bonsai is the all-in-one solution for freelancers who want contracts, invoicing, and time tracking in one clean platform. It's particularly popular with designers, photographers, and coaches who want a professional client experience without the learning curve of more complex tools.",
    fullDescription:
      "Bonsai was built specifically for freelancers, and it shows. Every feature in the platform is designed around the freelancer workflow: win a client, send a contract, track your time, send an invoice, get paid. It handles that loop better than almost anything else on the market.\n\nThe contract templates are a standout. Bonsai includes professionally drafted contracts for dozens of freelance niches — photographers, designers, consultants, coaches — so you're not starting from a blank document or paying a lawyer for a basic agreement. Clients sign electronically and receive a copy automatically.\n\nTime tracking is baked directly into projects. Start a timer when you begin work, and Bonsai tracks it against the project budget. When it's time to invoice, your hours convert to billable items with one click.\n\nBonsai's tax features are surprisingly useful for freelancers who hate tax season. The platform estimates your quarterly tax obligations based on your income and automatically sets aside the appropriate percentage — so you're not scrambling to cover a surprise tax bill in April.\n\nFor freelancers who want a polished client experience without spending hours on setup, Bonsai is one of the easiest platforms to get running quickly.",
    faqs: [
      {
        question: "Is Bonsai good for photographers?",
        answer:
          "Yes. Bonsai is popular with photographers for its contract templates, invoice automation, and client portal. Many photographers appreciate the pre-built photography contract templates that are legally sound and ready to customize.",
      },
      {
        question: "Does Bonsai have time tracking?",
        answer:
          "Yes. Bonsai includes built-in time tracking that ties directly to projects and invoices. Start a timer when you begin work and convert tracked hours to an invoice with one click.",
      },
      {
        question: "Can clients sign contracts in Bonsai?",
        answer:
          "Yes. Bonsai includes e-signature functionality. Clients receive a link to review and sign the contract electronically, and both parties receive a PDF copy after signing.",
      },
      {
        question: "Is there a Bonsai free trial?",
        answer:
          "Bonsai offers a 14-day free trial with no credit card required.",
      },
    ],
  },
}

export const toolsList = Object.values(tools)

export function getToolsByCategory(category: string): Tool[] {
  return toolsList.filter((t) => t.bestFor.includes(category))
}

export const categories = [
  { slug: "cleaning-businesses", label: "Cleaning Businesses", icon: "🧹", description: "House cleaners, commercial cleaning, maid services" },
  { slug: "photographers", label: "Photographers", icon: "📷", description: "Wedding, portrait, commercial, and event photographers" },
  { slug: "landscapers", label: "Landscapers", icon: "🌿", description: "Lawn care, landscaping, and tree service companies" },
  { slug: "personal-trainers", label: "Personal Trainers", icon: "💪", description: "Personal trainers, fitness coaches, and gym owners" },
  { slug: "contractors", label: "Contractors", icon: "🔨", description: "General contractors, remodelers, and specialty trades" },
  { slug: "freelancers", label: "Freelancers", icon: "💻", description: "Designers, writers, consultants, and virtual assistants" },
]

export const categoryToolMap: Record<string, string[]> = {
  "cleaning-businesses": ["jobber", "housecallpro", "freshbooks"],
  "photographers": ["honeybook", "freshbooks", "bonsai"],
  "landscapers": ["jobber", "housecallpro", "freshbooks"],
  "personal-trainers": ["honeybook", "bonsai"],
  "contractors": ["jobber", "housecallpro", "freshbooks"],
  "freelancers": ["honeybook", "freshbooks", "bonsai"],
}

export const comparisons = [
  { slug: "jobber-vs-housecall-pro", tool1: "jobber", tool2: "housecallpro", label: "Jobber vs Housecall Pro" },
  { slug: "honeybook-vs-bonsai", tool1: "honeybook", tool2: "bonsai", label: "HoneyBook vs Bonsai" },
  { slug: "freshbooks-vs-bonsai", tool1: "freshbooks", tool2: "bonsai", label: "FreshBooks vs Bonsai" },
]
