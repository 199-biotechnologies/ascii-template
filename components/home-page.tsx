import Link from 'next/link'
import { AsciiHero } from '@/components/ascii-hero'
import { ContactForm } from '@/components/contact-form'
import { FaqSchema } from '@/components/faq-schema'
import { listPosts } from '@/lib/content'
import type { Dictionary } from '@/lib/i18n/dictionaries'
import type { Locale } from '@/lib/i18n/config'
import { withLocale } from '@/lib/i18n/config'

type HomePageProps = {
  locale: Locale
  dictionary: Dictionary
}

export default function HomePage({ locale, dictionary }: HomePageProps) {
  const recent = listPosts().slice(0, 3)

  return (
    <>
      <FaqSchema
        items={[
          {
            question: 'What can visitors do on this website?',
            answer:
              'Visitors can find key information, read updates, review policies, switch languages, and send a message through the contact page.',
          },
          {
            question: 'Does the website explain privacy and cookies?',
            answer: 'Yes. Privacy, cookie, and terms pages are linked from the footer and available in the sitemap.',
          },
          {
            question: 'Is the website multilingual?',
            answer: 'Yes. The site includes locale-prefixed pages, language switching, alternate links, and right-to-left support.',
          },
        ]}
      />
      <header className="hero">
        <AsciiHero />
        <div className="hero-backdrop" />
        <div className="page hero-content">
          <div className="eyebrow fade-up">{dictionary.home.eyebrow}</div>
          <h1 className="fade-up-1">{dictionary.home.title}</h1>
          <p className="lede fade-up-2">{dictionary.home.lede}</p>

          <div className="fade-up-3" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28 }}>
            <Link href={withLocale('/features', locale)} className="btn btn-primary btn-arrow">
              {dictionary.home.primaryCta}
            </Link>
            <Link href={withLocale('/docs', locale)} className="btn btn-ghost btn-arrow">
              {dictionary.nav.docs}
            </Link>
          </div>
        </div>
      </header>

      <section id="showcase">
        <div className="page">
          <div className="section-eyebrow">Foundation</div>
          <h2>Clear pages, useful resources, and a direct way to get in touch.</h2>
          <p className="lede">
            The site brings the common visitor journey into one place: read the essentials, review updates, understand
            the policies, and contact the right person without friction.
          </p>

          <div className="signal-list" style={{ marginTop: 38 }}>
            <div>
              <span>01</span>
              <b>Information that is easy to scan</b>
              <p>Home, services, pricing, about, resources, updates, contact, status, and policy pages are connected.</p>
            </div>
            <div>
              <span>02</span>
              <b>Trust made visible</b>
              <p>Consent, privacy, cookie policy, and terms pages are part of the main website experience.</p>
            </div>
            <div>
              <span>03</span>
              <b>Ready for more audiences</b>
              <p>Language routes, switcher UI, alternate links, and right-to-left support make multilingual publishing natural.</p>
            </div>
          </div>

          <div className="kpi" style={{ marginTop: 44 }}>
            <div>
              <div className="v">5</div>
              <div className="l">Locales</div>
            </div>
            <div>
              <div className="v">3</div>
              <div className="l">Policy pages</div>
            </div>
            <div>
              <div className="v">1</div>
              <div className="l">Admin area</div>
            </div>
            <div>
              <div className="v">0</div>
              <div className="l">Clutter</div>
            </div>
          </div>
        </div>
      </section>

      <section id="system">
        <div className="page">
          <div className="section-eyebrow">System</div>
          <h2>Keep the core experience useful, focused, and easy to extend.</h2>

          <div className="grid-2" style={{ marginTop: 8 }}>
            <div>
              <h3>Core experience</h3>
              <p>
                Multilingual pages, a refined public layout, contact, consent, policy pages, metadata, admin access,
                basic reporting, status, updates, and a consistent visual system.
              </p>
              <p>
                These are the pieces visitors and operators expect to work before anything more specialized is added.
              </p>
            </div>
            <div>
              <h3>As needs grow</h3>
              <ol className="findings" style={{ marginTop: -6 }}>
                <li>
                  <span className="head">Payments.</span>
                  Useful when the site needs checkout, subscriptions, invoices, or paid access.
                </li>
                <li>
                  <span className="head">Advanced workflows.</span>
                  Scheduling, memberships, queues, and automations should match the real service model.
                </li>
                <li>
                  <span className="head">Content systems.</span>
                  Editorial workflows can expand when publishing volume and review needs justify them.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {recent.length > 0 ? (
        <section id="recent">
          <div className="page">
            <div className="section-eyebrow">Latest writing</div>
            <h2>From the blog.</h2>
            <ol className="findings" style={{ borderTop: '1px solid var(--line)' }}>
              {recent.map((p) => (
                <li key={p.slug}>
                  <Link href={withLocale(`/blog/${p.slug}`, locale)} style={{ borderBottom: 'none', display: 'block' }}>
                    <span className="head">{p.title}</span>
                    {p.excerpt ? <span style={{ color: 'var(--body)', fontSize: 14.5 }}>{p.excerpt}</span> : null}
                    <span className="meta-line">{p.date}</span>
                  </Link>
                </li>
              ))}
            </ol>
            <div style={{ marginTop: 24 }}>
              <Link href={withLocale('/blog', locale)} className="btn btn-ghost btn-arrow">
                {dictionary.nav.blog}
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <section id="modules">
        <div className="page">
          <div className="section-eyebrow">Pages</div>
          <h2>Every main page has a job.</h2>
          <p className="lede">The structure is intentionally predictable so visitors always know where to go next.</p>

          <div className="module-grid">
            <Module label="Home" title="First impression" text="A memorable hero, concise message, and routes into the rest of the site." />
            <Module label="Contact" title="Visitor messages" text="A usable form that can be adapted for sales, support, bookings, or general enquiries." />
            <Module label="Legal" title="Policy surface" text="Privacy, cookie, and terms pages are linked from the footer and sitemap." />
          </div>

          <div className="module-grid" style={{ marginTop: 18 }}>
            <Module label="Admin" title="Private workspace" text="A place for operational screens, settings, messages, redirects, and project data." />
            <Module label="Content" title="Blog and resources" text="Simple content routes for notes, announcements, guides, and project resources." />
            <Module label="Search" title="Metadata basics" text="Sitemap, robots, social preview assets, canonical URLs, and structured data helpers." />
          </div>
          <div className="page-link-grid">
            <Link href={withLocale('/features', locale)}>{dictionary.nav.features}</Link>
            <Link href={withLocale('/cookies', locale)}>{dictionary.nav.cookies}</Link>
            <Link href={withLocale('/terms', locale)}>{dictionary.nav.terms}</Link>
          </div>
        </div>
      </section>

      <section id="contact-demo">
        <div className="page">
          <div className="section-eyebrow">Contact</div>
          <h2>A real way to reach the team.</h2>
          <p className="lede">
            The form stays short, clear, and appropriate for questions, requests, bookings, applications, or support.
          </p>
          <div className="grid-2 contact-layout">
            <ContactForm locale={locale} dictionary={dictionary} compact source="home-contact-demo" />
            <ol className="findings">
              <li>
                <span className="head">Clear fields.</span>
                Name, email, phone, and message are enough for most early project enquiries.
              </li>
              <li>
                <span className="head">Reusable intent.</span>
                The same surface works for support, leads, bookings, applications, or feedback.
              </li>
              <li>
                <span className="head">Admin-ready.</span>
                Submitted messages can move into the right operational workflow without changing the public form.
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--ink)', color: 'var(--bg)', borderTop: 'none' }}>
        <div className="page" style={{ textAlign: 'center', maxWidth: 720 }}>
          <div className="section-eyebrow" style={{ color: 'var(--muted)', borderBottomColor: 'var(--muted)' }}>
            Direction
          </div>
          <h2 style={{ color: 'var(--bg)', maxWidth: '24ch', margin: '0 auto 18px' }}>
            Keep the website useful, quiet, and easy to trust.
          </h2>
          <p style={{ color: 'var(--bg-stripe)', maxWidth: '56ch', margin: '0 auto 24px', fontSize: 17 }}>
            Good pages answer real visitor questions without making them think about how the site was built.
          </p>
          <Link
            href={withLocale('/features', locale)}
            className="btn btn-arrow"
            style={{ background: 'var(--bg)', color: 'var(--ink)', borderColor: 'var(--bg)' }}
          >
            {dictionary.nav.features}
          </Link>
        </div>
      </section>
    </>
  )
}

function Module({ label, title, text }: { label: string; title: string; text: string }) {
  return (
    <div>
      <code>{label}</code>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  )
}
