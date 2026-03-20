import type { Metadata } from "next"
import Link from "next/link"
import { tools, categories } from "../lib/tools"

export const metadata: Metadata = {
  title: "RunToolkit — Find the Best Software for Your Service Business",
  description:
    "Independent reviews and comparisons of the best software tools for service businesses. Find the right tool for cleaners, photographers, landscapers, contractors, and more.",
  openGraph: {
    title: "RunToolkit — Find the Best Software for Your Service Business",
    description:
      "Independent reviews and comparisons of the best software tools for service businesses.",
    url: "https://runtoolkit.com",
  },
  alternates: {
    canonical: "https://runtoolkit.com",
  },
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
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
      <span className="text-sm font-medium text-slate-700 ml-1">{rating}</span>
    </div>
  )
}

export default function HomePage() {
  const featuredTools = [tools.jobber, tools.honeybook, tools.freshbooks]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RunToolkit",
    url: "https://runtoolkit.com",
    description: "Independent reviews and comparisons of software tools for service businesses",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://runtoolkit.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-blue-200 text-sm font-semibold uppercase tracking-widest mb-4">
            Independent Software Reviews
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            Find the Best Software for<br />Your Service Business
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Honest, in-depth reviews of scheduling, CRM, and invoicing tools for cleaners,
            photographers, landscapers, trainers, and contractors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/best-tools/cleaning-businesses"
              className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Find Your Best Tools
            </Link>
            <Link
              href="/reviews/jobber"
              className="border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Read Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-3">
            What Kind of Business Do You Run?
          </h2>
          <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
            We&apos;ve matched the best tools to each business type so you don&apos;t have to wade through hundreds of options.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/best-tools/${cat.slug}`}
                className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="text-3xl mb-3">{cat.icon}</div>
                <h3 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-1">
                  {cat.label}
                </h3>
                <p className="text-sm text-slate-500">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Reviews */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-3">
            Top-Rated Tools
          </h2>
          <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">
            Our highest-rated software picks based on ease of use, features, support, and value.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTools.map((tool) => (
              <div
                key={tool.slug}
                className="border border-slate-200 rounded-xl p-6 flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{tool.name}</h3>
                  <StarRating rating={tool.rating} />
                </div>
                <p className="text-slate-600 text-sm mb-4 flex-1">{tool.tagline}</p>
                <p className="text-xs text-slate-400 mb-1 font-medium uppercase tracking-wide">Best for</p>
                <p className="text-sm text-slate-600 mb-4 capitalize">
                  {tool.bestFor.slice(0, 3).join(", ")}
                </p>
                <p className="text-sm font-semibold text-blue-600 mb-4">{tool.pricing}</p>
                <div className="flex gap-3">
                  <Link
                    href={`/reviews/${tool.slug}`}
                    className="flex-1 text-center text-sm font-medium border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Read Review
                  </Link>
                  <a
                    href={tool.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="flex-1 text-center text-sm font-medium bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Try Free
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/reviews/jobber" className="text-blue-600 font-medium hover:underline">
              View all reviews &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How We Review */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4">How We Review Software</h2>
          <p className="text-slate-500 mb-12 max-w-xl mx-auto">
            Our editorial process is designed to give you unbiased, useful information — not marketing copy.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🔍",
                title: "Hands-On Testing",
                desc: "We sign up for free trials, run real workflows, and test every major feature before publishing a review.",
              },
              {
                icon: "📊",
                title: "Consistent Criteria",
                desc: "Every tool is rated on the same dimensions: ease of use, features, value, support, and scalability.",
              },
              {
                icon: "🤝",
                title: "Transparent Affiliates",
                desc: "We participate in affiliate programs but never let commissions influence our ratings or recommendations.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Articles */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 text-center mb-10">
            From the Blog
          </h2>
          <div className="space-y-4">
            {[
              { href: "/blog/best-crm-for-cleaning-businesses-2026", title: "Best CRM for Cleaning Businesses 2026", date: "Jan 15, 2026" },
              { href: "/blog/honeybook-vs-bonsai-complete-comparison", title: "HoneyBook vs Bonsai: Which Is Better for Freelancers?", date: "Feb 22, 2026" },
              { href: "/blog/bonsai-review-2026", title: "Bonsai Review 2026: Is It Worth It for Freelancers?", date: "Mar 10, 2026" },
              { href: "/blog/best-software-independent-contractors-2026", title: "Best Software for Independent Contractors 2026", date: "Feb 15, 2026" },
            ].map((post) => (
              <Link
                key={post.href}
                href={post.href}
                className="flex items-center justify-between p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <span className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </span>
                <span className="text-sm text-slate-400 ml-4 shrink-0">{post.date}</span>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="text-blue-600 font-medium hover:underline">
              View all articles &rarr;
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
