import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { articles, getArticleBySlug } from "../../../lib/articles"
import { tools, comparisons } from "../../../lib/tools"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return {
    title: `${article.title} | RunToolkit`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url: `https://runtoolkit.com/blog/${slug}`,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.author],
    },
    alternates: {
      canonical: `https://runtoolkit.com/blog/${slug}`,
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

// Render article content — replace affiliate placeholder strings with real links
function renderContent(content: string): string {
  return content
    .replace(/\[([^\]]+)\]\(JOBBER_AFFILIATE_URL\)/g, '<a href="https://getjobber.com" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline underline-offset-2 hover:text-blue-800">$1</a>')
    .replace(/\[([^\]]+)\]\(HONEYBOOK_AFFILIATE_URL\)/g, '<a href="https://www.honeybook.com" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline underline-offset-2 hover:text-blue-800">$1</a>')
.replace(/\[([^\]]+)\]\(HOUSECALL_PRO_AFFILIATE_URL\)/g, '<a href="https://www.housecallpro.com" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline underline-offset-2 hover:text-blue-800">$1</a>')
    .replace(/\[([^\]]+)\]\(FRESHBOOKS_AFFILIATE_URL\)/g, '<a href="https://www.freshbooks.com" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline underline-offset-2 hover:text-blue-800">$1</a>')
    .replace(/\[([^\]]+)\]\(BONSAI_AFFILIATE_URL\)/g, '<a href="https://www.hellobonsai.com" target="_blank" rel="noopener noreferrer nofollow" class="text-blue-600 underline underline-offset-2 hover:text-blue-800">$1</a>')
}

function parseMarkdownToHtml(md: string): string {
  const withLinks = renderContent(md)
  const lines = withLinks.split("\n")
  const output: string[] = []
  let inList = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (trimmed.startsWith("## ")) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push(`<h2>${trimmed.slice(3)}</h2>`)
    } else if (trimmed.startsWith("### ")) {
      if (inList) { output.push("</ul>"); inList = false }
      output.push(`<h3>${trimmed.slice(4)}</h3>`)
    } else if (trimmed.startsWith("- ")) {
      if (!inList) { output.push("<ul>"); inList = true }
      const item = trimmed.slice(2).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      output.push(`<li>${item}</li>`)
    } else if (trimmed === "") {
      if (inList) { output.push("</ul>"); inList = false }
    } else if (trimmed) {
      if (inList) { output.push("</ul>"); inList = false }
      const para = trimmed
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      output.push(`<p>${para}</p>`)
    }
  }

  if (inList) output.push("</ul>")
  return output.join("\n")
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const relatedTools = article.relatedTools.map((s) => tools[s]).filter(Boolean)

  // Find related articles — prefer articles sharing the same relatedTools, then fall back to same category
  const relatedArticles = articles
    .filter((a) => a.slug !== slug)
    .map((a) => ({
      article: a,
      score:
        a.relatedTools.filter((t) => article.relatedTools.includes(t)).length * 2 +
        (a.category === article.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4)
    .map((x) => x.article)

  // Fallback: if no scored matches, just take 4 other articles
  const displayedRelated =
    relatedArticles.length > 0
      ? relatedArticles
      : articles.filter((a) => a.slug !== slug).slice(0, 4)

  // Find comparisons that involve any of the related tools
  const relatedComparisons = comparisons.filter(
    (c) => article.relatedTools.includes(c.tool1) || article.relatedTools.includes(c.tool2)
  )

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "RunToolkit",
      url: "https://runtoolkit.com",
    },
    url: `https://runtoolkit.com/blog/${slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://runtoolkit.com/blog/${slug}`,
    },
  }

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://runtoolkit.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://runtoolkit.com/blog" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://runtoolkit.com/blog/${slug}` },
    ],
  }

  const htmlContent = parseMarkdownToHtml(article.content)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-blue-600">Blog</Link>
          <span>/</span>
          <span className="text-slate-600 truncate max-w-xs">{article.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-700 px-2 py-0.5 rounded mb-3">
                {article.category}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4 leading-tight">
                {article.title}
              </h1>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <span>{article.author}</span>
                <span>&middot;</span>
                <span>Published {formatDate(article.publishedAt)}</span>
                {article.updatedAt !== article.publishedAt && (
                  <>
                    <span>&middot;</span>
                    <span>Updated {formatDate(article.updatedAt)}</span>
                  </>
                )}
              </div>
            </div>

            {/* Article body */}
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            {/* Affiliate disclaimer */}
            <div className="mt-10 p-4 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-500">
              <strong>Affiliate Disclosure:</strong> Some links in this article are affiliate links.
              We may earn a commission at no extra cost to you if you sign up through our link. This
              does not influence our reviews or recommendations.
            </div>

            {/* Related Tools — full links to review pages */}
            {relatedTools.length > 0 && (
              <div className="mt-10 border border-slate-200 rounded-xl p-6">
                <h2 className="font-bold text-slate-800 mb-4 text-lg">
                  Tools Reviewed in This Article
                </h2>
                <div className="space-y-4">
                  {relatedTools.map((tool) => (
                    <div key={tool.slug} className="flex items-center justify-between gap-4 flex-wrap">
                      <div>
                        <p className="font-semibold text-slate-800">{tool.name}</p>
                        <p className="text-sm text-slate-500">{tool.tagline}</p>
                        <p className="text-xs text-blue-600 font-medium mt-0.5">{tool.pricing}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <Link
                          href={`/reviews/${tool.slug}`}
                          className="text-sm border border-blue-300 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors font-medium"
                        >
                          Read Full Review
                        </Link>
                        <a
                          href={tool.affiliateUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                          Try Free
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Compare pages relevant to this article */}
            {relatedComparisons.length > 0 && (
              <div className="mt-6 bg-slate-50 border border-slate-200 rounded-xl p-5">
                <h3 className="font-semibold text-slate-700 mb-3 text-sm">Compare these tools:</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedComparisons.map((c) => {
                    const t1 = tools[c.tool1]
                    const t2 = tools[c.tool2]
                    return (
                      <Link
                        key={c.slug}
                        href={`/compare/${c.slug}`}
                        className="text-sm text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        {t1?.name} vs {t2?.name} &rarr;
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Related articles */}
            {displayedRelated.length > 0 && (
              <div className="mt-10 border-t border-slate-200 pt-8">
                <h3 className="font-bold text-slate-800 mb-4">Related Articles</h3>
                <div className="space-y-3">
                  {displayedRelated.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                    >
                      <div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors block">
                          {a.title}
                        </span>
                        <span className="text-xs text-slate-400">{a.category}</span>
                      </div>
                      <span className="text-xs text-slate-400 ml-4 shrink-0">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tools mentioned */}
              {relatedTools.length > 0 && (
                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">
                    Tools Mentioned
                  </h3>
                  <div className="space-y-4">
                    {relatedTools.map((tool) => (
                      <div key={tool.slug}>
                        <p className="font-semibold text-slate-800 text-sm">{tool.name}</p>
                        <p className="text-xs text-slate-500 mb-2">{tool.pricing}</p>
                        <div className="flex gap-2">
                          <Link
                            href={`/reviews/${tool.slug}`}
                            className="flex-1 text-center text-xs border border-blue-300 text-blue-600 py-1.5 rounded hover:bg-blue-50 transition-colors"
                          >
                            Review
                          </Link>
                          <a
                            href={tool.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow"
                            className="flex-1 text-center text-xs bg-blue-600 text-white py-1.5 rounded hover:bg-blue-700 transition-colors"
                          >
                            Try Free
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Compare links in sidebar */}
              {relatedComparisons.length > 0 && (
                <div className="border border-slate-200 rounded-xl p-5">
                  <h3 className="font-bold text-slate-800 mb-3 text-sm uppercase tracking-wide">
                    Comparisons
                  </h3>
                  <div className="space-y-2">
                    {relatedComparisons.map((c) => {
                      const t1 = tools[c.tool1]
                      const t2 = tools[c.tool2]
                      return (
                        <Link
                          key={c.slug}
                          href={`/compare/${c.slug}`}
                          className="block text-sm text-blue-600 hover:underline py-0.5"
                        >
                          {t1?.name} vs {t2?.name} &rarr;
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* CTA box */}
              <div className="bg-slate-800 text-white rounded-xl p-5 text-center">
                <p className="font-bold mb-2">Not sure which tool is right?</p>
                <p className="text-slate-300 text-xs mb-4 leading-relaxed">
                  Browse our picks by business type to find your best fit.
                </p>
                <Link
                  href="/"
                  className="inline-block w-full text-sm font-semibold bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition-colors"
                >
                  Find My Best Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
