import type { MetadataRoute } from "next"
import { toolsList, categories, comparisons } from "../lib/tools"
import { articles } from "../lib/articles"

const BASE_URL = "https://runtoolkit.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ]

  const reviewPages: MetadataRoute.Sitemap = toolsList.map((tool) => ({
    url: `${BASE_URL}/reviews/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  const bestToolPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${BASE_URL}/best-tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  const comparePages: MetadataRoute.Sitemap = comparisons.map((comp) => ({
    url: `${BASE_URL}/compare/${comp.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }))

  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...staticPages, ...reviewPages, ...bestToolPages, ...comparePages, ...blogPages]
}
