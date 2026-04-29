import type { Metadata } from 'next'
import { Suspense } from 'react'
import './globals.css'
import { Nav } from '@/components/nav'
import { Footer } from '@/components/footer'
import { JsonLd } from '@/components/json-ld'
import { AnalyticsTracker } from '@/components/analytics-tracker'
import { LocaleDocumentAttrs } from '@/components/locale-document-attrs'
import { PrivacyNotice } from '@/components/privacy-notice'
import { locales, rtlLocales } from '@/lib/i18n/config'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  applicationName: site.name,
  authors: [{ name: site.name }],
  robots: { index: true, follow: true },
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
  },
}

// Sets data-theme on <html> before React hydrates, preventing
// a light → dark flash when the user has dark mode stored.
const themeInitScript = `
  try {
    var t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') {
      document.documentElement.dataset.theme = t;
    }
  } catch (_) {}
`

const localeInitScript = `
  try {
    var locales = ${JSON.stringify(locales)};
    var rtl = ${JSON.stringify(rtlLocales)};
    var segment = location.pathname.split('/').filter(Boolean)[0];
    if (locales.indexOf(segment) !== -1) {
      document.documentElement.lang = segment;
      document.documentElement.dir = rtl.indexOf(segment) !== -1 ? 'rtl' : 'ltr';
    }
  } catch (_) {}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: localeInitScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Newsreader:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <JsonLd />
      </head>
      <body>
        <LocaleDocumentAttrs />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        <Nav />
        <main>{children}</main>
        <Footer />
        <PrivacyNotice />
      </body>
    </html>
  )
}
