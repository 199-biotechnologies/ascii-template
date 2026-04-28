import Link from 'next/link'
import { AsciiHero } from '@/components/ascii-hero'
import { site } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <header className="hero">
        <AsciiHero />
        <div className="hero-backdrop" />
        <div className="page hero-content">
          <div className="eyebrow fade-up">A starter for builders · v0.1</div>
          <h1 className="fade-up-1">A clean editorial starter, with an animated ASCII hero.</h1>
          <p className="lede fade-up-2">
            Next.js 16, React 19, TypeScript strict, vanilla CSS. Brand tokens in one file. Editorial
            primitives borrowed from print. Opt-in modules for i18n, auth, payments, and SEO when you need
            them — never before.
          </p>

          <div
            className="fade-up-3"
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}
          >
            <a href="#showcase" className="btn btn-primary btn-arrow">
              See the system
            </a>
            <a href={site.social.github} className="btn btn-ghost btn-arrow" target="_blank" rel="noreferrer">
              View source
            </a>
          </div>

          <div className="fade-up-3" style={{ marginTop: 36 }}>
            <span className="code-chip-lg">npx degit ascii-template my-app</span>
          </div>
        </div>
      </header>

      {/* SHOWCASE */}
      <section id="showcase">
        <div className="page">
          <div className="section-eyebrow">Showcase</div>
          <h2>Six primitives. Hand-crafted. Reusable.</h2>
          <p className="lede">
            Every block on this page is a class in <code className="code-chip">globals.css</code>. Copy a class,
            paste markup, ship. No Tailwind, no compile step beyond Next.
          </p>

          <h3 style={{ marginTop: 44 }}>Signal list</h3>
          <div className="signal-list">
            <div>
              <span>01</span>
              <b>Editorial typography</b>
              <p>Newsreader for display, Inter for body, JetBrains Mono for code. Three families, no more.</p>
            </div>
            <div>
              <span>02</span>
              <b>Animated ASCII hero</b>
              <p>Sine-wave grid on a canvas. Charset and accents read from a single config file.</p>
            </div>
            <div>
              <span>03</span>
              <b>Print-grade primitives</b>
              <p>KPI strips, signal grids, findings lists, pull quotes, pricing cards, code chips.</p>
            </div>
          </div>

          <h3 style={{ marginTop: 44 }}>KPI strip</h3>
          <div className="kpi">
            <div>
              <div className="v">~12kB</div>
              <div className="l">Hero JS</div>
            </div>
            <div>
              <div className="v">3</div>
              <div className="l">Fonts</div>
            </div>
            <div>
              <div className="v">0</div>
              <div className="l">UI deps</div>
            </div>
            <div>
              <div className="v">100</div>
              <div className="l">Lighthouse target</div>
            </div>
          </div>

          <h3 style={{ marginTop: 44 }}>Pull quote</h3>
          <div className="pull">
            “Less code solving the right problem beats more code solving problems badly.”
          </div>

          <h3 style={{ marginTop: 44 }}>Findings list</h3>
          <ol className="findings">
            <li>
              <span className="head">One file to rebrand.</span>
              <code className="code-chip">lib/site.ts</code> holds name, tagline, nav, ASCII charset, and accents.
            </li>
            <li>
              <span className="head">CSS variables for the palette.</span>
              Swap <code className="code-chip">--bg</code>, <code className="code-chip">--ink</code>, and{' '}
              <code className="code-chip">--accent</code> in <code className="code-chip">globals.css</code> to reskin.
            </li>
            <li>
              <span className="head">Reduced motion respected.</span>
              The hero renders a single static frame for users who prefer reduced motion.
            </li>
            <li>
              <span className="head">No Tailwind, no UI lib.</span>
              Just Next + React. The whole design system fits in one CSS file you can read top-to-bottom.
            </li>
          </ol>
        </div>
      </section>

      {/* DESIGN SYSTEM */}
      <section id="system">
        <div className="page">
          <div className="section-eyebrow">Design system</div>
          <h2>Two columns of taste.</h2>

          <div className="grid-2" style={{ marginTop: 8 }}>
            <div>
              <h3>What's in the base</h3>
              <p>
                Next.js 16 App Router, React 19, TypeScript strict. Vanilla CSS design system. Animated ASCII hero.
                Editorial primitives. Sticky nav with backdrop blur. Footer with column grid. Sitemap and robots
                routes. Server-rendered metadata.
              </p>
              <p>
                Three Google Fonts loaded with <code className="code-chip">preconnect</code> +{' '}
                <code className="code-chip">display=swap</code>. <code className="code-chip">prefers-reduced-motion</code>{' '}
                handled. <code className="code-chip">prefers-color-scheme</code> hooks ready (toggle to taste).
              </p>
            </div>
            <div>
              <h3>What's deliberately not</h3>
              <ol className="findings" style={{ marginTop: -6 }}>
                <li>
                  <span className="head">No Tailwind.</span>
                  Vanilla CSS reads top-to-bottom. Brand swaps happen in one file.
                </li>
                <li>
                  <span className="head">No UI library.</span>
                  Six primitives cover 90% of marketing-site needs. Add radix only if you need it.
                </li>
                <li>
                  <span className="head">No auth, no DB, no payments.</span>
                  Those live in <code className="code-chip">addons/*</code> — paste in when needed, not before.
                </li>
                <li>
                  <span className="head">No CMS or markdown pipeline.</span>
                  If your content is small, write TSX. If it's big, drop in the markdown addon.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules">
        <div className="page">
          <div className="section-eyebrow">Opt-in modules</div>
          <h2>Bring only what you need.</h2>
          <p className="lede">
            Each module is a paste-in folder with a 5-line wiring note. Skip them and you ship faster. Add them
            when the requirement actually shows up.
          </p>

          <div className="module-grid">
            <div>
              <code>addons/i18n</code>
              <b>Locale routing</b>
              <p>Locale-prefixed routes, cookie persistence, Accept-Language fallback, RTL flag, redirect-loop guard.</p>
            </div>
            <div>
              <code>addons/auth-supabase</code>
              <b>Auth + admin</b>
              <p>Supabase session middleware, protected /admin routes, graceful fallback when env vars missing.</p>
            </div>
            <div>
              <code>addons/stripe</code>
              <b>Checkout</b>
              <p>One-time and subscription checkout, webhook handler, success/cancel routes.</p>
            </div>
          </div>

          <div className="module-grid" style={{ marginTop: 18 }}>
            <div>
              <code>addons/web-vitals</code>
              <b>Core Web Vitals</b>
              <p>Client reporter that posts to /api/vitals. LCP, INP, CLS, TTFB, FCP — graphable from day one.</p>
            </div>
            <div>
              <code>addons/indexnow-aeo</code>
              <b>SEO + AEO</b>
              <p>IndexNow ping route, AI-crawler analytics, JSON-LD organization + speakable schemas.</p>
            </div>
            <div>
              <code>addons/markdown</code>
              <b>Content pipeline</b>
              <p>gray-matter front-matter, marked rendering, dynamic routes for /blog and /docs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing">
        <div className="page">
          <div className="section-eyebrow">Pricing</div>
          <h2>Free to use. Easy to extend.</h2>
          <p className="lede">
            MIT licensed. Fork it, brand it, ship it. The pricing block is here so you can see the card primitive — swap
            it for whatever your project actually charges.
          </p>

          <div className="pricing-grid" style={{ marginTop: 32 }}>
            <div className="pricing-card">
              <div className="tier">Starter</div>
              <div className="price">
                $0<small>forever</small>
              </div>
              <ul>
                <li>Base template + ASCII hero</li>
                <li>All editorial primitives</li>
                <li>MIT license</li>
                <li>Community support</li>
              </ul>
              <a href={site.social.github} className="btn btn-ghost btn-arrow" target="_blank" rel="noreferrer">
                Clone on GitHub
              </a>
            </div>
            <div className="pricing-card featured">
              <div className="ribbon">Recommended</div>
              <div className="tier">Builder</div>
              <div className="price">
                $0<small>+ time</small>
              </div>
              <ul>
                <li>Everything in Starter</li>
                <li>All opt-in modules wired</li>
                <li>Example /blog, /docs, /admin</li>
                <li>Vercel deploy preset</li>
              </ul>
              <a href="#modules" className="btn btn-primary btn-arrow">
                Browse modules
              </a>
            </div>
            <div className="pricing-card">
              <div className="tier">Custom</div>
              <div className="price">
                Talk<small>direct</small>
              </div>
              <ul>
                <li>Bespoke skins</li>
                <li>Migration from clinic-starter</li>
                <li>SEO/AEO setup</li>
                <li>Direct support</li>
              </ul>
              <a href={`mailto:${site.email}`} className="btn btn-ghost btn-arrow">
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: 'var(--ink)', color: 'var(--bg)', borderTop: 'none' }}>
        <div className="page" style={{ textAlign: 'center', maxWidth: 720 }}>
          <div
            className="section-eyebrow"
            style={{ color: '#9aa3ad', borderBottomColor: '#9aa3ad' }}
          >
            Final word
          </div>
          <h2 style={{ color: 'var(--bg)', maxWidth: '24ch', margin: '0 auto 18px' }}>
            Start lean. Add weight only when the work demands it.
          </h2>
          <p style={{ color: '#cdd2d8', maxWidth: '56ch', margin: '0 auto 24px', fontSize: 17 }}>
            Most starters ship a kitchen sink and you spend day one tearing it out. This one ships the smallest
            beautiful thing you can deploy, then meets you where you grow.
          </p>
          <Link
            href="#showcase"
            className="btn btn-arrow"
            style={{ background: 'var(--bg)', color: 'var(--ink)', borderColor: 'var(--bg)' }}
          >
            Back to top
          </Link>
        </div>
      </section>
    </>
  )
}
