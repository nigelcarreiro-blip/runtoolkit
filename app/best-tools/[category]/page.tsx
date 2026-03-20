import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { tools, categories, categoryToolMap, comparisons } from "../../../lib/tools"
import { articles } from "../../../lib/articles"

type Props = {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) return {}
  return {
    title: `Best Software for ${cat.label} 2026 | RunToolkit`,
    description: `The best CRM, scheduling, and invoicing software for ${cat.label.toLowerCase()} in 2026. Ranked and reviewed with honest pros, cons, and pricing.`,
    openGraph: {
      title: `Best Software for ${cat.label} 2026`,
      description: `Top software picks for ${cat.label.toLowerCase()} — compared and reviewed.`,
      url: `https://runtoolkit.com/best-tools/${category}`,
    },
    alternates: {
      canonical: `https://runtoolkit.com/best-tools/${category}`,
    },
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= Math.round(rating) ? "text-yellow-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-sm font-semibold text-slate-700 ml-1">{rating}</span>
    </div>
  )
}

const categoryDetails: Record<string, { intro: string; considerations: string[] }> = {
  "cleaning-businesses": {
    intro:
      "Running a cleaning business means managing recurring appointments, dispatching crews, collecting payments, and keeping clients happy — all at once. The right software turns that chaos into a professional, repeatable operation.",
    considerations: [
      "Recurring job scheduling with automatic propagation",
      "Online booking so clients can book without calling",
      "Automatic invoicing after job completion",
      "Client notes for property-specific instructions",
    ],
  },
  photographers: {
    intro:
      "Photographers need software that handles the entire client journey — from first inquiry to final gallery delivery. The best tools combine contracts, invoices, workflows, and scheduling in one platform.",
    considerations: [
      "Beautiful, branded proposals and contracts",
      "Online payment collection with deposit support",
      "Automated workflow sequences (inquiry → booking → delivery)",
      "Client questionnaires and intake forms",
    ],
  },
  landscapers: {
    intro:
      "Landscaping businesses need to schedule crews across multiple properties, track job progress in the field, and invoice quickly after each visit. Field service management software is purpose-built for exactly this.",
    considerations: [
      "Multi-crew scheduling and dispatching",
      "GPS tracking for field technicians",
      "Recurring job management for seasonal contracts",
      "Mobile app reliability in areas with poor signal",
    ],
  },
  "personal-trainers": {
    intro:
      "Personal trainers need to fill their schedule, collect payment reliably, and spend more time training and less time on admin. Scheduling software with package support and automated reminders is essential.",
    considerations: [
      "Session packages with usage tracking",
      "Self-booking so clients book without calling",
      "Payment collection at booking time",
      "Automated reminders to reduce no-shows",
    ],
  },
  contractors: {
    intro:
      "Independent contractors need professional quoting, reliable scheduling, and fast invoicing. The right software makes you look like a larger operation and gets you paid faster.",
    considerations: [
      "Professional quote and estimate builder",
      "Job tracking from estimate to invoice",
      "Online payment acceptance",
      "Mobile access for field use",
    ],
  },
  freelancers: {
    intro:
      "Freelancers need to manage client relationships, send contracts, collect payments, and stay organized — without spending hours on administration. A good CRM automates the repetitive parts of client management.",
    considerations: [
      "Lead pipeline to track prospects",
      "Contract and signature management",
      "Automated payment reminders",
      "Workflow automation for recurring processes",
    ],
  },
}

// Map category slugs to relevant compare page slugs
const categoryCompareMap: Record<string, string[]> = {
  "cleaning-businesses": ["jobber-vs-housecall-pro"],
  "photographers": ["honeybook-vs-bonsai"],
  "landscapers": ["jobber-vs-housecall-pro"],
  "personal-trainers": ["honeybook-vs-bonsai"],
  "contractors": ["jobber-vs-housecall-pro"],
  "freelancers": ["honeybook-vs-bonsai", "freshbooks-vs-bonsai"],
}

export default async function BestToolsCategoryPage({ params }: Props) {
  const { category } = await params
  const cat = categories.find((c) => c.slug === category)
  if (!cat) notFound()

  const toolSlugs = categoryToolMap[category] || []
  const categoryTools = toolSlugs.map((slug) => tools[slug]).filter(Boolean)
  const details = categoryDetails[category]

  // Find relevant compare pages for this category
  const relatedCompareSlugs = categoryCompareMap[category] || []
  const relatedComparisons = comparisons.filter((c) => relatedCompareSlugs.includes(c.slug))

  // Find relevant blog articles — articles that mention at least one of the tools in this category
  const relatedArticles = articles
    .filter((a) => a.relatedTools.some((t) => toolSlugs.includes(t)))
    .slice(0, 5)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best Software for ${cat.label} 2026`,
    description: `Top software picks for ${cat.label.toLowerCase()}`,
    url: `https://runtoolkit.com/best-tools/${category}`,
    numberOfItems: categoryTools.length,
    itemListElement: categoryTools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: `https://runtoolkit.com/reviews/${tool.slug}`,
    })),
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://runtoolkit.com" },
      { "@type": "ListItem", position: 2, name: "Best Tools", item: "https://runtoolkit.com/best-tools/cleaning-businesses" },
      { "@type": "ListItem", position: 3, name: cat.label, item: `https://runtoolkit.com/best-tools/${category}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="hover:text-blue-600">Best Tools</span>
          <span>/</span>
          <span className="text-slate-600">{cat.label}</span>
        </nav>

        {/* Header */}
        <div className="mb-10">
          <div className="text-4xl mb-4">{cat.icon}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Best Software for {cat.label} in 2026
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed mb-6">{details?.intro}</p>

          {details?.considerations && (
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200">
              <p className="font-semibold text-slate-700 mb-3 text-sm">What to look for:</p>
              <ul className="space-y-1">
                {details.considerations.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="text-blue-500 mt-0.5">&#10003;</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Tool Cards */}
        <div className="space-y-8 mb-12">
          {categoryTools.map((tool, i) => (
            <div key={tool.slug} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="flex items-center gap-4 bg-slate-50 border-b border-slate-200 px-6 py-4">
                <span className="text-2xl font-bold text-slate-300">#{i + 1}</span>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-slate-800">{tool.name}</h2>
                  <StarRating rating={tool.rating} />
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-blue-600">{tool.pricing}</p>
                  {i === 0 && (
                    <span className="inline-block text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded mt-1">
                      Top Pick
                    </span>
                  )}
                </div>
              </div>
              <div className="p-6">
                <p className="text-slate-700 mb-4 leading-relaxed">{tool.summary}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Pros</p>
                    <ul className="space-y-1">
                      {tool.pros.slice(0, 3).map((pro) => (
                        <li key={pro} className="text-sm text-slate-600 flex items-start gap-1.5">
                          <span className="text-green-500 shrink-0 mt-0.5 text-xs">&#10003;</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Cons</p>
                    <ul className="space-y-1">
                      {tool.cons.slice(0, 2).map((con) => (
                        <li key={con} className="text-sm text-slate-600 flex items-start gap-1.5">
                          <span className="text-red-400 shrink-0 mt-0.5 text-xs">&#10007;</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link
                    href={`/reviews/${tool.slug}`}
                    className="flex-1 sm:flex-none text-center text-sm font-medium border border-blue-600 text-blue-600 py-2 px-5 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Read Full {tool.name} Review
                  </Link>
                  <a
                    href={tool.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex-1 sm:flex-none text-center text-sm font-medium bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try {tool.name} Free &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Related Comparisons */}
        {relatedComparisons.length > 0 && (
          <div className="mb-10 border border-blue-200 bg-blue-50 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-2">Compare These Tools Head-to-Head</h2>
            <p className="text-sm text-slate-600 mb-4">
              Not sure which tool is right for your {cat.label.toLowerCase()} business? Read our detailed side-by-side comparisons.
            </p>
            <div className="flex flex-wrap gap-3">
              {relatedComparisons.map((c) => {
                const t1 = tools[c.tool1]
                const t2 = tools[c.tool2]
                return (
                  <Link
                    key={c.slug}
                    href={`/compare/${c.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 border border-blue-300 bg-white px-4 py-2 rounded-lg hover:bg-blue-100 hover:border-blue-400 transition-colors"
                  >
                    {t1?.name} vs {t2?.name} &rarr;
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Guides for {cat.label}
            </h2>
            <div className="space-y-3">
              {relatedArticles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/blog/${a.slug}`}
                  className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
                >
                  <div>
                    <span className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors block">
                      {a.title}
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5 block">{a.category}</span>
                  </div>
                  <span className="text-sm text-blue-600 ml-4 shrink-0">&rarr;</span>
                </Link>
              ))}
            </div>
            <div className="mt-4">
              <Link href="/blog" className="text-sm text-blue-600 hover:underline font-medium">
                View all guides and articles &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* Browse other categories */}
        <div className="border-t border-slate-200 pt-8">
          <h3 className="font-semibold text-slate-700 mb-4">Browse Other Business Types</h3>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== category)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/best-tools/${c.slug}`}
                  className="text-sm text-slate-600 border border-slate-200 px-3 py-1.5 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-colors"
                >
                  {c.icon} Best Tools for {c.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
