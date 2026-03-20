import type { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "RunToolkit — Find the Best Software for Your Service Business",
    template: "%s | RunToolkit",
  },
  description:
    "Independent reviews and comparisons of the best software tools for service businesses — cleaners, photographers, landscapers, contractors, and more.",
  metadataBase: new URL("https://runtoolkit.com"),
  openGraph: {
    siteName: "RunToolkit",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-slate-800">
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-T1BXCKTKYY" strategy="afterInteractive" />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-T1BXCKTKYY');
        `}</Script>
        <header className="border-b border-slate-200 bg-white sticky top-0 z-50">
          <nav className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-blue-600 font-bold text-xl">&#9881;</span>
              <span className="font-bold text-slate-800 text-lg">RunToolkit</span>
            </Link>
            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <Link href="/reviews/jobber" className="hover:text-blue-600 transition-colors">
                Reviews
              </Link>
              <Link href="/compare/jobber-vs-housecall-pro" className="hover:text-blue-600 transition-colors">
                Compare
              </Link>
              <Link href="/best-tools/cleaning-businesses" className="hover:text-blue-600 transition-colors">
                Best Tools
              </Link>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">
                Blog
              </Link>
            </div>
          </nav>
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-slate-900 text-slate-400 py-12 mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-400 font-bold text-lg">&#9881;</span>
                  <span className="font-bold text-white">RunToolkit</span>
                </div>
                <p className="text-sm leading-relaxed">
                  Find the right tools to run your service business. Independent reviews, honest comparisons.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Reviews</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/reviews/jobber" className="hover:text-white transition-colors">Jobber Review</Link></li>
                  <li><Link href="/reviews/honeybook" className="hover:text-white transition-colors">HoneyBook Review</Link></li>
                  <li><Link href="/reviews/housecallpro" className="hover:text-white transition-colors">Housecall Pro Review</Link></li>
                  <li><Link href="/reviews/freshbooks" className="hover:text-white transition-colors">FreshBooks Review</Link></li>
                  <li><Link href="/reviews/bonsai" className="hover:text-white transition-colors">Bonsai Review</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Best Tools For</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/best-tools/cleaning-businesses" className="hover:text-white transition-colors">Cleaning Businesses</Link></li>
                  <li><Link href="/best-tools/photographers" className="hover:text-white transition-colors">Photographers</Link></li>
                  <li><Link href="/best-tools/landscapers" className="hover:text-white transition-colors">Landscapers</Link></li>
                  <li><Link href="/best-tools/personal-trainers" className="hover:text-white transition-colors">Personal Trainers</Link></li>
                  <li><Link href="/best-tools/contractors" className="hover:text-white transition-colors">Contractors</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-3 text-sm uppercase tracking-wide">Compare</h3>
                <ul className="space-y-2 text-sm">
                  <li><Link href="/compare/jobber-vs-housecall-pro" className="hover:text-white transition-colors">Jobber vs Housecall Pro</Link></li>
                  <li><Link href="/compare/honeybook-vs-bonsai" className="hover:text-white transition-colors">HoneyBook vs Bonsai</Link></li>
                  <li><Link href="/compare/freshbooks-vs-bonsai" className="hover:text-white transition-colors">FreshBooks vs Bonsai</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 space-y-3">
              <p className="text-sm">
                <span className="font-medium text-slate-300">Affiliate Disclosure:</span>{" "}
                Some links on this site are affiliate links. We may earn a commission at no extra cost to you. Our reviews and recommendations are based on genuine research and are not influenced by affiliate relationships.
              </p>
              <p className="text-xs text-slate-600">
                &copy; {new Date().getFullYear()} RunToolkit. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
