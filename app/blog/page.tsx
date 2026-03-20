import type { Metadata } from "next"
import Link from "next/link"
import { articles } from "../../lib/articles"

export const metadata: Metadata = {
  title: "Blog — Software Guides for Service Businesses",
  description:
    "In-depth guides, comparisons, and tips to help service businesses find and use the right software tools. For cleaners, photographers, contractors, trainers, and more.",
  openGraph: {
    title: "RunToolkit Blog",
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

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <span className="text-slate-600">Blog</span>
      </nav>

      <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3">Blog</h1>
      <p className="text-lg text-slate-500 mb-10">
        In-depth guides and comparisons to help service businesses find and use the right software.
      </p>

      <div className="space-y-6">
        {sorted.map((article) => (
          <Link
            key={article.slug}
            href={`/blog/${article.slug}`}
            className="block border border-slate-200 rounded-xl p-6 hover:border-blue-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  categoryColors[article.category] || "bg-slate-100 text-slate-600"
                }`}
              >
                {article.category}
              </span>
              <span className="text-sm text-slate-400">{formatDate(article.publishedAt)}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors mb-2">
              {article.title}
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed">{article.description}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-xs text-slate-400">
                {article.relatedTools.length > 0
                  ? `Covers: ${article.relatedTools.map((s) => s.charAt(0).toUpperCase() + s.slice(1)).join(", ")}`
                  : ""}
              </span>
              <span className="ml-auto text-sm font-medium text-blue-600 group-hover:underline">
                Read more &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
