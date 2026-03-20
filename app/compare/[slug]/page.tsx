import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { tools, comparisons } from "../../../lib/tools"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) return {}
  const tool1 = tools[comparison.tool1]
  const tool2 = tools[comparison.tool2]
  if (!tool1 || !tool2) return {}
  return {
    title: `${tool1.name} vs ${tool2.name} 2026: Which Is Better?`,
    description: `${tool1.name} vs ${tool2.name} — side-by-side comparison of pricing, features, and best use cases. Find out which is right for your service business.`,
    openGraph: {
      title: `${tool1.name} vs ${tool2.name} 2026`,
      description: `Which is better: ${tool1.name} or ${tool2.name}? Full comparison.`,
      url: `https://runtoolkit.com/compare/${slug}`,
    },
    alternates: {
      canonical: `https://runtoolkit.com/compare/${slug}`,
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
      <span className="text-sm font-bold text-slate-700 ml-1">{rating}/5</span>
    </div>
  )
}

type ComparisonRow = {
  feature: string
  tool1Value: string
  tool2Value: string
  winner?: "tool1" | "tool2" | "tie"
}

function buildComparisonRows(tool1Key: string, tool2Key: string): ComparisonRow[] {
  const t1 = tools[tool1Key]
  const t2 = tools[tool2Key]

  const rows: ComparisonRow[] = [
    {
      feature: "Starting Price",
      tool1Value: t1.pricing,
      tool2Value: t2.pricing,
      winner: "tie",
    },
    {
      feature: "Our Rating",
      tool1Value: `${t1.rating} / 5.0`,
      tool2Value: `${t2.rating} / 5.0`,
      winner: t1.rating > t2.rating ? "tool1" : t2.rating > t1.rating ? "tool2" : "tie",
    },
    {
      feature: "Best For",
      tool1Value: t1.bestFor.slice(0, 3).join(", "),
      tool2Value: t2.bestFor.slice(0, 3).join(", "),
      winner: "tie",
    },
    {
      feature: "Category",
      tool1Value: t1.category.replace("-", " "),
      tool2Value: t2.category.replace("-", " "),
      winner: "tie",
    },
    {
      feature: "Free Trial",
      tool1Value: "Yes, 14 days",
      tool2Value: "Yes, 7–14 days",
      winner: "tie",
    },
  ]

  return rows
}

const verdicts: Record<string, { summary: string; chooseFirst: string[]; chooseSecond: string[] }> = {
  "jobber-vs-housecall-pro": {
    summary:
      "Both Jobber and Housecall Pro are excellent field service management tools for home service businesses. Jobber has a more powerful scheduling engine and better reporting. Housecall Pro is simpler to set up and has stronger built-in marketing features.",
    chooseFirst: [
      "You have multiple crews or 3+ employees",
      "You want detailed revenue and performance reporting",
      "You want a more powerful scheduling calendar",
      "Client self-service and professional proposals matter to you",
    ],
    chooseSecond: [
      "You're a solo operator or small team wanting simple setup",
      "You want built-in automated review collection",
      "Cash flow matters and instant payouts are attractive",
      "You want postcard marketing to past customers",
    ],
  },
  "honeybook-vs-bonsai": {
    summary:
      "HoneyBook and Bonsai both serve creative freelancers but with different strengths. HoneyBook has more powerful automation workflows and a more polished client experience. Bonsai has built-in time tracking, tax tools, and great contract templates — and is easier to set up.",
    chooseFirst: [
      "You want powerful automation workflows",
      "Client-facing polish is important to your brand",
      "You're a photographer or wedding planner with a complex client process",
      "You need scheduling built in",
    ],
    chooseSecond: [
      "You bill by the hour and need time tracking built in",
      "You want a fast setup with minimal configuration",
      "Tax estimation tools are valuable to you",
      "You're a designer, consultant, or coach who wants an all-in-one freelancer tool",
    ],
  },
  "freshbooks-vs-bonsai": {
    summary:
      "FreshBooks and Bonsai both target freelancers but serve different needs. FreshBooks is primarily an accounting and invoicing tool with strong expense tracking and reporting. Bonsai is a client management tool that covers contracts, proposals, invoicing, and time tracking.",
    chooseFirst: [
      "You want strong accounting features — P&L reports, expense tracking",
      "You connect to your bank account for automatic transaction import",
      "Your primary need is professional invoicing and tax prep",
      "You have a bookkeeper who needs access to clean financial records",
    ],
    chooseSecond: [
      "You need contracts and e-signatures alongside invoicing",
      "You want a full client portal for document sharing",
      "You bill by the hour and need integrated time tracking",
      "You're just starting out and want one tool that covers everything",
    ],
  },
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) notFound()

  const tool1 = tools[comparison.tool1]
  const tool2 = tools[comparison.tool2]
  if (!tool1 || !tool2) notFound()

  const rows = buildComparisonRows(comparison.tool1, comparison.tool2)
  const verdict = verdicts[slug]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${tool1.name} vs ${tool2.name} 2026: Which Is Better?`,
    description: `Side-by-side comparison of ${tool1.name} and ${tool2.name} for service businesses.`,
    author: { "@type": "Organization", name: "RunToolkit" },
    publisher: { "@type": "Organization", name: "RunToolkit", url: "https://runtoolkit.com" },
    datePublished: "2026-01-01",
    dateModified: "2026-03-18",
    url: `https://runtoolkit.com/compare/${slug}`,
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://runtoolkit.com" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://runtoolkit.com/compare/jobber-vs-housecall-pro" },
      { "@type": "ListItem", position: 3, name: comparison.label, item: `https://runtoolkit.com/compare/${slug}` },
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
          <span className="text-slate-500">Compare</span>
          <span>/</span>
          <span className="text-slate-600">{comparison.label}</span>
        </nav>

        {/* Header */}
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
          {tool1.name} vs {tool2.name} (2026): Which Is Better?
        </h1>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed">
          Both {tool1.name} and {tool2.name} are popular choices for service businesses, but they&apos;re built for different needs.
          Here&apos;s a complete side-by-side comparison to help you choose.
        </p>

        {/* Side-by-side hero */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {[tool1, tool2].map((tool, i) => (
            <div
              key={tool.slug}
              className={`border rounded-xl p-6 text-center ${i === 0 ? "border-blue-300 bg-blue-50" : "border-slate-200"}`}
            >
              <h2 className="text-xl font-bold text-slate-800 mb-2">{tool.name}</h2>
              <StarRating rating={tool.rating} />
              <p className="text-sm text-slate-600 mt-3 mb-3 leading-relaxed">{tool.tagline}</p>
              <p className="text-sm font-semibold text-blue-600 mb-4">{tool.pricing}</p>
              <a
                href={tool.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="inline-block w-full text-sm font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try {tool.name} &rarr;
              </a>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Side-by-Side Comparison</h2>
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left px-5 py-3 font-semibold text-slate-600 w-1/3">Feature</th>
                  <th className="text-left px-5 py-3 font-semibold text-blue-600 w-1/3">{tool1.name}</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600 w-1/3">{tool2.name}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                    <td className="px-5 py-3 font-medium text-slate-600 border-r border-slate-100">{row.feature}</td>
                    <td className={`px-5 py-3 border-r border-slate-100 ${row.winner === "tool1" ? "font-semibold text-green-700" : "text-slate-700"}`}>
                      {row.tool1Value}
                      {row.winner === "tool1" && <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Winner</span>}
                    </td>
                    <td className={`px-5 py-3 ${row.winner === "tool2" ? "font-semibold text-green-700" : "text-slate-700"}`}>
                      {row.tool2Value}
                      {row.winner === "tool2" && <span className="ml-2 text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Winner</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pros & Cons side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {[tool1, tool2].map((tool) => (
            <div key={tool.slug} className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-slate-800 mb-4">{tool.name} — Pros & Cons</h3>
              <div className="mb-3">
                <p className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">Pros</p>
                <ul className="space-y-1">
                  {tool.pros.slice(0, 4).map((pro) => (
                    <li key={pro} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-green-500 shrink-0 mt-0.5 text-xs">&#10003;</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">Cons</p>
                <ul className="space-y-1">
                  {tool.cons.map((con) => (
                    <li key={con} className="text-sm text-slate-600 flex items-start gap-2">
                      <span className="text-red-400 shrink-0 mt-0.5 text-xs">&#10007;</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Verdict */}
        {verdict && (
          <div className="mb-10">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Our Verdict</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6">
              <p className="text-slate-700 leading-relaxed">{verdict.summary}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-blue-200 rounded-xl p-5 bg-blue-50">
                <h3 className="font-bold text-blue-800 mb-3">Choose {tool1.name} if:</h3>
                <ul className="space-y-2">
                  {verdict.chooseFirst.map((item) => (
                    <li key={item} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-blue-500 shrink-0 mt-0.5">&#10003;</span> {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={tool1.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block mt-4 w-full text-center text-sm font-semibold bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try {tool1.name} Free &rarr;
                </a>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <h3 className="font-bold text-slate-800 mb-3">Choose {tool2.name} if:</h3>
                <ul className="space-y-2">
                  {verdict.chooseSecond.map((item) => (
                    <li key={item} className="text-sm text-slate-700 flex items-start gap-2">
                      <span className="text-slate-400 shrink-0 mt-0.5">&#10003;</span> {item}
                    </li>
                  ))}
                </ul>
                <a
                  href={tool2.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block mt-4 w-full text-center text-sm font-semibold bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Try {tool2.name} Free &rarr;
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Other comparisons */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500 mb-4">More comparisons:</p>
          <div className="flex flex-wrap gap-3">
            {comparisons
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {c.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
