import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { tools, toolsList } from "../../../lib/tools"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return toolsList.map((tool) => ({ slug: tool.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = tools[slug]
  if (!tool) return {}
  return {
    title: `${tool.name} Review 2026: Pricing, Pros & Cons, and Verdict`,
    description: `Read our in-depth ${tool.name} review. ${tool.tagline}. ${tool.pricing}. See who it's best for, full pros and cons, and whether it's worth it.`,
    openGraph: {
      title: `${tool.name} Review 2026`,
      description: tool.summary,
      url: `https://runtoolkit.com/reviews/${slug}`,
    },
    alternates: {
      canonical: `https://runtoolkit.com/reviews/${slug}`,
    },
  }
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-6 h-6 ${star <= Math.round(rating) ? "text-yellow-400" : "text-slate-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-2xl font-bold text-slate-800 ml-2">{rating}</span>
      <span className="text-slate-400 text-sm ml-1">/ 5.0</span>
    </div>
  )
}

export default async function ReviewPage({ params }: Props) {
  const { slug } = await params
  const tool = tools[slug]
  if (!tool) notFound()

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    name: `${tool.name} Review`,
    reviewBody: tool.summary,
    reviewRating: {
      "@type": "Rating",
      ratingValue: tool.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Organization",
      name: "RunToolkit",
    },
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: "BusinessApplication",
      offers: {
        "@type": "Offer",
        price: tool.pricingTiers[0].price,
        priceCurrency: "USD",
      },
    },
    publisher: {
      "@type": "Organization",
      name: "RunToolkit",
      url: "https://runtoolkit.com",
    },
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://runtoolkit.com" },
      { "@type": "ListItem", position: 2, name: "Reviews", item: "https://runtoolkit.com/reviews" },
      { "@type": "ListItem", position: 3, name: tool.name, item: `https://runtoolkit.com/reviews/${slug}` },
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
          <Link href="/reviews/jobber" className="hover:text-blue-600">Reviews</Link>
          <span>/</span>
          <span className="text-slate-600">{tool.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
                {tool.name} Review 2026
              </h1>
              <p className="text-lg text-slate-600">{tool.tagline}</p>
            </div>
            <a
              href={tool.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="shrink-0 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try {tool.name} Free &rarr;
            </a>
          </div>
          <StarRating rating={tool.rating} />
          <p className="text-sm text-slate-400 mt-2">Last updated: March 2026 &middot; Independently reviewed</p>
        </div>

        {/* Summary box */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-10">
          <h2 className="font-bold text-slate-800 text-lg mb-2">Our Verdict</h2>
          <p className="text-slate-700 leading-relaxed">{tool.summary}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Pros */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-green-700 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xs font-bold">+</span>
              Pros
            </h3>
            <ul className="space-y-2">
              {tool.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-green-500 mt-0.5 shrink-0">&#10003;</span>
                  {pro}
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-red-600 mb-3 flex items-center gap-2">
              <span className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center text-red-600 text-xs font-bold">-</span>
              Cons
            </h3>
            <ul className="space-y-2">
              {tool.cons.map((con) => (
                <li key={con} className="flex items-start gap-2 text-sm text-slate-700">
                  <span className="text-red-400 mt-0.5 shrink-0">&#10007;</span>
                  {con}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Facts */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-slate-700 mb-3">Quick Facts</h3>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-slate-400 text-xs uppercase tracking-wide font-medium">Starting Price</dt>
                <dd className="font-semibold text-slate-800">{tool.pricing}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs uppercase tracking-wide font-medium mt-3">Best For</dt>
                <dd className="text-slate-700 capitalize">{tool.bestFor.join(", ")}</dd>
              </div>
              <div>
                <dt className="text-slate-400 text-xs uppercase tracking-wide font-medium mt-3">Category</dt>
                <dd className="text-slate-700 capitalize">{tool.category.replace("-", " ")}</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Full Description */}
        <div className="prose mb-10">
          <h2>About {tool.name}</h2>
          {tool.fullDescription.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Pricing Tiers */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-4">{tool.name} Pricing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tool.pricingTiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`border rounded-xl p-5 ${i === 1 ? "border-blue-400 ring-1 ring-blue-200" : "border-slate-200"}`}
              >
                {i === 1 && (
                  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded mb-2">
                    Most Popular
                  </span>
                )}
                <h3 className="font-bold text-slate-800 mb-1">{tier.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-3">{tier.price}</p>
                <ul className="space-y-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-sm text-slate-600 flex items-center gap-2">
                      <span className="text-green-500 text-xs">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-slate-800 text-white rounded-xl p-8 text-center mb-10">
          <h2 className="text-2xl font-bold mb-2">Ready to try {tool.name}?</h2>
          <p className="text-slate-300 mb-6">Start a free trial — no credit card required.</p>
          <a
            href={tool.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="inline-block bg-blue-500 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-400 transition-colors"
          >
            Try {tool.name} Free &rarr;
          </a>
          <p className="text-xs text-slate-500 mt-4">
            This is an affiliate link. We may earn a commission at no extra cost to you.
          </p>
        </div>

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-slate-800 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {tool.faqs.map((faq) => (
              <div key={faq.question} className="border border-slate-200 rounded-lg p-5">
                <h3 className="font-semibold text-slate-800 mb-2">{faq.question}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nav to other reviews */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-sm text-slate-500 mb-4">Compare {tool.name} with other tools:</p>
          <div className="flex flex-wrap gap-3">
            {toolsList
              .filter((t) => t.slug !== slug)
              .slice(0, 4)
              .map((t) => (
                <Link
                  key={t.slug}
                  href={`/reviews/${t.slug}`}
                  className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {t.name} Review
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  )
}
