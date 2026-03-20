import type { Metadata } from "next"
import Link from "next/link"
import { articles } from "../../lib/articles"
import { tools } from "../../lib/tools"

export const metadata: Metadata = {
  title: "Blog — Software Guides for Service Businesses | RunToolkit",
  description:
    "In-depth guides, comparisons, and tips to help service businesses find and use the right software tools. For cleaners, photographers, contractors, trainers, and more.",
  openGraph: {
    title: "RunToolkit Blog — Software Guides for Service Businesses",
    description: "Software guides and reviews for service businesses.",
    url: "https://runtoolkit.com/blog",
  },
  alternates: {
    canonical: "https://runtoolkit.com/blog",
  },
}

const categoryColors: Record<string, string> = {
  "Best Tools": "bg-blue-100 text-blue-700",
  Comparisons: "bg-purple-100 text-purple-700",
  Guides: "bg-green-100 text-green-700",
  Reviews: "bg-orange-100 text-orange-700",
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export default function BlogPage() {
  const sorted = [...articles].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  // Group by category
  const allCategories = Array.from(new Set(sorted.map((a) => a.category)))
  const groupedByCategory: Record<string, typeof sorted> = {}
  for (const cat of allCategories) {
    groupedByCategory[cat] = sorted.filter((a) => a.category === cat)
  }

  // Collect all tool slugs mentioned across articles (for quick-nav)
  const mentionedToolSlugs = Array.from(
    new Set(sorted.flatMap((a) => a.relatedTools))
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span className="text-slate-600">Blog</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Blog</h1>
      <p className="text-lg text-slate-500 mb-4">
        In-depth guides and comparisons to help service businesses find and use the right software.
      </p>

      {/* Quick topic nav */}
      <div className="flex flex-wrap gap-2 mb-10">
        {allCategories.map((cat) => (
          <a
            key={cat}
            href={`#${cat.toLowerCase().replace(/\s+/g, "-")}`}
            className={`text-xs font-semibold px-3 py-1.5 rounded-full cursor-pointer border transition-colors ${
              categoryColors[cat]
                ? categoryColors[cat] + " border-transparent hover:opacity-80"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:border-slate-300"
            }`}
          >
            {cat} ({groupedByCategory[cat].length})
          </a>
        ))}
        <span className="text-xs text-slate-400 self-center ml-1">
          {sorted.length} articles total
        </span>
      </div>

      {/* Articles grouped by category */}
      <div className="space-y-12">
        {allCategories.map((cat) => (
          <section key={cat} id={cat.toLowerCase().replace(/\s+/g, "-")}>
            <div className="flex items-center gap-3 mb-5">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded ${
                  categoryColors[cat] || "bg-slate-100 text-slate-600"
                }`}
              >
                {cat}
              </span>
              <h2 className="text-xl font-bold text-slate-800">{cat}</h2>
            </div>
            <div className="space-y-4">
              {groupedByCategory[cat].map((article) => (
                <Link
                  key={article.slug}
                  href={`/blog/${article.slug}`}
                  className="block border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm text-slate-400">{formatDate(article.publishedAt)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
                    {article.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">{article.description}</p>
                  <div className="flex items-center justify-between">
                    {article.relatedTools.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {article.relatedTools.map((toolSlug) => {
                          const t = tools[toolSlug]
                          return t ? (
                            <span
                              key={toolSlug}
                              className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium"
                            >
                              {t.name}
                            </span>
                          ) : null
                        })}
                      </div>
                    )}
                    <span className="ml-auto text-sm font-medium text-blue-600 group-hover:underline shrink-0">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Tool review links at bottom */}
      <div className="mt-12 border-t border-slate-200 pt-8">
        <h3 className="font-semibold text-slate-700 mb-4">Read Our Full Tool Reviews</h3>
        <div className="flex flex-wrap gap-3">
          {mentionedToolSlugs.map((toolSlug) => {
            const t = tools[toolSlug]
            return t ? (
              <Link
                key={toolSlug}
                href={`/reviews/${toolSlug}`}
                className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
              >
                {t.name} Review
              </Link>
            ) : null
          })}
        </div>
      </div>
    </div>
  )
}
