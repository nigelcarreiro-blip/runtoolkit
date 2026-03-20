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
    affiliateUrl: "JOBBER_AFFILIATE_URL",
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
    affiliateUrl: "HONEYBOOK_AFFILIATE_URL",
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
  dubsado: {
    name: "Dubsado",
    slug: "dubsado",
    tagline: "CRM and workflow automation for freelancers and service businesses",
    rating: 4.5,
    affiliateUrl: "DUBSADO_AFFILIATE_URL",
    logo: "/logos/dubsado.svg",
    category: "crm",
    pricing: "Starting at $20/month",
    pricingTiers: [
      {
        name: "Starter",
        price: "$20/month",
        features: ["3 clients", "Unlimited projects", "Contracts", "Invoices"],
      },
      {
        name: "Premier",
        price: "$40/month",
        features: ["Unlimited clients", "Automations", "Scheduler", "Payment plans", "Lead capture"],
      },
    ],
    bestFor: ["photographers", "designers", "coaches", "virtual-assistants", "freelancers", "consultants"],
    pros: [
      "Highly customizable forms and workflows",
      "Unlimited projects on all plans",
      "Strong lead capture and pipeline management",
      "Branded client portal",
      "Flexible payment plans and schedules",
      "Lifetime deal often available",
    ],
    cons: [
      "Interface can feel dated compared to competitors",
      "Steeper learning curve to set up initially",
      "No native time tracking",
    ],
    summary:
      "Dubsado is the power-user's CRM. If you're willing to invest time in setup, you'll get an incredibly customized client management system. It's particularly popular with photographers, designers, and coaches who want complete control over their workflow.",
    fullDescription:
      "Dubsado positions itself as the most flexible CRM for creative freelancers, and it largely delivers on that promise. Unlike HoneyBook's more opinionated approach, Dubsado lets you build your client workflow almost from scratch — which means endless customization but also a steeper setup curve.\n\nThe canned emails, form builder, and workflow automation are the heart of the platform. You can create multi-step workflows that automatically send emails, assign tasks, request signatures, and collect payments based on triggers you define. Once configured, these workflows make your business feel like it runs itself.\n\nDubsado's client portal gives each client a branded space to view their project, sign contracts, pay invoices, and fill out questionnaires. It creates a professional impression even for solo freelancers just starting out.",
    faqs: [
      {
        question: "How does Dubsado compare to HoneyBook?",
        answer:
          "Dubsado offers more customization and flexibility, while HoneyBook is more polished out of the box. If you want full control and don't mind setup time, choose Dubsado. If you want something that looks great immediately, choose HoneyBook.",
      },
      {
        question: "Can I try Dubsado for free?",
        answer:
          "Yes. Dubsado offers a free plan limited to 3 clients — enough to fully test the platform before upgrading.",
      },
      {
        question: "Does Dubsado have scheduling built in?",
        answer:
          "Yes. Dubsado includes a scheduler on the Premier plan that lets clients book appointments based on your availability.",
      },
      {
        question: "Is Dubsado good for photographers?",
        answer:
          "Dubsado is very popular among photographers for its workflow automation, contract and questionnaire tools, and payment scheduling features.",
      },
    ],
  },
  housecallpro: {
    name: "Housecall Pro",
    slug: "housecallpro",
    tagline: "All-in-one software for home service businesses",
    rating: 4.7,
    affiliateUrl: "HOUSECALL_PRO_AFFILIATE_URL",
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
  "17hats": {
    name: "17hats",
    slug: "17hats",
    tagline: "Business management software for small service businesses",
    rating: 4.3,
    affiliateUrl: "17HATS_AFFILIATE_URL",
    logo: "/logos/17hats.svg",
    category: "business-management",
    pricing: "Starting at $45/month",
    pricingTiers: [
      {
        name: "Solo",
        price: "$45/month",
        features: ["1 user", "Contracts", "Invoices", "Questionnaires", "Workflows"],
      },
      {
        name: "Starting Out",
        price: "$499/year",
        features: ["All Solo features", "1,000 contacts", "Email marketing", "Lead pipeline"],
      },
      {
        name: "Bookkeeper",
        price: "$699/year",
        features: ["Everything", "Bookkeeping reports", "P&L statements", "Expense tracking"],
      },
    ],
    bestFor: ["photographers", "event-planners", "designers", "coaches", "consultants", "solo-freelancers"],
    pros: [
      "Strong bookkeeping and accounting features",
      "All-in-one: CRM, contracts, invoices, and bookkeeping",
      "Good workflow automation",
      "Questionnaire builder",
      "Solid email templates",
    ],
    cons: [
      "Interface feels older than competitors",
      "Limited to smaller teams",
      "Less polished client-facing experience",
    ],
    summary:
      "17hats is a solid choice for solo service providers who want CRM, contracts, invoices, and basic bookkeeping in one tool. It's particularly valued by freelancers who also need expense tracking and profit/loss reports.",
    fullDescription:
      "17hats has been around longer than most of its competitors, and it shows both in its deep feature set and its somewhat dated interface. That said, it remains a practical choice for solo freelancers who want everything under one roof — especially those who also need bookkeeping.\n\nWhile Dubsado and HoneyBook focus on client experience, 17hats takes a more business-management-oriented approach. The bookkeeping features let you track income, expenses, and generate profit and loss reports — functionality that normally requires a separate tool like Wave or QuickBooks.\n\nFor photographers, event planners, and consultants who want a single subscription that covers CRM, contracts, invoicing, and financials, 17hats remains a compelling option despite stiffer competition in recent years.",
    faqs: [
      {
        question: "Does 17hats have a mobile app?",
        answer:
          "17hats has a mobile app for iOS and Android that lets you manage leads, send invoices, and view your calendar on the go.",
      },
      {
        question: "Is 17hats good for photographers?",
        answer:
          "Yes. 17hats is popular with photographers for its contract, questionnaire, and workflow features. The bookkeeping tools are a bonus for those who want to avoid a separate accounting subscription.",
      },
      {
        question: "How does 17hats compare to Dubsado?",
        answer:
          "Both serve similar audiences. Dubsado has more automation flexibility and a better client portal. 17hats has stronger built-in bookkeeping. If accounting features matter, consider 17hats.",
      },
      {
        question: "Does 17hats offer a free trial?",
        answer:
          "17hats offers a 7-day free trial.",
      },
    ],
  },
  acuity: {
    name: "Acuity Scheduling",
    slug: "acuity",
    tagline: "Online scheduling software that makes booking effortless",
    rating: 4.7,
    affiliateUrl: "ACUITY_AFFILIATE_URL",
    logo: "/logos/acuity.svg",
    category: "scheduling",
    pricing: "Starting at $20/month",
    pricingTiers: [
      {
        name: "Emerging",
        price: "$20/month",
        features: ["1 calendar", "Unlimited appointments", "Custom forms", "Payment processing"],
      },
      {
        name: "Growing",
        price: "$34/month",
        features: ["6 calendars", "Text reminders", "Group classes", "Subscriptions"],
      },
      {
        name: "Powerhouse",
        price: "$61/month",
        features: ["36 calendars", "Multiple locations", "Custom API", "Removal of Acuity branding"],
      },
    ],
    bestFor: ["personal-trainers", "coaches", "therapists", "photographers", "tutors", "consultants", "salons"],
    pros: [
      "Extremely easy for clients to self-book",
      "Syncs with Google, Outlook, and iCal",
      "Automated email and SMS reminders",
      "Accepts payment at booking via Stripe or PayPal",
      "Group classes and packages",
      "Integrates with Zoom for virtual sessions",
    ],
    cons: [
      "Not a full CRM — scheduling-focused only",
      "Customization is limited on lower plans",
      "No built-in contracts or proposals",
    ],
    summary:
      "Acuity Scheduling is the most client-friendly online booking tool available. Personal trainers, coaches, and therapists love it because clients can self-book 24/7, pay a deposit or full amount at booking, and receive automatic reminders — all without any manual effort.",
    fullDescription:
      "Acuity Scheduling (owned by Squarespace) focuses entirely on one thing: making it easy for clients to book time with you. And it does that better than almost anything else on the market.\n\nThe booking page is clean, fast, and works on any device. Clients choose the service type, see your real-time availability, pick a time, fill out any intake forms you require, and pay — all in a few clicks. You get notified, and both of you receive calendar invites automatically.\n\nFor personal trainers, the package feature is particularly valuable. Sell a 10-session pack, and Acuity tracks how many sessions the client has used. Classes and group bookings work similarly, making it useful for yoga studios, boot camps, and group coaching programs.\n\nAcuity doesn't try to be a full CRM, and that focus is its strength. If you need contracts and workflows on top of scheduling, pair it with HoneyBook or Dubsado.",
    faqs: [
      {
        question: "Is Acuity good for personal trainers?",
        answer:
          "Acuity is one of the best scheduling tools for personal trainers. Session packages, payment collection at booking, intake forms, and automatic reminders make it ideal for trainers working with multiple clients.",
      },
      {
        question: "Can Acuity handle group classes?",
        answer:
          "Yes. Acuity supports group classes with a maximum participant limit, making it suitable for fitness studios, yoga teachers, and group coaching.",
      },
      {
        question: "Does Acuity integrate with Zoom?",
        answer:
          "Yes. Acuity automatically generates a unique Zoom link for each virtual appointment and includes it in the confirmation email.",
      },
      {
        question: "Is there a free version of Acuity?",
        answer:
          "Acuity no longer offers a permanent free plan, but it does offer a 7-day free trial.",
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
  "cleaning-businesses": ["jobber", "housecallpro", "acuity"],
  "photographers": ["honeybook", "dubsado", "17hats", "acuity"],
  "landscapers": ["jobber", "housecallpro"],
  "personal-trainers": ["acuity", "honeybook", "dubsado"],
  "contractors": ["jobber", "housecallpro"],
  "freelancers": ["dubsado", "honeybook", "17hats", "acuity"],
}

export const comparisons = [
  { slug: "jobber-vs-housecall-pro", tool1: "jobber", tool2: "housecallpro", label: "Jobber vs Housecall Pro" },
  { slug: "honeybook-vs-dubsado", tool1: "honeybook", tool2: "dubsado", label: "HoneyBook vs Dubsado" },
  { slug: "jobber-vs-dubsado", tool1: "jobber", tool2: "dubsado", label: "Jobber vs Dubsado" },
]
